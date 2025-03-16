import { DateTime } from "luxon";

export type Event = {
	created_at: string;
	endtime: DateTime | null;
	id: number;
	imageurl: string;
	location: string;
	maxprice: number | null;
	minprice: number | null;
	price: string;
	pricedescription: string | null;
	source: string;
	starttime: DateTime | null;
	title: string;
};
