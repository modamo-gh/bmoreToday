import { FC, useEffect, useState } from "react";
import { HeaderProps } from "../types/HeaderProps";
import { Weather } from "../types/Weather";
import { DateTime } from "luxon";

const Header: FC<HeaderProps> = ({ headerRef, width }) => {
	const [weather, setWeather] = useState<Weather>({
		temp: 0,
		feels_like: 0,
		icon_URL: ""
	});

	useEffect(() => {
		const fetchWeather = async () => {
			const response = await fetch(
				"https://bmoretoday.modamo.xyz/api/weather"
			);
			const data = await response.json();

			setWeather(data);
		};

		fetchWeather();
	}, []);

	return (
		<div
			className="flex items-center justify-between text-[#F5F5F5] w-full"
			ref={headerRef}
		>
			<div>
				<div className="flex flex-1">
					<h1 className="semibold text-3xl w-fit">Bmore Today</h1>
				</div>
				<h2 className="text-lg">Go Outside and B(e)More</h2>
			</div>
			<div className="flex flex-col items-end">
				<p>
					{width >= 768
						? DateTime.now().toLocaleString(DateTime.DATE_HUGE)
						: DateTime.now().toLocaleString(DateTime.DATE_MED)}
				</p>
				<div className="flex flex-row gap-2 items-center justify-center">
					<img className="h-8 w-8" src={weather.icon_URL} />
					<p>{`${Math.round(weather.temp)}°`}</p>
					{width >= 768 ? (
						<p>{`Feels Like: ${Math.round(
							weather.feels_like
						)}°`}</p>
					) : null}
				</div>
			</div>
		</div>
	);
};

export default Header;
