import { useEffect, useRef, useState } from "react";
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

	const [events, setEvents] = useState<Event[]>([
		{
			id: 1,
			title: "Shutter Theory, Canaries, Bedridden, Virtua",
			location: "Ottobar",
			time: "7PM",
			price: "$15",
			source: "baltshowplace.tumblr.com",
			created_at: "2025-03-06T06:45:02.902Z",
			imageurl: null
		},
		{
			id: 2,
			title: "Mondo Baltimore",
			location: "Ottobar Upstairs",
			time: "7PM",
			price: "$FREE",
			source: "baltshowplace.tumblr.com",
			created_at: "2025-03-06T06:45:02.922Z",
			imageurl: null
		},
		{
			id: 3,
			title: "Coroner, Deceased, Nuclear Tomb",
			location: "Metro",
			time: "6:30PM",
			price: "$SOLD OUT",
			source: "baltshowplace.tumblr.com",
			created_at: "2025-03-06T06:45:02.926Z",
			imageurl: null
		},
		{
			id: 4,
			title: "Mobtown Music Ki",
			location: "Mobtown Ballroom",
			time: "9:30AM",
			price: "Unknown",
			source: "baltshowplace.tumblr.com",
			created_at: "2025-03-06T06:45:02.927Z",
			imageurl: null
		},
		{
			id: 5,
			title: "The Lighthouse Writer’s Workshop",
			location: "Motor House",
			time: "7PM",
			price: "$FREE",
			source: "baltshowplace.tumblr.com",
			created_at: "2025-03-06T06:45:02.933Z",
			imageurl: null
		},
		{
			id: 6,
			title: "Urin, Skallar, Warxgames, Cataclysm",
			location: "Holy Frijoles",
			time: "9PM",
			price: "Unknown",
			source: "baltshowplace.tumblr.com",
			created_at: "2025-03-06T06:45:02.939Z",
			imageurl: null
		},
		{
			id: 7,
			title: "S.C.U.M., Druid Stone, Cat Crash, Ragdollz",
			location: "The Undercroft",
			time: "7PM",
			price: "$10",
			source: "baltshowplace.tumblr.com",
			created_at: "2025-03-06T06:45:02.947Z",
			imageurl: null
		},
		{
			id: 8,
			title: "Pedazo De Carne Con Ojo, Caleb Holt, Androgynous Bulge, File Select",
			location: "The Compound",
			time: "7:30PM",
			price: "$10",
			source: "baltshowplace.tumblr.com",
			created_at: "2025-03-06T06:45:02.963Z",
			imageurl: null
		},
		{
			id: 9,
			title: "Phreestyle w/ Demian, Benjamin Banger, Ocho, Eze Jacks",
			location: "Phlote (300 W Pratt St 3rd floor)",
			time: "7PM",
			price: "Unknown",
			source: "baltshowplace.tumblr.com",
			created_at: "2025-03-06T06:45:02.968Z",
			imageurl: null
		},
		{
			id: 10,
			title: "Slow Reactors",
			location: "Creative Alliance",
			time: "7PM",
			price: "$30",
			source: "baltshowplace.tumblr.com",
			created_at: "2025-03-06T06:45:02.972Z",
			imageurl: null
		},
		{
			id: 11,
			title: "Reggae Movie Night",
			location: "Peabody Heights",
			time: "7PM",
			price: "$FREE",
			source: "baltshowplace.tumblr.com",
			created_at: "2025-03-06T06:45:02.974Z",
			imageurl: null
		},
		{
			id: 12,
			title: "The Wildmans, Geraldine",
			location: "8x10",
			time: "7PM",
			price: "$19",
			source: "baltshowplace.tumblr.com",
			created_at: "2025-03-06T06:45:02.983Z",
			imageurl: null
		},
		{
			id: 13,
			title: "Charlie Reichert Powell",
			location: "An Die Musik",
			time: "7PM",
			price: "$10-$20",
			source: "baltshowplace.tumblr.com",
			created_at: "2025-03-06T06:45:02.984Z",
			imageurl: null
		},
		{
			id: 14,
			title: "Simon Phillips & Protocol V",
			location: "Keystone Korner",
			time: "7PM",
			price: "$15-$55",
			source: "baltshowplace.tumblr.com",
			created_at: "2025-03-06T06:45:02.987Z",
			imageurl: null
		},
		{
			id: 15,
			title: "Squid Teeth",
			location: "The Hargrove",
			time: "7:30PM",
			price: "$Donations",
			source: "baltshowplace.tumblr.com",
			created_at: "2025-03-06T06:45:02.990Z",
			imageurl: null
		},
		{
			id: 16,
			title: "“Taking the State Out of the Body” w/ Eliana Rubin",
			location: "Red Emma’s",
			time: "7PM",
			price: "$FREE",
			source: "baltshowplace.tumblr.com",
			created_at: "2025-03-06T06:45:02.996Z",
			imageurl: null
		},
		{
			id: 17,
			title: "Comedy Night",
			location: "The Manor",
			time: "8PM",
			price: "$FREE",
			source: "baltshowplace.tumblr.com",
			created_at: "2025-03-06T06:45:02.998Z",
			imageurl: null
		},
		{
			id: 18,
			title: "Silent Book Club (BYO Book)",
			location: "Old Major",
			time: "6:30PM",
			price: "$FREE",
			source: "baltshowplace.tumblr.com",
			created_at: "2025-03-06T06:45:03.000Z",
			imageurl: null
		},
		{
			id: 19,
			title: "200 Hour Yoga Teacher Training in Rishikesh India",
			location: "Arogya Yoga School",
			time: "12:00 AM - 07:00 PM",
			price: "600",
			source: "https://events.baltimoremagazine.com/event/200-hour-yoga-teacher-training-in-rishikesh-india",
			created_at: "2025-03-06T06:45:03.673Z",
			imageurl:
				"https://localist-images.azureedge.net/photos/47086740766026/huge/2bba15cd5abaed26e740918e8d088bdc3b3a092e.jpg"
		},
		{
			id: 20,
			title: "2025 Saturday ‘Visiter’ Awards Call for Entries",
			location: "Virtual Event",
			time: "09:00 AM - 05:00 PM",
			price: "$",
			source: "https://events.baltimoremagazine.com/event/2025-saturday-visiter-awards-call-for-entries",
			created_at: "2025-03-06T06:45:03.709Z",
			imageurl:
				"https://localist-images.azureedge.net/photos/48666531039603/huge/fa82e8887e56a0c0bb267e4811ba91a9edf1a0bb.jpg"
		},
		{
			id: 21,
			title: "Sharebaby Diaper Drive",
			location: "The Shops at Kenilworth",
			time: "09:00 AM - 06:00 PM",
			price: "Not Provided",
			source: "https://events.baltimoremagazine.com/event/sharebaby-diaper-drive",
			created_at: "2025-03-06T06:45:03.725Z",
			imageurl:
				"https://localist-images.azureedge.net/photos/49019605619984/huge/02c6b252c30e145fd929bdbd595cf146f25fe111.jpg"
		},
		{
			id: 22,
			title: "Air Quality: The Influence of Smog on European Modernism",
			location: "The Baltimore Museum of Art",
			time: "10:00 AM - 09:00 PM",
			price: "FREE",
			source: "https://events.baltimoremagazine.com/event/air-quality-the-influence-of-smog-on-european-modernism",
			created_at: "2025-03-06T06:45:03.743Z",
			imageurl:
				"https://localist-images.azureedge.net/photos/48667470343584/huge/c8ea26b4856ffd1c78e0d3b95ba2c8d0775b31c7.jpg"
		},
		{
			id: 23,
			title: "It's a MF Pleasure",
			location: "Woolly Mammoth Theatre Company",
			time: "10:00 AM - 10:00 PM",
			price: "30",
			source: "https://events.baltimoremagazine.com/event/its-a-mf-pleasure",
			created_at: "2025-03-06T06:45:03.757Z",
			imageurl:
				"https://localist-images.azureedge.net/assets/main/thumbs/event-huge-4820bb5c9e28a2cf4acef980a65992d6aee20211700fbe1494bea7af79aec963.png"
		},
		{
			id: 24,
			title: "LaToya Ruby Frazier: More Than Conquerors: A Monument for Community Health Workers of Baltimore, Maryland 2021-2022",
			location: "The Baltimore Museum of Art",
			time: "10:00 AM - 08:00 PM",
			price: "FREE",
			source: "https://events.baltimoremagazine.com/event/latoya-ruby-frazier-more-than-conquerors-a-monument-for-community-health-workers-of-baltimore-maryland-2021-2022",
			created_at: "2025-03-06T06:45:03.772Z",
			imageurl:
				"https://localist-images.azureedge.net/photos/47676493894314/huge/8fcea1915cac7c292658facc1ce8de81db5532a9.jpg"
		},
		{
			id: 25,
			title: "TWILIGHT ZONE: Hidden Wonders of the Ocean",
			location: "ARTECHOUSE DC",
			time: "10:00 AM - 10:00 PM",
			price: "0-30",
			source: "https://events.baltimoremagazine.com/event/twilight-zone-hidden-wonders-of-the-ocean-8957",
			created_at: "2025-03-06T06:45:03.797Z",
			imageurl:
				"https://localist-images.azureedge.net/photos/48706272105250/huge/07eb3f6c0bb945f520b1f0f1683d740ff7bf44c3.jpg"
		},
		{
			id: 26,
			title: "Watershed: Transforming the Landscape in Early Modern Dutch Art",
			location: "The Baltimore Museum of Art",
			time: "10:00 AM - 09:00 PM",
			price: "FREE",
			source: "https://events.baltimoremagazine.com/event/watershed-transforming-the-landscape-in-early-modern-dutch-art",
			created_at: "2025-03-06T06:45:03.805Z",
			imageurl:
				"https://localist-images.azureedge.net/photos/48667317204467/huge/5cc4120af506d475efe36a40b0f50502be765c54.jpg"
		},
		{
			id: 27,
			title: "Leave No Trace: John Work Garrett in the American Outdoors ",
			location: "Evergreen Museum & Library",
			time: "11:00 AM - 04:00 PM",
			price: "Free-$5",
			source: "https://events.baltimoremagazine.com/event/leave-no-trace-john-work-garrett-in-the-american-outdoors",
			created_at: "2025-03-06T06:45:03.808Z",
			imageurl:
				"https://localist-images.azureedge.net/photos/47561079326308/huge/d8332791c879a84f7c2d28a623af4367db5220ff.jpg"
		},
		{
			id: 28,
			title: 'The Cavanagh House\'s "Revive! Designer Showhouse 2025"',
			location: "Baltimore Innovation Center",
			time: "05:00 PM - 09:00 PM",
			price: "$150 for 4-days (March 6-9), $35/day or $75 for 3 days (March 7-9), student pricing at $25/day or $55 for 3 days (March 7-9).",
			source: "https://events.baltimoremagazine.com/event/the-cavanagh-houses-revive-designer-showhouse-2025",
			created_at: "2025-03-06T06:45:03.809Z",
			imageurl:
				"https://localist-images.azureedge.net/photos/48349575340976/huge/aa6e9d492179ee299c2730f431d97add56c71bfd.jpg"
		},
		{
			id: 29,
			title: "First Thursdays: Make and Mingle",
			location: "The Walters Art Museum",
			time: "06:00 PM - 07:30 PM",
			price: "Free",
			source: "https://events.baltimoremagazine.com/event/first-thursdays-make-and-mingle-5851",
			created_at: "2025-03-06T06:45:04.596Z",
			imageurl:
				"https://localist-images.azureedge.net/photos/48349909736954/huge/c8bcbcac815174ace5f14e2b1e199e0bd974a52f.jpg"
		},
		{
			id: 30,
			title: "Gallery Sip and Stroll: Women of Maryland",
			location: "Maryland Center for History and Culture",
			time: "06:00 PM - 08:00 PM",
			price: "Free",
			source: "https://events.baltimoremagazine.com/event/gallery-sip-and-stroll-women-of-maryland",
			created_at: "2025-03-06T06:45:04.600Z",
			imageurl:
				"https://localist-images.azureedge.net/photos/48747146977994/huge/2c9c03cd993fd8ef4307ce8f6442aadd64a2a5a4.jpg"
		},
		{
			id: 31,
			title: "Illuminating Homewood: Understanding the 19th-Century Lighting Revolution ",
			location: "Homewood Museum",
			time: "06:00 PM - 07:00 PM",
			price: "$5-7",
			source: "https://events.baltimoremagazine.com/event/illuminating-homewood-understanding-the-19th-century-lighting-revolution",
			created_at: "2025-03-06T06:45:04.604Z",
			imageurl:
				"https://localist-images.azureedge.net/photos/48854246341037/huge/65518c74d75bc7afd6c9870e1a88337db68a7bb3.jpg"
		},
		{
			id: 32,
			title: "The Art of Impact: Celebrating 20 Years of Community Connections- Opening Reception",
			location: "Maryland Art Place",
			time: "06:00 PM - 08:00 PM",
			price: "Free",
			source: "https://events.baltimoremagazine.com/event/the-art-of-impact-celebrating-20-years-of-community-connections-opening-reception",
			created_at: "2025-03-06T06:45:04.607Z",
			imageurl:
				"https://localist-images.azureedge.net/assets/main/thumbs/event-huge-4820bb5c9e28a2cf4acef980a65992d6aee20211700fbe1494bea7af79aec963.png"
		},
		{
			id: 33,
			title: "BREWS N’ Qs THURSDAY NIGHT TRIVIA",
			location: "Cult Classic Brewing Company",
			time: "06:30 PM - 08:00 PM",
			price: "0",
			source: "https://events.baltimoremagazine.com/event/brews-n-qs-thursday-night-trivia",
			created_at: "2025-03-06T06:45:04.613Z",
			imageurl:
				"https://localist-images.azureedge.net/photos/48488752374299/huge/8bd615c52c96e490148a31cc081139a8883c903c.jpg"
		},
		{
			id: 34,
			title: "Charlie Reichert Powell and New River Monthly Series",
			location: "Virtual Event",
			time: "07:00 PM - 07:00 PM",
			price: "$20, $10 for students ",
			source: "https://events.baltimoremagazine.com/event/charlie-reichert-powell-and-new-river-monthly-series",
			created_at: "2025-03-06T06:45:04.622Z",
			imageurl:
				"https://localist-images.azureedge.net/photos/47817678822125/huge/2ad4df2b4f9ceee3f65e26253f820cd465c3cd50.jpg"
		},
		{
			id: 35,
			title: "Medium Debbie Wojciechowski",
			location: "Cult Classic Brewing Company",
			time: "07:00 PM - 09:00 PM",
			price: "45",
			source: "https://events.baltimoremagazine.com/event/medium-debbie-wojciechowski",
			created_at: "2025-03-06T06:45:04.635Z",
			imageurl:
				"https://localist-images.azureedge.net/photos/48031391356804/huge/32e52ba9da5901c57e1bca899bf14b3581f00ed4.jpg"
		},
		{
			id: 36,
			title: "Trivia Night",
			location: "Nacho Mama's Towson",
			time: "07:00 PM - 07:00 PM",
			price: "Free",
			source: "https://events.baltimoremagazine.com/event/trivia_night_1353",
			created_at: "2025-03-06T06:45:04.651Z",
			imageurl:
				"https://localist-images.azureedge.net/photos/44455179943303/huge/e18115277b61da35f39f72fe90cb03771d0fcc63.jpg"
		},
		{
			id: 37,
			title: "LORELEI ENSEMBLE",
			location: "Emmanuel Episcopal Church",
			time: "07:30 PM - 09:00 PM",
			price: "$25 in advance, $35 at the door, $10 reduced",
			source: "https://events.baltimoremagazine.com/event/lorelei-ensemble",
			created_at: "2025-03-06T06:45:04.654Z",
			imageurl:
				"https://localist-images.azureedge.net/photos/47323980353177/huge/1bb9bdaefc9e49af659e57ac524a3b7cf90ffc04.jpg"
		},
		{
			id: 38,
			title: "Paul Galbraith",
			location: "The Mansion at Strathmore",
			time: "07:30 PM - 07:30 PM",
			price: "Not Provided",
			source: "https://events.baltimoremagazine.com/event/paul-galbraith",
			created_at: "2025-03-06T06:45:04.667Z",
			imageurl:
				"https://localist-images.azureedge.net/photos/47758946749322/huge/20a5eff0e24d9ad0aedfb85e99009829498ed636.jpg"
		},
		{
			id: 39,
			title: "ACADEMY OF ST. MARTIN IN THE FIELDS",
			location: "Strathmore",
			time: "08:00 PM - 08:00 PM",
			price: "$28-$138",
			source: "https://events.baltimoremagazine.com/event/academy-of-st-martin-in-the-fields",
			created_at: "2025-03-06T06:45:04.941Z",
			imageurl:
				"https://localist-images.azureedge.net/photos/46923140996453/huge/611049cb8269ac7d9b09b8ac52aaec2d1c333e16.jpg"
		},
		{
			id: 40,
			title: "Free Tax Preparation",
			location: "Central Library",
			time: "12:00 AM - 12:00 AM",
			price: "Not Provided",
			source: "https://calendar.prattlibrary.org/event/free-tax-preparation",
			created_at: "2025-03-06T06:45:06.760Z",
			imageurl:
				"https://localist-images.azureedge.net/photos/47800328927902/huge/42687aefd820c9279811b65ab5fc5d55760b637f.jpg"
		},
		{
			id: 41,
			title: "The Civic Pride of the Baltimore Salt Box",
			location: "Central Library",
			time: "12:00 AM - 12:00 AM",
			price: "Not Provided",
			source: "https://calendar.prattlibrary.org/event/civic_pride_salt_box",
			created_at: "2025-03-06T06:45:06.778Z",
			imageurl:
				"https://localist-images.azureedge.net/photos/48243741753091/huge/1d345268a2c4e2f0885fcbf6b162fa7d9d5ad06d.jpg"
		},
		{
			id: 42,
			title: "Black Cinema Collective: Eves Bayou",
			location: "Central Library",
			time: "12:00 AM - 07:30 AM",
			price: "0",
			source: "https://calendar.prattlibrary.org/event/black-cinema-collective-eves-bayou",
			created_at: "2025-03-06T06:45:06.781Z",
			imageurl:
				"https://localist-images.azureedge.net/photos/48721668254172/huge/28ba927c7db71e03c270cbbe5e4d6a02543ce4c1.jpg"
		},
		{
			id: 43,
			title: "Baby & Toddler Storytime",
			location: "Waverly",
			time: "10:30 AM - 10:30 AM",
			price: "Not Provided",
			source: "https://calendar.prattlibrary.org/event/baby_toddler_storytime_wvr",
			created_at: "2025-03-06T06:45:06.783Z",
			imageurl:
				"https://localist-images.azureedge.net/photos/683143/huge/46a36bd5adf9778b95c89f92140e82662e32c4b8.jpg"
		},
		{
			id: 44,
			title: "Family Storytime",
			location: "Roland Park",
			time: "10:30 AM - 10:30 AM",
			price: "Not Provided",
			source: "https://calendar.prattlibrary.org/event/family_storytime_rln",
			created_at: "2025-03-06T06:45:06.785Z",
			imageurl:
				"https://localist-images.azureedge.net/photos/649860/huge/ae34e3cc169b5ed25e948de0d820fac4d05e97e4.jpg"
		},
		{
			id: 45,
			title: "Staying Safe Online",
			location: "Hamilton",
			time: "10:30 AM - 12:30 PM",
			price: "Not Provided",
			source: "https://calendar.prattlibrary.org/event/staying-safe-online-9603",
			created_at: "2025-03-06T06:45:06.787Z",
			imageurl:
				"https://localist-images.azureedge.net/photos/648962/huge/a63a95710cef6b675daa039eb0fcf97f983b2492.jpg"
		},
		{
			id: 46,
			title: "Family Storytime",
			location: "Southeast Anchor",
			time: "11:00 AM - 11:00 AM",
			price: "Not Provided",
			source: "https://calendar.prattlibrary.org/event/family_storytime_7656",
			created_at: "2025-03-06T06:45:06.789Z",
			imageurl:
				"https://localist-images.azureedge.net/photos/649860/huge/ae34e3cc169b5ed25e948de0d820fac4d05e97e4.jpg"
		},
		{
			id: 47,
			title: "Job and Career Clinic",
			location: "Central Library",
			time: "11:00 AM - 04:00 PM",
			price: "Not Provided",
			source: "https://calendar.prattlibrary.org/event/job-and-career-clinic",
			created_at: "2025-03-06T06:45:06.791Z",
			imageurl:
				"https://localist-images.azureedge.net/photos/649047/huge/4a29bca2a374f869ae5bc874605c1933150d4a4d.jpg"
		},
		{
			id: 48,
			title: "Re-entry Pathways Resource and Career Fair",
			location: "Central Library",
			time: "11:00 AM - 01:00 PM",
			price: "Free",
			source: "https://calendar.prattlibrary.org/event/re-entry-pathways-resource-and-career-fair-9507",
			created_at: "2025-03-06T06:45:06.794Z",
			imageurl:
				"https://localist-images.azureedge.net/photos/103224/huge/2fadcce5d46c463889fd1913fcf03edcf2ae4325.jpg"
		},
		{
			id: 49,
			title: "Introduction to Computer Basics",
			location: "Virtual Event",
			time: "12:00 PM - 02:00 PM",
			price: "Not Provided",
			source: "https://calendar.prattlibrary.org/event/introduction-to-computer-basics-1155",
			created_at: "2025-03-06T06:45:06.796Z",
			imageurl:
				"https://localist-images.azureedge.net/photos/648964/huge/6432c342cf369d1b97b4198eca2591b79a428feb.jpg"
		},
		{
			id: 50,
			title: "Shut Up and Write - Virtual",
			location: "",
			time: "12:00 PM - 01:30 PM",
			price: "Not Provided",
			source: "https://calendar.prattlibrary.org/event/shut-up-and-write-virtual-6950",
			created_at: "2025-03-06T06:45:07.663Z",
			imageurl:
				"https://localist-images.azureedge.net/photos/648964/huge/6432c342cf369d1b97b4198eca2591b79a428feb.jpg"
		},
		{
			id: 51,
			title: "Shut Up and Write Virtual",
			location: "Virtual Event",
			time: "12:00 PM - 01:30 PM",
			price: "Not Provided",
			source: "https://calendar.prattlibrary.org/event/shut-up-and-write-virtual",
			created_at: "2025-03-06T06:45:07.666Z",
			imageurl:
				"https://localist-images.azureedge.net/photos/649047/huge/4a29bca2a374f869ae5bc874605c1933150d4a4d.jpg"
		},
		{
			id: 52,
			title: "Family Storytime",
			location: "Govans",
			time: "12:30 PM - 12:30 PM",
			price: "Not Provided",
			source: "https://calendar.prattlibrary.org/event/family_storytime_gvn",
			created_at: "2025-03-06T06:45:07.668Z",
			imageurl:
				"https://localist-images.azureedge.net/photos/649860/huge/ae34e3cc169b5ed25e948de0d820fac4d05e97e4.jpg"
		},
		{
			id: 53,
			title: "Introduction to Google Workspace",
			location: "Walbrook",
			time: "12:30 PM - 02:30 PM",
			price: "Not Provided",
			source: "https://calendar.prattlibrary.org/event/introduction-to-google-workspace-9965",
			created_at: "2025-03-06T06:45:07.671Z",
			imageurl:
				"https://localist-images.azureedge.net/photos/48188559706710/huge/5b3bb92e2168bc7c1fdb7ceede0cf66e9700a5fc.jpg"
		},
		{
			id: 54,
			title: "Digital Drop-In Clinic",
			location: "Southeast Anchor",
			time: "02:00 PM - 04:00 PM",
			price: "Not Provided",
			source: "https://calendar.prattlibrary.org/event/digital_drop_in",
			created_at: "2025-03-06T06:45:07.679Z",
			imageurl:
				"https://localist-images.azureedge.net/photos/648962/huge/a63a95710cef6b675daa039eb0fcf97f983b2492.jpg"
		},
		{
			id: 55,
			title: "Introduction to Computer Basics",
			location: "Cherry Hill",
			time: "02:00 PM - 04:00 PM",
			price: "Not Provided",
			source: "https://calendar.prattlibrary.org/event/introduction-to-computer-basics-6487",
			created_at: "2025-03-06T06:45:07.684Z",
			imageurl:
				"https://localist-images.azureedge.net/photos/48242264481297/huge/fe6d4ac6f64a286265d374283d15dbc287f74d44.jpg"
		},
		{
			id: 56,
			title: "Introduction to Workplace Readiness",
			location: "Edmondson Avenue",
			time: "02:00 PM - 04:00 PM",
			price: "Not Provided",
			source: "https://calendar.prattlibrary.org/event/introduction-to-workplace-readiness-7250",
			created_at: "2025-03-06T06:45:07.690Z",
			imageurl:
				"https://localist-images.azureedge.net/photos/48285430062612/huge/f51a28cfaab1a6a3d63157070802a3421721c745.jpg"
		},
		{
			id: 57,
			title: "Workplace Readiness Series",
			location: "Pennsylvania Avenue",
			time: "02:00 PM - 04:00 PM",
			price: "Not Provided",
			source: "https://calendar.prattlibrary.org/event/workplace-readiness-series-4458",
			created_at: "2025-03-06T06:45:07.695Z",
			imageurl:
				"https://localist-images.azureedge.net/photos/48285430062612/huge/f51a28cfaab1a6a3d63157070802a3421721c745.jpg"
		},
		{
			id: 58,
			title: "After School Fun",
			location: "Hamilton",
			time: "03:00 PM - 04:00 PM",
			price: "Not Provided",
			source: "https://calendar.prattlibrary.org/event/after_school_funhamilton",
			created_at: "2025-03-06T06:45:07.697Z",
			imageurl:
				"https://localist-images.azureedge.net/photos/45121339551779/huge/257ae667600af9a4e49fda504a101108f730fa1e.jpg"
		},
		{
			id: 59,
			title: "Bleach Tie Dye Backpacks",
			location: "Roland Park",
			time: "03:00 PM - 04:00 PM",
			price: "Not Provided",
			source: "https://calendar.prattlibrary.org/event/bleach-tye-dye-backpacks",
			created_at: "2025-03-06T06:45:07.699Z",
			imageurl:
				"https://localist-images.azureedge.net/photos/48288022623436/huge/bae0adeccd942be5c7b47e73ecae91f8bfeaee3a.jpg"
		},
		{
			id: 60,
			title: "Family Storytime",
			location: "Pennsylvania Avenue",
			time: "03:00 PM - 03:00 PM",
			price: "Free ",
			source: "https://calendar.prattlibrary.org/event/family_storytime_pnn",
			created_at: "2025-03-06T06:45:08.567Z",
			imageurl:
				"https://localist-images.azureedge.net/photos/649860/huge/ae34e3cc169b5ed25e948de0d820fac4d05e97e4.jpg"
		},
		{
			id: 61,
			title: "Teen Board Game Night",
			location: "Hampden",
			time: "03:00 PM - 04:00 PM",
			price: "Not Provided",
			source: "https://calendar.prattlibrary.org/event/teen-board-game-night",
			created_at: "2025-03-06T06:45:08.571Z",
			imageurl:
				"https://localist-images.azureedge.net/photos/649042/huge/d7f464362a1e2056116c077331983008e8901a64.jpg"
		},
		{
			id: 62,
			title: "Anime Club",
			location: "Edmondson Avenue",
			time: "03:30 PM - 04:30 PM",
			price: "Not Provided",
			source: "https://calendar.prattlibrary.org/event/anime-club-1701",
			created_at: "2025-03-06T06:45:08.573Z",
			imageurl:
				"https://localist-images.azureedge.net/photos/48356691944278/huge/f69b004a4d690f4efcbf2a0c61f7096b647f297a.jpg"
		},
		{
			id: 63,
			title: "Crankie Box",
			location: "Central Library",
			time: "03:30 PM - 04:30 PM",
			price: "Not Provided",
			source: "https://calendar.prattlibrary.org/event/crankie-box",
			created_at: "2025-03-06T06:45:08.575Z",
			imageurl:
				"https://localist-images.azureedge.net/photos/48491502588853/huge/1f3515e87884d5f224f391939692de5d23548b47.jpg"
		},
		{
			id: 64,
			title: "Crochet Club",
			location: "Walbrook",
			time: "04:00 PM - 05:30 PM",
			price: "Not Provided",
			source: "https://calendar.prattlibrary.org/event/crochet-club-4539",
			created_at: "2025-03-06T06:45:08.577Z",
			imageurl:
				"https://localist-images.azureedge.net/photos/47790587818226/huge/fd81068e3a826e7133cf99091bca54a9e5727068.jpg"
		},
		{
			id: 65,
			title: "EMS Presentation and Information",
			location: "Pennsylvania Avenue",
			time: "04:00 PM - 04:00 PM",
			price: "Not Provided",
			source: "https://calendar.prattlibrary.org/event/ems-presentation-and-information",
			created_at: "2025-03-06T06:45:08.580Z",
			imageurl:
				"https://localist-images.azureedge.net/photos/48376400400791/huge/ea5f97fed26d8452e4b27754e99ccdefd86a6cf0.jpg"
		},
		{
			id: 66,
			title: "Family Storytime",
			location: "Orleans Street",
			time: "04:00 PM - 04:00 PM",
			price: "Not Provided",
			source: "https://calendar.prattlibrary.org/event/family_storytime_776",
			created_at: "2025-03-06T06:45:08.585Z",
			imageurl:
				"https://localist-images.azureedge.net/photos/47924160750021/huge/519a6bfb38e09d26c19fed4cafbf3349dc97ecd5.jpg"
		},
		{
			id: 67,
			title: "Jamercise with Ginger",
			location: "Cherry Hill",
			time: "04:30 PM - 05:30 PM",
			price: "Not Provided",
			source: "https://calendar.prattlibrary.org/event/jamercise-with-ginger-4656",
			created_at: "2025-03-06T06:45:08.586Z",
			imageurl:
				"https://localist-images.azureedge.net/photos/47816914388393/huge/c73380629c5732780599e77971f43200d9bba8c8.jpg"
		},
		{
			id: 68,
			title: "Writing an Effective Resume",
			location: "Walbrook",
			time: "05:00 PM - 07:00 PM",
			price: "Not Provided",
			source: "https://calendar.prattlibrary.org/event/writing-an-effective-resume-2442",
			created_at: "2025-03-06T06:45:08.588Z",
			imageurl:
				"https://localist-images.azureedge.net/photos/648964/huge/6432c342cf369d1b97b4198eca2591b79a428feb.jpg"
		},
		{
			id: 69,
			title: "Google Workspace Intermediate Skills",
			location: "Orleans Street",
			time: "05:30 PM - 07:30 PM",
			price: "Not Provided",
			source: "https://calendar.prattlibrary.org/event/google-workspace-intermediate-skills",
			created_at: "2025-03-06T06:45:08.590Z",
			imageurl:
				"https://localist-images.azureedge.net/photos/48791453938199/huge/24fc7bde533d0b2088c1abe15c8a342e78a0a60b.jpg"
		},
		{
			id: 70,
			title: "Speak and Be Heard: Spoken Word At The Library",
			location: "Central Library",
			time: "05:30 PM - 07:30 PM",
			price: "Not Provided",
			source: "https://calendar.prattlibrary.org/event/speak-and-be-heard-spoken-word-at-the-library",
			created_at: "2025-03-06T06:45:09.063Z",
			imageurl:
				"https://localist-images.azureedge.net/photos/649102/huge/4f15717268289e122b0985556a6339a705e1a027.jpg"
		},
		{
			id: 71,
			title: "Waverly Book Club:  Lessons in Chemistry",
			location: "Waverly",
			time: "05:30 PM - 07:30 PM",
			price: "Not Provided",
			source: "https://calendar.prattlibrary.org/event/waverly-book-club-lessons-in-chemistry",
			created_at: "2025-03-06T06:45:09.065Z",
			imageurl:
				"https://localist-images.azureedge.net/photos/48234867410358/huge/fe3ff81d6b22de2715566749f4f6dc675ec43cf1.jpg"
		},
		{
			id: 72,
			title: "Create @ Canton",
			location: "Canton",
			time: "06:00 PM - 07:30 PM",
			price: "Not Provided",
			source: "https://calendar.prattlibrary.org/event/create-canton-3931",
			created_at: "2025-03-06T06:45:09.067Z",
			imageurl:
				"https://localist-images.azureedge.net/photos/48340684881438/huge/54a6e8438c8d4f3a7db1a7713b4b4ca2c32a153a.jpg"
		}
	]);
	const [headerHeight, setHeaderHeight] = useState(0);

	const headerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (headerRef.current) {
			setHeaderHeight(headerRef.current.offsetHeight);
		}

		const handleResize = () => {
			if (headerRef.current) {
				setHeaderHeight(headerRef.current.offsetHeight);
			}
		};

		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, []);

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
					...events.filter((event) =>
						event.source.includes(
							"https://events.baltimoremagazine.com"
						)
					)
				);
			}

			if (isBaltimoreShowplaceChecked) {
				fe.push(
					...events.filter((event) =>
						event.source.includes("baltshowplace.tumblr.com")
					)
				);
			}

			if (isEnochPrattLibraryChecked) {
				fe.push(
					...events.filter((event) =>
						event.source.includes(
							"https://calendar.prattlibrary.org/"
						)
					)
				);
			}
		}

		setFilteredEvents(fe);
	}, [
		events,
		isBaltimoreMagazineChecked,
		isBaltimoreShowplaceChecked,
		isEnochPrattLibraryChecked,
		setFilteredEvents
	]);

	return (
		<div className="bg-[#1c1a29] flex flex-col gap-8 h-screen max-w-screen p-8">
			<div
				className="flex gap-8 items-baseline text-[#F5F5F5] w-full"
				ref={headerRef}
			>
				<div className="flex flex-1 justify-center">
					<h1 className="semibold text-3xl w-fit">Bmore Today</h1>
				</div>
				<h2 className="flex-4 text-lg">Go Outside and Bmore Today</h2>
			</div>
			<div
				className="flex flex-row gap-8 w-full pb-8"
				style={{ height: `calc(100% - ${headerHeight}px)` }}
			>
				<SourcesSidebar />
				<EventsGrid />
			</div>
		</div>
	);
};

export default App;
