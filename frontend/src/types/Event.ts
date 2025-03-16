import { DateTime } from "luxon";

export type Event = {
	created_at: string;
	endtime: DateTime | null;
	id: number;
	imageurl: string;
	location: string;
	maxPrice: number | null;
	minPrice: number | null;
	price: string;
	priceDescription: string | null;
	source: string;
	starttime: DateTime | null;
	title: string;
};
