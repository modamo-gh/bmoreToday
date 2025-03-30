import { load } from "cheerio";
import { DateTime } from "luxon";
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import pool from "../../db";
import { sendTelegramError } from "../scripts/telegram";

export const getBmoreArtEvents = async () => {
	puppeteer.use(StealthPlugin());

	const getHTML = async (url: string) => {
		const browser = await puppeteer.launch({
			args: ["--no-sandbox", "--disable-setuid-sandbox"],
			headless: true
		});
		const page = await browser.newPage();

		await page.goto(url, {
			waitUntil: "networkidle2"
		});

		const html = await page.content();

		await browser.close();

		return html;
	};

	const calendarHTML = await getHTML("https://bmoreart.com/events");
	const $_calendar = load(calendarHTML);
	const today = DateTime.now().toFormat("ccc MMM dd");
	const urls: string[] = [];

	$_calendar(".c-event.l-grid-item").each((_, element) => {
		const date = $_calendar(element).find(".o-kicker");
		const dayOfTheWeek = $_calendar(date)
			.find("span:nth-of-type(1)")
			.text()
			.trim();
		const month = $_calendar(date)
			.find("span:nth-of-type(2)")
			.text()
			.trim();
		const day = $_calendar(element).find(".c-event-number").text().trim();

		if (`${dayOfTheWeek} ${month} ${day}` === today) {
			const url = $_calendar(element).find("a").attr("href")?.trim();

			if (url) {
				urls.push(url);
			}
		}
	});

	for (const url of urls) {
		const eventHTML = await getHTML(url);
		const $_event = load(eventHTML);
		const event: {
			imageURL: string;
			endTime: DateTime | null;
			location: string;
			maxPrice: number;
			minPrice: number;
			startTime: DateTime | null;
			title: string;
			url: string;
		} = {
			imageURL: "",
			endTime: null,
			location: "",
			maxPrice: -Infinity,
			minPrice: Infinity,
			startTime: null,
			title: "",
			url
		};
		const images = [
			...$_event(".c-article-section__intro.u-flex-row.has-dividers")
				.find("img")
				.filter(
					(i, e) =>
						$_event(e).attr("src")?.trim() !==
						"https://bmoreart.com/wp-content/themes/bmoreart/dist/images/icon-gallery-arrow.svg"
				)
		];
		const timeTokens = $_event(".o-subhead").text().trim().split(/\s+/);
		const potentialTime = timeTokens[timeTokens.length - 1];
		const meridiem = new RegExp(/[ap]m/i);

		if (meridiem.test(potentialTime)) {
			const tokens = potentialTime.split(/-/);

			const getDateTime = (time: string) =>
				DateTime.fromFormat(time, "h:mma").isValid
					? DateTime.fromFormat(time, "h:mma").setZone(
							"America/New_York"
					  )
					: DateTime.fromFormat(time, "ha").setZone(
							"America/New_York"
					  );

			let st: DateTime | string = tokens[0];

			if (tokens.length > 1) {
				let et: DateTime | string = tokens[1];

				if (!st.endsWith("am") || !st.endsWith("pm")) {
					st += et.slice(-2);
				}

				et = getDateTime(et);

				event.endTime = et;
			}

			st = getDateTime(st);

			event.startTime = st;
		}

		const prices = [
			...$_event(".o-text.u-spacing")
				.text()
				.matchAll(/\$\d+|free\b/gi)
		]
			.map((match) => {
				const price = match[0];

				if (price.startsWith("$")) {
					return Number(price.slice(1));
				}

				return 0;
			})
			.sort();

		event.imageURL = images.length ? $_event(images[0]).attr("src")! : "";
		event.location = $_event(".c-article-info-bottom__location-name a")
			.first()
			.text()
			.trim();
		event.title = $_event(".o-heading--xxl").text().trim();

		if (prices.length) {
			event.maxPrice = prices[prices.length - 1];
			event.minPrice = prices[0];
		}

		console.log(event);

		try {
			await pool.query(
				"INSERT INTO events (title, location, source, startTime, endTime, minPrice, maxPrice, imageURL) VALUES ($1, $2, $3, $4, $5, $6, $7)",
				[
					event.title,
					event.location,
					event.url,
					event.startTime ? event.startTime.toSQLTime() : null,
					event.endTime ? event.endTime.toSQLTime() : null,
					event.minPrice,
					event.maxPrice,
					event.imageURL
				]
			);
		} catch (error) {
			await sendTelegramError(
				`🚨 *BmoreArt Insertion Error* 🚨\n\nEvent:\n\`${JSON.stringify(
					event,
					null,
					4
				)}\`\n\nError:\n\`${error}\``
			);
		}
	}
};