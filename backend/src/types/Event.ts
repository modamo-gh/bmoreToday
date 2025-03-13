import { DateTime } from "luxon";

export type Event = {
	endTime: DateTime | null;
	title: string;
	location: string;
	startTime: DateTime | null;
	time: string;
	price: string;
};
