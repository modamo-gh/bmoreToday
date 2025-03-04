import { useEffect, useState } from "react";
import "./App.css";
import EventsGrid from "./components/EventsGrid";
import SourcesSidebar from "./components/SourcesSidebar";
import { useEventContext } from "./contexts/EventContext";
import { Event } from "./types/Event";

const App = () => {
	const {
		isBaltimoreMagazineChecked,
		isBaltimoreShowplaceChecked,
		isEnochPrattLibraryChecked,
		setFilteredEvents
	} = useEventContext();

	const [events, setEvents] = useState<Event[]>([{
		"id": 1, "title": "Jane Error, Cammy Girl, Coffee And Red, Foolish Pleasure", "location": "Ottobar", "time": "7PM", "price": "$10", "source": "baltshowplace.tumblr.com", "created_at": "2025-03-04T14:21:54.328Z",
		imageURL: ""
	}, {
		"id": 2, "title": "Sharp Spikes & Spurs", "location": "Ottobar Upstairs", "time": "9PM", "price": "$FREE", "source": "baltshowplace.tumblr.com", "created_at": "2025-03-04T14:21:54.331Z",
		imageURL: ""
	}, {
		"id": 3, "title": "Bachelor Boys Showcase", "location": "Metro", "time": "7PM", "price": "$FREE", "source": "baltshowplace.tumblr.com", "created_at": "2025-03-04T14:21:54.333Z",
		imageURL: ""
	}, {
		"id": 4, "title": "Open Mic", "location": "The Depot", "time": "7:30PM", "price": "$FREE", "source": "baltshowplace.tumblr.com", "created_at": "2025-03-04T14:21:54.334Z",
		imageURL: ""
	}, {
		"id": 5, "title": "Multi-Channel Electroacoustic & Conceptual Moveme", "location": "Normal’s Books", "time": "8PM", "price": "Unknown", "source": "baltshowplace.tumblr.com", "created_at": "2025-03-04T14:21:54.334Z",
		imageURL: ""
	}, {
		"id": 6, "title": "Moveable Feast Fundraiser", "location": "Peabody Heights", "time": "5PM", "price": "$FREE", "source": "baltshowplace.tumblr.com", "created_at": "2025-03-04T14:21:54.335Z",
		imageURL: ""
	}, {
		"id": 7, "title": "Bright Moments Jam Session", "location": "Keystone Korner", "time": "7PM", "price": "$0-$10", "source": "baltshowplace.tumblr.com", "created_at": "2025-03-04T14:21:54.336Z",
		imageURL: ""
	}, {
		"id": 8, "title": "Tuesday Jazz Affair", "location": "Bloom’s", "time": "7PM", "price": "$FREE", "source": "baltshowplace.tumblr.com", "created_at": "2025-03-04T14:21:54.337Z",
		imageURL: ""
	}, {
		"id": 9, "title": "Old Time & Bluegrass Jam", "location": "The Bluebird", "time": "6:30PM", "price": "$FREE", "source": "baltshowplace.tumblr.com", "created_at": "2025-03-04T14:21:54.338Z",
		imageURL: ""
	}, {
		"id": 10, "title": "Make Them Suffer, Like Moths To Flames, Windwaker, Aviana", "location": "Soundstage", "time": "6PM", "price": "$31", "source": "baltshowplace.tumblr.com", "created_at": "2025-03-04T14:21:54.340Z",
		imageURL: ""
	}, {
		"id": 11, "title": "“Trans Technologies” w/ Sheena Erete & Oliver Haimson", "location": "Red Emma’s", "time": "7PM", "price": "$FREE", "source": "baltshowplace.tumblr.com", "created_at": "2025-03-04T14:21:54.340Z",
		imageURL: ""
	}, {
		"id": 12, "title": "Lunch & Learn", "location": "Baltimore Safe Haven", "time": "12PM", "price": "$FREE", "source": "baltshowplace.tumblr.com", "created_at": "2025-03-04T14:21:54.341Z",
		imageURL: ""
	}, {
		"id": 13, "title": "Gary & The Groo", "location": "Morsbergers", "time": "7PM", "price": "Unknown", "source": "baltshowplace.tumblr.com", "created_at": "2025-03-04T14:21:54.342Z",
		imageURL: ""
	}, {
		"id": 14, "title": "Taco Tuesday", "location": "Nacho Mamas", "time": "05:00 AM - 05:00 AM", "price": "Free", "source": "https://events.baltimoremagazine.com/event/taco_tuesday", "created_at": "2025-03-04T14:21:54.398Z",
		imageURL: ""
	}, {
		"id": 15, "title": "2025 Saturday ‘Visiter’ Awards Call for Entries", "location": "Virtual Event", "time": "02:00 PM - 10:00 PM", "price": "$", "source": "https://events.baltimoremagazine.com/event/2025-saturday-visiter-awards-call-for-entries", "created_at": "2025-03-04T14:21:54.401Z",
		imageURL: ""
	}, {
		"id": 16, "title": "Sharebaby Diaper Drive", "location": "The Shops at Kenilworth", "time": "02:00 PM - 11:00 PM", "price": "Not Provided", "source": "https://events.baltimoremagazine.com/event/sharebaby-diaper-drive", "created_at": "2025-03-04T14:21:54.403Z",
		imageURL: ""
	}, {
		"id": 17, "title": "Leave No Trace: John Work Garrett in the American Outdoors ", "location": "Evergreen Museum & Library", "time": "04:00 PM - 09:00 PM", "price": "Free-$5", "source": "https://events.baltimoremagazine.com/event/leave-no-trace-john-work-garrett-in-the-american-outdoors", "created_at": "2025-03-04T14:21:54.405Z",
		imageURL: ""
	}, {
		"id": 18, "title": "Journal Club: Exploring the Research on the Intersection of Sports-Related Brain Injuries and Self-Injury", "location": "Virtual Event", "time": "05:00 PM - 06:00 PM", "price": "0-37.50", "source": "https://events.baltimoremagazine.com/event/journal-club-exploring-the-research-on-the-intersection-of-sports-related-brain-injuries-and-self-injury", "created_at": "2025-03-04T14:21:54.406Z",
		imageURL: ""
	}, {
		"id": 19, "title": "Mardi Gras with Hot Club of Baltimore", "location": "Emmanuel Episcopal Churc", "time": "11:00 PM - 01:00 AM", "price": "$35 in advance", "source": "https://events.baltimoremagazine.com/event/mardi-gras-with-hot-club-of-baltimore", "created_at": "2025-03-04T14:21:54.407Z",
		imageURL: ""
	}, {
		"id": 20, "title": "Embrace Spontaneity: an Intro to Improv!", "location": "St. Luke's Church on the Avenue", "time": "11:30 PM - 01:30 AM", "price": "Free", "source": "https://events.baltimoremagazine.com/event/embrace-spontaneity-an-intro-to-improv-3984", "created_at": "2025-03-04T14:21:54.408Z",
		imageURL: ""
	}, {
		"id": 21, "title": "Cult’s Talent Tuesday", "location": "Cult Classic Brewing Company", "time": "12:30 AM - 03:30 AM", "price": "0", "source": "https://events.baltimoremagazine.com/event/cults-talent-tuesday", "created_at": "2025-03-04T14:21:54.409Z",
		imageURL: ""
	}, {
		"id": 22, "title": "Free Tax Preparation", "location": "Central Library", "time": "05:00 AM - 05:00 AM", "price": "Not Provided", "source": "https://calendar.prattlibrary.org/event/free-tax-preparation", "created_at": "2025-03-04T14:21:55.200Z",
		imageURL: ""
	}, {
		"id": 23, "title": "The Civic Pride of the Baltimore Salt Box", "location": "Central Library", "time": "05:00 AM - 05:00 AM", "price": "Not Provided", "source": "https://calendar.prattlibrary.org/event/civic_pride_salt_box", "created_at": "2025-03-04T14:21:55.202Z",
		imageURL: ""
	}, {
		"id": 24, "title": "1st Grade Home School 2025", "location": "Virtual Event", "time": "03:00 PM - 04:00 PM", "price": "Not Provided", "source": "https://calendar.prattlibrary.org/event/1st-grade-home-school-2025", "created_at": "2025-03-04T14:21:55.203Z",
		imageURL: ""
	}, {
		"id": 25, "title": "Chair Yoga", "location": "Hampden", "time": "03:15 PM - 03:15 PM", "price": "Not Provided", "source": "https://calendar.prattlibrary.org/event/chair-yoga", "created_at": "2025-03-04T14:21:55.204Z",
		imageURL: ""
	}, {
		"id": 26, "title": "Chromebook Basics", "location": "Virtual Event", "time": "03:30 PM - 05:30 PM", "price": "Not Provided", "source": "https://calendar.prattlibrary.org/event/chromebook-basics-3331", "created_at": "2025-03-04T14:21:55.205Z",
		imageURL: ""
	}, {
		"id": 27, "title": "Google Workspace", "location": "Southeast Anchor", "time": "03:30 PM - 05:30 PM", "price": "Not Provided", "source": "https://calendar.prattlibrary.org/event/google-workspace-4171", "created_at": "2025-03-04T14:21:55.206Z",
		imageURL: ""
	}, {
		"id": 28, "title": "Workplace Readiness", "location": "Hamilton", "time": "03:30 PM - 05:30 PM", "price": "Not Provided", "source": "https://calendar.prattlibrary.org/event/workplace-readiness", "created_at": "2025-03-04T14:21:55.207Z",
		imageURL: ""
	}, {
		"id": 29, "title": "Workplace Readiness Series", "location": "Orleans Street", "time": "03:30 PM - 05:30 PM", "price": "Not Provided", "source": "https://calendar.prattlibrary.org/event/workplace-readiness-series-3804", "created_at": "2025-03-04T14:21:55.208Z",
		imageURL: ""
	}, {
		"id": 30, "title": "Baby & Toddler Storytime", "location": "Southeast Anchor", "time": "04:00 PM - 04:00 PM", "price": "Not Provided", "source": "https://calendar.prattlibrary.org/event/baby_toddler_storytime_9266", "created_at": "2025-03-04T14:21:55.209Z",
		imageURL: ""
	}, {
		"id": 31, "title": "2nd Grade Home School (2025)", "location": "Virtual Event", "time": "04:30 PM - 05:30 PM", "price": "Not Provided", "source": "https://calendar.prattlibrary.org/event/2nd-grade-home-school-2025-8881", "created_at": "2025-03-04T14:21:55.210Z",
		imageURL: ""
	}]
	);

	useEffect(() => {
		const fetchEvents = async () => {
			try {
				const response = await fetch(
					"https://bmoretoday.modamo.xyz/api/events"
				);
				const data = await response.json();

				console.log("Fetched Events:", data);

				setEvents(data);
			} catch (error) {
				console.error("Error fetching events", error);
			}
		};

		fetchEvents();
	}, []);

	useEffect(() => {
		const fe: Event[] = [];

		if (events) {
			if (isBaltimoreMagazineChecked) {
				fe.push(
					...events.filter(
						(event) =>
							event.source.includes(
								"https://events.baltimoremagazine.com")
					)
				);
			}

			if (isBaltimoreShowplaceChecked) {
				fe.push(
					...events.filter(
						(event) => event.source.includes("baltshowplace.tumblr.com")
					)
				);
			}

			if (isEnochPrattLibraryChecked) {
				fe.push(
					...events.filter(
						(event) =>
							event.source.includes(
								"https://calendar.prattlibrary.org/")
					)
				);
			}
		}

		setFilteredEvents(fe);
	}, [
		events,
		isBaltimoreMagazineChecked,
		isBaltimoreShowplaceChecked,
		isEnochPrattLibraryChecked
	]);

	return (
		<div className="bg-[#1c1a29] h-screen w-screen p-8 gap-8 flex flex-row">
			<SourcesSidebar />
			<EventsGrid />
		</div>
	);
};

export default App;
