import { DateTime } from "luxon";

export type Event = {
	created_at: string;
	endTime: DateTime | null;
	id: number;
	imageurl: string;
	location: string;
	price: string;
	source: string;
	startTime: DateTime | null;
	time: string;
	title: string;
};
