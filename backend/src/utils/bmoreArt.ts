import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { load } from "cheerio";
import { DateTime } from "luxon";

puppeteer.use(StealthPlugin());

const getBmoreArtEvents = async () => {
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

	urls.forEach(async (url) => {
		const eventHTML = await getHTML(url);
		const $_event = load(eventHTML);
		const event = { imageURL: "", title: "", url };
		const images = [
			...$_event(".c-article-section__intro.u-flex-row.has-dividers")
				.find("img")
				.filter(
					(i, e) =>
						$_event(e).attr("src")?.trim() !==
						"https://bmoreart.com/wp-content/themes/bmoreart/dist/images/icon-gallery-arrow.svg"
				)
		];

		event.imageURL = images.length ? $_event(images[0]).attr("src")! : "";
		event.title = $_event(".o-heading--xxl").text().trim();

		console.log(event);
	});
};

getBmoreArtEvents();
