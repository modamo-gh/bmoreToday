import { DateTime } from "luxon";

export type Event = {
	created_at: string;
	endtime: DateTime | null;
	id: number;
	imageurl: string;
	location: string;
	price: string;
	source: string;
	starttime: DateTime | null;
	title: string;
};
