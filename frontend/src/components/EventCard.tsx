import { FC } from "react";
import {
	FaClock,
	FaGlobe,
	FaLocationDot,
	FaTicket,
	FaWallet
} from "react-icons/fa6";
import { EventCardType } from "../types/EventCardType";
import { usePreferencesContext } from "../contexts/PreferencesContext";
import { DateTime } from "luxon";

const EventCard: FC<EventCardType> = ({ event }) => {
	const { use12Hours } = usePreferencesContext();

	const getDisplayedPrice = () => {
		let price = "";

		if(event.minprice !== null){
			price += `$${event.minprice}`
		}

		if(event.maxprice !== null && event.maxprice !== event.minprice){
			price += ` to $${event.maxprice}`
		}

		return price || event.pricedescription || event.price;
	};

	return (
		<div className=" bg-[#30255C] flex flex-col gap-2 h-80 rounded-lg p-2">
			<div className="h-1/2 rounded-lg overflow-hidden">
				<img
					className="h-full object-cover w-full"
					src={event.imageurl}
					alt=""
				/>
			</div>
			<div className="flex flex-col h-1/2 justify-between text-[#f5f5f5]">
				<div className="flex items-center">
					<FaTicket className="mr-2 text-[#ff6a00] text-lg" />
					<p className="flex-1 truncate" title={event.title}>
						{event.title}
					</p>
				</div>
				<div className="flex items-center">
					<FaLocationDot className="mr-2 text-[#ff6a00] text-lg" />
					<p className="flex-1 truncate">{event.location}</p>
				</div>
				<div className="flex items-center">
					<FaWallet className="mr-2 text-[#ff6a00] text-lg" />
					<p className="flex-1 truncate">{getDisplayedPrice()}</p>
				</div>
				<div className="flex items-center">
					<FaGlobe className="mr-2 text-[#ff6a00] text-lg" />
					<a
						className="flex-1 hover:underline truncate"
						href={event.source}
						rel="noopener noreferrer"
						target="_blank"
					>
						{event.source.replace("https://", "")}
					</a>
				</div>
				<div className="flex items-center">
					<FaClock className="mr-2 text-[#ff6a00] text-lg" />
					<p className="flex-1 truncate">
						{(() => {
							const startTime = event.starttime
								? DateTime.fromFormat(
										event.starttime.toString(),
										"HH:mm:ss"
								  )
								: null;
							const endTime = event.endtime
								? DateTime.fromFormat(
										event.endtime.toString(),
										"HH:mm:ss"
								  )
								: null;

							return `${
								startTime
									? use12Hours
										? startTime.toFormat("hh:mm a")
										: startTime.toFormat("HH:mm")
									: "Not Provided"
							}${
								endTime
									? ` to ${
											use12Hours
												? endTime.toFormat("hh:mm a")
												: endTime.toFormat("HH:mm")
									  }`
									: ""
							}`;
						})()}
					</p>
				</div>
			</div>
		</div>
	);
};

export default EventCard;
