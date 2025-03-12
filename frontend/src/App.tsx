import { useEffect, useRef, useState } from "react";
import "./App.css";
import EventsGrid from "./components/EventsGrid";
import Header from "./components/Header";
import SourcesSidebar from "./components/SourcesSidebar";
import { useEventContext } from "./contexts/EventContext";
import { Event } from "./types/Event";

const App = () => {
	const {
		filteredEvents,
		isBaltimoreBeatChecked,
		isBaltimoreMagazineChecked,
		isBaltimoreShowplaceChecked,
		isEnochPrattLibraryChecked,
		setFilteredEvents,
		sortSetting
	} = useEventContext();

	const [events, setEvents] = useState<Event[]>([
		{
			id: 1,
			title: "Modern Color, Webbed Wing, Milly, Garage Sale",
			location: "Ottobar",
			time: "6PM",
			price: "$20",
			source: "baltshowplace.tumblr.com",
			created_at: "2025-03-11T06:45:02.899Z",
			imageurl: null
		},
		{
			id: 2,
			title: "DJ Uncle Quincy",
			location: "Ottobar Upstairs",
			time: "9PM",
			price: "$FREE",
			source: "baltshowplace.tumblr.com",
			created_at: "2025-03-11T06:45:02.922Z",
			imageurl: null
		},
		{
			id: 3,
			title: "Open Mic",
			location: "The Depot",
			time: "7:30PM",
			price: "$FREE",
			source: "baltshowplace.tumblr.com",
			created_at: "2025-03-11T06:45:02.925Z",
			imageurl: null
		},
		{
			id: 4,
			title: "Doubt, Bootcamp, Grudge, Cataclysmic",
			location: "House of Chiefs",
			time: "7PM",
			price: "$15",
			source: "baltshowplace.tumblr.com",
			created_at: "2025-03-11T06:45:02.934Z",
			imageurl: null
		},
		{
			id: 5,
			title: "Terrain, Felix Tandem,, Startist, Early American",
			location: "Zissimos",
			time: "7PM",
			price: "$10",
			source: "baltshowplace.tumblr.com",
			created_at: "2025-03-11T06:45:02.936Z",
			imageurl: null
		},
		{
			id: 6,
			title: "Bmore Karaoke ",
			location: "Peabody Heights",
			time: "7PM",
			price: "$FREE",
			source: "baltshowplace.tumblr.com",
			created_at: "2025-03-11T06:45:02.940Z",
			imageurl: null
		},
		{
			id: 7,
			title: "Thomas Schinabeck Quintet",
			location: "Keystone Korner",
			time: "7PM",
			price: "$10-$25",
			source: "baltshowplace.tumblr.com",
			created_at: "2025-03-11T06:45:02.944Z",
			imageurl: null
		},
		{
			id: 8,
			title: "Tuesday Jazz Affair",
			location: "Bloom’s",
			time: "7PM",
			price: "$FREE",
			source: "baltshowplace.tumblr.com",
			created_at: "2025-03-11T06:45:02.946Z",
			imageurl: null
		},
		{
			id: 9,
			title: "Old Time & Bluegrass Jam",
			location: "The Bluebird",
			time: "6:30PM",
			price: "$FREE",
			source: "baltshowplace.tumblr.com",
			created_at: "2025-03-11T06:45:02.950Z",
			imageurl: null
		},
		{
			id: 10,
			title: "Lunch & Learn",
			location: "Baltimore Safe Haven",
			time: "12PM",
			price: "$FREE",
			source: "baltshowplace.tumblr.com",
			created_at: "2025-03-11T06:45:02.953Z",
			imageurl: null
		},
		{
			id: 11,
			title: "Taco Tuesday",
			location: "Nacho Mamas",
			time: "12:00 AM - 12:00 AM",
			price: "Free",
			source: "https://events.baltimoremagazine.com/event/taco_tuesday",
			created_at: "2025-03-11T06:45:03.634Z",
			imageurl:
				"https://localist-images.azureedge.net/photos/44455082097777/huge/aa0c085c160a43c8d4c7d28e84294d8361aba799.jpg"
		},
		{
			id: 12,
			title: "2025 Saturday ‘Visiter’ Awards Call for Entries",
			location: "Virtual Event",
			time: "09:00 AM - 05:00 PM",
			price: "$",
			source: "https://events.baltimoremagazine.com/event/2025-saturday-visiter-awards-call-for-entries",
			created_at: "2025-03-11T06:45:03.661Z",
			imageurl:
				"https://localist-images.azureedge.net/photos/48666531039603/huge/fa82e8887e56a0c0bb267e4811ba91a9edf1a0bb.jpg"
		},
		{
			id: 13,
			title: "Sharebaby Diaper Drive",
			location: "The Shops at Kenilworth",
			time: "09:00 AM - 06:00 PM",
			price: "Not Provided",
			source: "https://events.baltimoremagazine.com/event/sharebaby-diaper-drive",
			created_at: "2025-03-11T06:45:03.676Z",
			imageurl:
				"https://localist-images.azureedge.net/photos/49019605619984/huge/02c6b252c30e145fd929bdbd595cf146f25fe111.jpg"
		},
		{
			id: 14,
			title: "It's a MF Pleasure",
			location: "Woolly Mammoth Theatre Company",
			time: "10:00 AM - 10:00 PM",
			price: "30",
			source: "https://events.baltimoremagazine.com/event/its-a-mf-pleasure",
			created_at: "2025-03-11T06:45:03.685Z",
			imageurl:
				"https://localist-images.azureedge.net/assets/main/thumbs/event-huge-4820bb5c9e28a2cf4acef980a65992d6aee20211700fbe1494bea7af79aec963.png"
		},
		{
			id: 15,
			title: "Leave No Trace: John Work Garrett in the American Outdoors ",
			location: "Evergreen Museum & Library",
			time: "11:00 AM - 04:00 PM",
			price: "Free-$5",
			source: "https://events.baltimoremagazine.com/event/leave-no-trace-john-work-garrett-in-the-american-outdoors",
			created_at: "2025-03-11T06:45:03.689Z",
			imageurl:
				"https://localist-images.azureedge.net/photos/47561079326308/huge/d8332791c879a84f7c2d28a623af4367db5220ff.jpg"
		},
		{
			id: 16,
			title: "https://www.artechouse.com/program/blooming-wonders/",
			location: "ARTECHOUSE DC",
			time: "12:00 PM - 10:00 PM",
			price: "0-30",
			source: "https://events.baltimoremagazine.com/event/httpswwwartechousecomprogramblooming-wonders",
			created_at: "2025-03-11T06:45:03.700Z",
			imageurl:
				"https://localist-images.azureedge.net/photos/48969439825924/huge/851d7bf75435e99657ec135d3500f496327fda7e.jpg"
		},
		{
			id: 17,
			title: "Living with Parkinson’s Disease",
			location: "Virtual Event",
			time: "02:00 PM - 03:00 PM",
			price: "Free",
			source: "https://events.baltimoremagazine.com/event/living-with-parkinsons-disease",
			created_at: "2025-03-11T06:45:03.708Z",
			imageurl:
				"https://localist-images.azureedge.net/photos/48057822191552/huge/38836bd973396620958e57d1e1b0aaf76405e4a9.jpg"
		},
		{
			id: 18,
			title: "The Baltimore Banner Off the Menu with MARTA: A Culinary Experience",
			location: "Marta Fine Food and Spirits",
			time: "05:30 PM - 05:30 PM",
			price: "200",
			source: "https://events.baltimoremagazine.com/event/the-baltimore-banner-off-the-menu-with-marta-a-culinary-experience",
			created_at: "2025-03-11T06:45:03.711Z",
			imageurl:
				"https://localist-images.azureedge.net/photos/48736977355615/huge/f5526cc2790c600dec0f4848bb66a712d11fcf4a.jpg"
		},
		{
			id: 19,
			title: "Books & Beers 2025",
			location: "Cult Classic Brewing Company",
			time: "06:00 PM - 07:30 PM",
			price: "0",
			source: "https://events.baltimoremagazine.com/event/books-beers-2025",
			created_at: "2025-03-11T06:45:03.733Z",
			imageurl:
				"https://localist-images.azureedge.net/photos/48108712592244/huge/792f8dd9a8c9e25bbc9b8fa2faec940a0dbde384.jpg"
		},
		{
			id: 20,
			title: "Meet the Winemaker Exclusive at Chesapeake Wine Company",
			location: "Chesapeake Wine Company",
			time: "06:00 PM - 08:00 PM",
			price: "12.51",
			source: "https://events.baltimoremagazine.com/event/meet-the-winemaker-exclusive-at-chesapeake-wine-company",
			created_at: "2025-03-11T06:45:03.747Z",
			imageurl:
				"https://localist-images.azureedge.net/photos/49056390033297/huge/a5feef93aec7f927bf93ebeb331ee8ffa139845b.jpg"
		},
		{
			id: 21,
			title: "Purim Party",
			location: "Rosenbloom Owings Mills JCC",
			time: "06:00 PM - 08:00 PM",
			price: "Free",
			source: "https://events.baltimoremagazine.com/event/purim-party",
			created_at: "2025-03-11T06:45:04.189Z",
			imageurl:
				"https://localist-images.azureedge.net/photos/48861621160948/huge/a61bac627e622a766053ccf6d0bd380faf7dd010.jpg"
		},
		{
			id: 22,
			title: "Fundamentals of Improv Level 1 - Multi-week Class!",
			location: "St. Luke's Church on the Avenue",
			time: "06:30 PM - 08:30 PM",
			price: "$225, scholarships available",
			source: "https://events.baltimoremagazine.com/event/fundamentals-of-improv-level-1-multi-week-class-2148",
			created_at: "2025-03-11T06:45:04.192Z",
			imageurl:
				"https://localist-images.azureedge.net/photos/48861196935570/huge/225e7858983dff90115ff5f7ca1851f720fd4ac3.jpg"
		},
		{
			id: 23,
			title: "Thomas Schinabeck Quintet",
			location: "Keystone Korner Baltimore",
			time: "07:00 PM - 08:30 PM",
			price: "https://www.instantseats.com/?fuseaction=home.artist&VenueID=514&artistid=25714&_gl=1*1mfi8ux*_gcl_au*MTEzODMyNzcwNi4xNzM0MzY4MDQw*_ga*MTk2NTA4NDkxNy4xNjU1MjE4OTY1*_ga_XFCVF897QY*MTc0MTM2NzI0Ny43MjUuMS4xNzQxMzY3Mzc3LjAuMC4w",
			source: "https://events.baltimoremagazine.com/event/thomas-schinabeck-quintet-3209",
			created_at: "2025-03-11T06:45:04.194Z",
			imageurl:
				"https://localist-images.azureedge.net/photos/49056219884454/huge/c8e1c9be0e0046916ae89c5197609a51ae3db715.jpg"
		},
		{
			id: 24,
			title: "Cult’s Talent Tuesday",
			location: "Cult Classic Brewing Company",
			time: "07:30 PM - 10:30 PM",
			price: "0",
			source: "https://events.baltimoremagazine.com/event/cults-talent-tuesday",
			created_at: "2025-03-11T06:45:04.196Z",
			imageurl:
				"https://localist-images.azureedge.net/photos/48488544554394/huge/857e6303369303df0aeb7a0e7a447cc61030910d.jpg"
		},
		{
			id: 25,
			title: "Free Tax Preparation",
			location: "Central Library",
			time: "12:00 AM - 12:00 AM",
			price: "Not Provided",
			source: "https://calendar.prattlibrary.org/event/free-tax-preparation",
			created_at: "2025-03-11T06:45:04.892Z",
			imageurl:
				"https://localist-images.azureedge.net/photos/47800328927902/huge/42687aefd820c9279811b65ab5fc5d55760b637f.jpg"
		},
		{
			id: 26,
			title: "The Civic Pride of the Baltimore Salt Box",
			location: "Central Library",
			time: "12:00 AM - 12:00 AM",
			price: "Not Provided",
			source: "https://calendar.prattlibrary.org/event/civic_pride_salt_box",
			created_at: "2025-03-11T06:45:04.895Z",
			imageurl:
				"https://localist-images.azureedge.net/photos/48243741753091/huge/1d345268a2c4e2f0885fcbf6b162fa7d9d5ad06d.jpg"
		},
		{
			id: 27,
			title: "1st Grade Home School 2025",
			location: "Virtual Event",
			time: "10:00 AM - 11:00 AM",
			price: "Not Provided",
			source: "https://calendar.prattlibrary.org/event/1st-grade-home-school-2025",
			created_at: "2025-03-11T06:45:04.898Z",
			imageurl:
				"https://localist-images.azureedge.net/photos/48277105299092/huge/3dae7223e9b31b94ff0d237998848093c823802d.jpg"
		},
		{
			id: 28,
			title: "Chair Yoga",
			location: "Hampden",
			time: "10:15 AM - 10:15 AM",
			price: "Not Provided",
			source: "https://calendar.prattlibrary.org/event/chair-yoga",
			created_at: "2025-03-11T06:45:04.903Z",
			imageurl:
				"https://localist-images.azureedge.net/photos/649065/huge/febd7ed3af2cfd2b08a6cf6673394d866c84a782.jpg"
		},
		{
			id: 29,
			title: "Tuesday Matinee: Wicked ",
			location: "Hamilton",
			time: "10:15 AM - 12:15 PM",
			price: "Not Provided",
			source: "https://calendar.prattlibrary.org/event/tuesday-matinee-wicked",
			created_at: "2025-03-11T06:45:04.905Z",
			imageurl:
				"https://localist-images.azureedge.net/photos/48359052004580/huge/d41af0a8474e6f75d67e0ca792d6ac7c5aaf9a4f.jpg"
		},
		{
			id: 30,
			title: "Chromebook Basics",
			location: "Edmondson Avenue",
			time: "10:30 AM - 12:30 PM",
			price: "Not Provided",
			source: "https://calendar.prattlibrary.org/event/chromebook-basics-8667",
			created_at: "2025-03-11T06:45:04.911Z",
			imageurl:
				"https://localist-images.azureedge.net/photos/48286006888046/huge/badeb7264acca90052941281e08d41549eb51d85.jpg"
		},
		{
			id: 31,
			title: "Google Workspace",
			location: "Southeast Anchor",
			time: "10:30 AM - 12:30 PM",
			price: "Not Provided",
			source: "https://calendar.prattlibrary.org/event/google-workspace-4171",
			created_at: "2025-03-11T06:45:04.923Z",
			imageurl:
				"https://localist-images.azureedge.net/photos/48172037546642/huge/a317675c3ea595bbdec96afb8ebcbbb37d7df502.jpg"
		},
		{
			id: 32,
			title: "Workplace Readiness",
			location: "Hamilton",
			time: "10:30 AM - 12:30 PM",
			price: "Not Provided",
			source: "https://calendar.prattlibrary.org/event/workplace-readiness",
			created_at: "2025-03-11T06:45:04.929Z",
			imageurl:
				"https://localist-images.azureedge.net/photos/48285430062612/huge/f51a28cfaab1a6a3d63157070802a3421721c745.jpg"
		},
		{
			id: 33,
			title: "Baby & Toddler Storytime",
			location: "Southeast Anchor",
			time: "11:00 AM - 11:00 AM",
			price: "Not Provided",
			source: "https://calendar.prattlibrary.org/event/baby_toddler_storytime_9266",
			created_at: "2025-03-11T06:45:04.939Z",
			imageurl:
				"https://localist-images.azureedge.net/photos/683143/huge/46a36bd5adf9778b95c89f92140e82662e32c4b8.jpg"
		},
		{
			id: 34,
			title: "Coffee and Classics Book Club",
			location: "Light Street",
			time: "11:00 AM - 12:00 PM",
			price: "Not Provided",
			source: "https://calendar.prattlibrary.org/event/coffee-and-classics-book-club-4410",
			created_at: "2025-03-11T06:45:04.941Z",
			imageurl:
				"https://localist-images.azureedge.net/photos/649069/huge/d32bd77837f0871461b1d23207be837a7586df0d.jpg"
		},
		{
			id: 35,
			title: "2nd Grade Home School (2025)",
			location: "Virtual Event",
			time: "11:30 AM - 12:30 PM",
			price: "Not Provided",
			source: "https://calendar.prattlibrary.org/event/2nd-grade-home-school-2025-8881",
			created_at: "2025-03-11T06:45:05.626Z",
			imageurl:
				"https://localist-images.azureedge.net/photos/48358284380264/huge/f046c1656053166f6a358c044b38c1d38ab5874d.jpg"
		},
		{
			id: 36,
			title: "Introduction to Computer Basics",
			location: "Walbrook",
			time: "12:00 PM - 02:00 PM",
			price: "Not Provided",
			source: "https://calendar.prattlibrary.org/event/introduction-to-computer-basics-8914",
			created_at: "2025-03-11T06:45:05.629Z",
			imageurl:
				"https://localist-images.azureedge.net/photos/648964/huge/6432c342cf369d1b97b4198eca2591b79a428feb.jpg"
		},
		{
			id: 37,
			title: "Lawyer in the Library ",
			location: "Waverly",
			time: "12:00 PM - 02:00 PM",
			price: "Not Provided",
			source: "https://calendar.prattlibrary.org/event/lawyer-in-the-library-waverly",
			created_at: "2025-03-11T06:45:05.632Z",
			imageurl:
				"https://localist-images.azureedge.net/photos/649048/huge/0583b40fc4bdcfb1eef24d257960e17f35889782.jpg"
		},
		{
			id: 38,
			title: "3rd Grade Home School ",
			location: "Virtual Event",
			time: "01:30 PM - 02:30 PM",
			price: "Not Provided",
			source: "https://calendar.prattlibrary.org/event/3rd-grade-home-school-9562",
			created_at: "2025-03-11T06:45:05.634Z",
			imageurl:
				"https://localist-images.azureedge.net/photos/48278073617994/huge/68778110c32134b7d8bbdab02ca39edc1cf3549b.jpg"
		},
		{
			id: 39,
			title: "Chromebook Basics",
			location: "Pennsylvania Avenue",
			time: "02:00 PM - 04:00 PM",
			price: "Not Provided",
			source: "https://calendar.prattlibrary.org/event/chromebook-basics-3825",
			created_at: "2025-03-11T06:45:05.636Z",
			imageurl:
				"https://localist-images.azureedge.net/photos/48286006888046/huge/badeb7264acca90052941281e08d41549eb51d85.jpg"
		},
		{
			id: 40,
			title: "Digital Drop-In Clinic",
			location: "Southeast Anchor",
			time: "02:00 PM - 04:00 PM",
			price: "Not Provided",
			source: "https://calendar.prattlibrary.org/event/digital_drop_in",
			created_at: "2025-03-11T06:45:05.638Z",
			imageurl:
				"https://localist-images.azureedge.net/photos/648962/huge/a63a95710cef6b675daa039eb0fcf97f983b2492.jpg"
		},
		{
			id: 41,
			title: "Keyboarding/Microsoft Office 2019, Applications",
			location: "Patterson Park",
			time: "02:00 PM - 04:00 PM",
			price: "Not Provided",
			source: "https://calendar.prattlibrary.org/event/keyboardingmicrosoft-office-2019-applications",
			created_at: "2025-03-11T06:45:05.640Z",
			imageurl:
				"https://localist-images.azureedge.net/photos/48242264481297/huge/fe6d4ac6f64a286265d374283d15dbc287f74d44.jpg"
		},
		{
			id: 42,
			title: "Women's History Month Bingo!",
			location: "Cherry Hill",
			time: "02:00 PM - 03:00 PM",
			price: "Not Provided",
			source: "https://calendar.prattlibrary.org/event/womens-history-month-bingo",
			created_at: "2025-03-11T06:45:05.644Z",
			imageurl:
				"https://localist-images.azureedge.net/photos/48295684238165/huge/1970aca3d039418e0ff0862c4a39ad0781e635bc.jpg"
		},
		{
			id: 43,
			title: "3D Printing",
			location: "Govans",
			time: "03:00 PM - 03:00 PM",
			price: "Not Provided",
			source: "https://calendar.prattlibrary.org/event/3d-printing-4473",
			created_at: "2025-03-11T06:45:05.646Z",
			imageurl:
				"https://localist-images.azureedge.net/photos/48136148103307/huge/59d46cbcf9ff405507c220fdcfcffdddea20820f.jpg"
		},
		{
			id: 44,
			title: "After School Fun",
			location: "Hamilton",
			time: "03:00 PM - 04:00 PM",
			price: "Not Provided",
			source: "https://calendar.prattlibrary.org/event/after_school_funhamilton",
			created_at: "2025-03-11T06:45:05.648Z",
			imageurl:
				"https://localist-images.azureedge.net/photos/45121339551779/huge/257ae667600af9a4e49fda504a101108f730fa1e.jpg"
		},
		{
			id: 45,
			title: "Crafternoon: Ocean Drum",
			location: "Walbrook",
			time: "03:00 PM - 04:00 PM",
			price: "Not Provided",
			source: "https://calendar.prattlibrary.org/event/crafternoon-ocean-drum",
			created_at: "2025-03-11T06:45:06.357Z",
			imageurl:
				"https://localist-images.azureedge.net/photos/48489826859132/huge/bc07ac5202284b54c60f558a5d6793a985a03832.jpg"
		},
		{
			id: 46,
			title: "Friendship bracelets! ",
			location: "Reisterstown Road",
			time: "03:00 PM - 05:00 PM",
			price: "Not Provided",
			source: "https://calendar.prattlibrary.org/event/friendship-bracelets",
			created_at: "2025-03-11T06:45:06.360Z",
			imageurl:
				"https://localist-images.azureedge.net/photos/48588629393346/huge/54c2536d53b076bff4c01b4f8a16b90d38ae8a39.jpg"
		},
		{
			id: 47,
			title: "Teen Craft & Chat",
			location: "Hampden",
			time: "03:00 PM - 04:00 PM",
			price: "Not Provided",
			source: "https://calendar.prattlibrary.org/event/teen-craft-chat",
			created_at: "2025-03-11T06:45:06.362Z",
			imageurl:
				"https://localist-images.azureedge.net/photos/47225558353676/huge/af783ee57f368ca3edfcb6464f01efb1fcb1228d.jpg"
		},
		{
			id: 48,
			title: "Crafternoon: Ocean Paint-A-Palooza",
			location: "Orleans Street",
			time: "03:30 PM - 05:00 PM",
			price: "Not Provided",
			source: "https://calendar.prattlibrary.org/event/crafternoon-ocean-paint-a-palooza",
			created_at: "2025-03-11T06:45:06.364Z",
			imageurl:
				"https://localist-images.azureedge.net/photos/48544590542648/huge/57d3c737cd2fa9ff422fd506871c2f3b835ec999.jpg"
		},
		{
			id: 49,
			title: "Light Street Lab",
			location: "Light Street",
			time: "03:30 PM - 03:30 PM",
			price: "Not Provided",
			source: "https://calendar.prattlibrary.org/event/light-street-lab-4754",
			created_at: "2025-03-11T06:45:06.366Z",
			imageurl:
				"https://localist-images.azureedge.net/photos/649040/huge/42c33746d1c1728524eb83347d97293af3c7e263.jpg"
		},
		{
			id: 50,
			title: "Teen Game Night",
			location: "Herring Run",
			time: "03:30 PM - 05:00 PM",
			price: "Not Provided",
			source: "https://calendar.prattlibrary.org/event/teen_game_night_hrr",
			created_at: "2025-03-11T06:45:06.375Z",
			imageurl:
				"https://localist-images.azureedge.net/photos/43657964583808/huge/244dfae0cb2be28e0ba5d5588b34dc2b7d29c7c2.jpg"
		},
		{
			id: 51,
			title: "Tinker Tuesdays",
			location: "Canton",
			time: "03:30 PM - 03:30 PM",
			price: "Not Provided",
			source: "https://calendar.prattlibrary.org/event/tinker-tuesdays",
			created_at: "2025-03-11T06:45:06.377Z",
			imageurl:
				"https://localist-images.azureedge.net/photos/48340033825371/huge/2d91b26ff1cd1edc4df0e2a6dd8b09ce56f688fc.jpg"
		},
		{
			id: 52,
			title: "Penn North Dances",
			location: "Pennsylvania Avenue",
			time: "04:00 PM - 06:00 PM",
			price: "Not Provided",
			source: "https://calendar.prattlibrary.org/event/penn-north-dances",
			created_at: "2025-03-11T06:45:06.393Z",
			imageurl:
				"https://localist-images.azureedge.net/photos/648963/huge/6c753c3ff736c3747dd472fff8f50dc6d8902989.jpg"
		},
		{
			id: 53,
			title: "Introduction to Google Workspace",
			location: "Pennsylvania Avenue",
			time: "05:30 PM - 07:30 PM",
			price: "Not Provided",
			source: "https://calendar.prattlibrary.org/event/introduction-to-google-workspace-8434",
			created_at: "2025-03-11T06:45:06.400Z",
			imageurl:
				"https://localist-images.azureedge.net/photos/48296023382754/huge/843a134ff4a1efc578ffb769076b5aca8fd3b518.jpg"
		},
		{
			id: 54,
			title: "Community Iftar with Mera Kitchen Collective",
			location: "Central Library",
			time: "06:00 PM - 08:00 PM",
			price: "Not Provided",
			source: "https://calendar.prattlibrary.org/event/copy-of-community-iftar-with-mera-kitchen-collective",
			created_at: "2025-03-11T06:45:06.410Z",
			imageurl:
				"https://localist-images.azureedge.net/photos/45277964023635/huge/58bf19aa5f44a54a2c17d05148d90fa1643f7ae1.jpg"
		},
		{
			id: 55,
			title: 'Elaine Weiss: "Spell Freedom"',
			location: "Virtual Event",
			time: "07:00 PM - 08:00 PM",
			price: "Not Provided",
			source: "https://calendar.prattlibrary.org/event/elanie-weiss-spell-freedom",
			created_at: "2025-03-11T06:45:06.791Z",
			imageurl:
				"https://localist-images.azureedge.net/photos/48621983841686/huge/568465112a21b1e8d94e4b06cf6283ff807a64b2.jpg"
		},
		{
			id: 56,
			title: "Public Board Meeting",
			location: "Digital Harbor High School",
			time: "5:30 p.m. to 7:30 p.m.",
			price: "Not Provided",
			source: "https://baltimorebeat.com/baltimore-government-and-community-events-02-26-25-03-12-25/",
			created_at: "2025-03-11T06:45:07.529Z",
			imageurl: null
		},
		{
			id: 57,
			title: "Fire and Ice: The Music of Barbara Strozzi and Isabella Leonarda",
			location: "Not Provided",
			time: "6:30 p.m. to 7:30 p.m.",
			price: "Not Provided",
			source: "https://baltimorebeat.com/baltimore-arts-and-culture-events-02-26-24-03-12-25/",
			created_at: "2025-03-11T06:45:07.796Z",
			imageurl: null
		}
	]);
	const [headerHeight, setHeaderHeight] = useState(0);
	const [width, setWidth] = useState(window.innerWidth);

	const headerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (headerRef.current) {
			setHeaderHeight(headerRef.current.offsetHeight);
		}

		const handleResize = () => {
			if (headerRef.current) {
				setHeaderHeight(headerRef.current.offsetHeight);
			}

			setWidth(window.innerWidth);
		};

		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	useEffect(() => {
		const mascots = [
			"/assets/natty.png",
			"/assets/oriole.png",
			"/assets/raven.png",
			"/assets/utz.png"
		];
		let mascotIndex = 0;

		const fetchEvents = async () => {
			try {
				const response = await fetch(
					"https://bmoretoday.modamo.xyz/api/events"
				);
				const data: Event[] = await response.json();

				for (const event of data) {
					if (!event.imageurl) {
						event.imageurl = mascots[mascotIndex];
						mascotIndex = (mascotIndex + 1) % mascots.length;

						console.log(event);
					}
				}

				setEvents(data);
			} catch (error) {
				console.error("Error fetching events", error);
			}
		};

		fetchEvents();
	}, []);

	useEffect(() => {
		if (events) {
			const sortedEvents = [...events];

			switch (sortSetting) {
				case "aToZ":
					sortedEvents.sort((a, b) =>
						a.title
							.toLowerCase()
							.localeCompare(b.title.toLowerCase())
					);
					break;
				case "zToA":
					sortedEvents.sort((a, b) =>
						b.title
							.toLowerCase()
							.localeCompare(a.title.toLowerCase())
					);
					break;
				default:
					break;
			}

			const filtered = sortedEvents.filter((event) => {
				return (
					(isBaltimoreBeatChecked &&
						event.source.includes("https://baltimorebeat.com")) ||
					(isBaltimoreMagazineChecked &&
						event.source.includes(
							"https://events.baltimoremagazine.com"
						)) ||
					(isBaltimoreShowplaceChecked &&
						event.source.includes("baltshowplace.tumblr.com")) ||
					(isEnochPrattLibraryChecked &&
						event.source.includes(
							"https://calendar.prattlibrary.org/"
						))
				);
			});

			setFilteredEvents(filtered);
		}
	}, [
		events,
		isBaltimoreBeatChecked,
		isBaltimoreMagazineChecked,
		isBaltimoreShowplaceChecked,
		isEnochPrattLibraryChecked,
		setFilteredEvents,
		sortSetting
	]);

	return (
		<div className="bg-[#1c1a29] flex flex-col gap-8 h-screen max-w-screen p-8">
			<Header headerRef={headerRef} width={width} />
			<div
				className={`flex flex-col gap-8 lg:flex-row w-full ${
					(isBaltimoreBeatChecked ||
						isBaltimoreMagazineChecked ||
						isBaltimoreShowplaceChecked ||
						isEnochPrattLibraryChecked) &&
					events?.length &&
					width >= 768
						? "pb-8"
						: ""
				}`}
				style={{ height: `calc(100% - ${headerHeight}px)` }}
			>
				<SourcesSidebar width={width} />
				<EventsGrid />
			</div>
		</div>
	);
};

export default App;
