import { FC } from "react";
import {
    FaClock,
    FaGlobe,
    FaLocationDot,
    FaTicket,
    FaWallet
} from "react-icons/fa6";
import { EventCardType } from "../types/EventCardType";

const EventCard: FC<EventCardType> = ({ event }) => {
	return (
		<div className=" bg-[#30255C] flex flex-col gap-2 h-80 rounded-lg p-2">
			<div className="bg-red-500 h-1/2 rounded-lg"></div>
			<div className="flex flex-col h-1/2 justify-between text-[#f5f5f5]">
				<div className="flex items-center">
					<FaTicket className="mr-2 text-[#ff6a00]" />
					{event.title}
				</div>
				<div className="flex items-center">
					<FaLocationDot className="mr-2 text-[#ff6a00]" />
					{event.location}
				</div>
				<div className="flex items-center">
					<FaWallet className="mr-2 text-[#ff6a00]" />
					{event.price}
				</div>
				<div className="flex items-center">
					<FaGlobe className="mr-2 text-[#ff6a00]" />
					{event.source.replace("https://", "")}
				</div>
				<div className="flex items-center">
					<FaClock className="mr-2 text-[#ff6a00]" />
					{event.time}
				</div>
			</div>
		</div>
	);
};

export default EventCard;
