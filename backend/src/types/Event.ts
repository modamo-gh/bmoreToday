import { DateTime } from "luxon";

export type Event = {
	endTime: DateTime | null;
	location: string;
	maxPrice?: number | null;
	minPrice?: number | null;
	price: string;
	priceDescription?: string | null;
	startTime: DateTime | null;
	title: string;
};
