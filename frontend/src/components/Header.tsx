import { FC, useEffect, useState } from "react";
import { HeaderProps } from "../types/HeaderProps";
import { Weather } from "../types/Weather";
import { DateTime } from "luxon";

const Header: FC<HeaderProps> = ({ headerRef }) => {
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
			className="flex gap-8 items-baseline text-[#F5F5F5] w-full"
			ref={headerRef}
		>
			<div className="flex flex-1 justify-center">
				<h1 className="semibold text-3xl w-fit">Bmore Today</h1>
			</div>
			<h2 className="text-lg">Go Outside and Bmore Today</h2>
			<div className="flex flex-col flex-3 items-end">
				<p>{DateTime.now().toLocaleString(DateTime.DATE_HUGE)}</p>
				<div className="flex flex-row">
					<p>{`Temp: ${weather.temp}`}</p>
					<p>{`Feels Like: ${weather.temp}`}</p>
					<img className="h-8 w-8" src={weather.icon_URL} />
				</div>
			</div>
		</div>
	);
};

export default Header;
