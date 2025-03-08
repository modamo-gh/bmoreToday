import { useEffect, useRef, useState } from "react";
import "./App.css";
import EventsGrid from "./components/EventsGrid";
import Header from "./components/Header";
import SourcesSidebar from "./components/SourcesSidebar";
import { useEventContext } from "./contexts/EventContext";
import { Event } from "./types/Event";

const App = () => {
	const {
		isBaltimoreBeatChecked,
		isBaltimoreMagazineChecked,
		isBaltimoreShowplaceChecked,
		isEnochPrattLibraryChecked,
		setFilteredEvents
	} = useEventContext();

	const [events, setEvents] = useState<Event[]>([
		{
		"id": 1,
		"title": "Outcalls, Madisun Bailey",
		"location": "Ottobar",
		"time": "7PM",
		"price": "$13",
		"source": "baltshowplace.tumblr.com",
		"created_at": "2025-03-08T00:36:12.732Z",
		"imageurl": null
		},
		{
		"id": 2,
		"title": "Daft Punk Night",
		"location": "Ottobar",
		"time": "10PM",
		"price": "$15",
		"source": "baltshowplace.tumblr.com",
		"created_at": "2025-03-08T00:36:12.738Z",
		"imageurl": null
		},
		{
		"id": 3,
		"title": "The Second Saturday S#!T Show w/ Justin Schlegel",
		"location": "Ottobar Upstairs",
		"time": "6PM",
		"price": "$10",
		"source": "baltshowplace.tumblr.com",
		"created_at": "2025-03-08T00:36:12.740Z",
		"imageurl": null
		},
		{
		"id": 4,
		"title": "Girls Rule",
		"location": "Ottobar Upstairs",
		"time": "9PM",
		"price": "$FREE",
		"source": "baltshowplace.tumblr.com",
		"created_at": "2025-03-08T00:36:12.741Z",
		"imageurl": null
		},
		{
		"id": 5,
		"title": "Guardin, Kennedyxoxo",
		"location": "Metro",
		"time": "7PM",
		"price": "$20",
		"source": "baltshowplace.tumblr.com",
		"created_at": "2025-03-08T00:36:12.742Z",
		"imageurl": null
		},
		{
		"id": 6,
		"title": "Glorian Album Release w/ DJ Abject Relations, 50 Foot & The Worms, D.L.I., Amy Reid",
		"location": "Club Car",
		"time": "7PM",
		"price": "$10 adv/$15 doors",
		"source": "baltshowplace.tumblr.com",
		"created_at": "2025-03-08T00:36:12.743Z",
		"imageurl": null
		},
		{
		"id": 7,
		"title": "Bmore Hip Hop Karaoke",
		"location": "Mobtown Ballroom",
		"time": "8PM",
		"price": "$10",
		"source": "baltshowplace.tumblr.com",
		"created_at": "2025-03-08T00:36:12.744Z",
		"imageurl": null
		},
		{
		"id": 8,
		"title": "Spellbook, Book Of Wyrms, Skullvich, Cult",
		"location": "The Depot",
		"time": "7PM",
		"price": "Unknown",
		"source": "baltshowplace.tumblr.com",
		"created_at": "2025-03-08T00:36:12.746Z",
		"imageurl": null
		},
		{
		"id": 9,
		"title": "Secret Society, Suffer The Ghost, Dove, Sukkawut",
		"location": "House of Chiefs",
		"time": "6PM",
		"price": "$15",
		"source": "baltshowplace.tumblr.com",
		"created_at": "2025-03-08T00:36:12.747Z",
		"imageurl": null
		},
		{
		"id": 10,
		"title": "Saltbox, Sunday Night Takeout, Marwood, Crazy Ap",
		"location": "The Undercroft",
		"time": "7PM",
		"price": "Unknown",
		"source": "baltshowplace.tumblr.com",
		"created_at": "2025-03-08T00:36:12.748Z",
		"imageurl": null
		},
		{
		"id": 11,
		"title": "Versus II w/ P111",
		"location": "Wax Atlas",
		"time": "Unknown",
		"price": "$2 Romance, Xom, Heup!,  +MORE. 7PM, $5-$10",
		"source": "baltshowplace.tumblr.com",
		"created_at": "2025-03-08T00:36:12.748Z",
		"imageurl": null
		},
		{
		"id": 12,
		"title": "Puppets Fight Back: Cabaret Benefit Show",
		"location": "Le Mondo",
		"time": "8PM",
		"price": "$20",
		"source": "baltshowplace.tumblr.com",
		"created_at": "2025-03-08T00:36:12.749Z",
		"imageurl": null
		},
		{
		"id": 13,
		"title": "Faery Ba",
		"location": "2640 Space",
		"time": "6PM",
		"price": "Unknown",
		"source": "baltshowplace.tumblr.com",
		"created_at": "2025-03-08T00:36:12.750Z",
		"imageurl": null
		},
		{
		"id": 14,
		"title": "A Femininomenon: Fundraiser For Baltimore Safe Haven w/ Music, Vendors, Drag, Dancing. -7",
		"location": "Guilford Hall Brewery",
		"time": "1PM",
		"price": "$Donations",
		"source": "baltshowplace.tumblr.com",
		"created_at": "2025-03-08T00:36:12.751Z",
		"imageurl": null
		},
		{
		"id": 15,
		"title": "House Of Jane Cafe Disco",
		"location": "Ceremony Coffee Harbor East",
		"time": "7PM",
		"price": "$10",
		"source": "baltshowplace.tumblr.com",
		"created_at": "2025-03-08T00:36:12.752Z",
		"imageurl": null
		},
		{
		"id": 16,
		"title": "Pulp Noire, Saving Bruce, Mach Zero",
		"location": "The Hole Severna Park (DM bands for address)",
		"time": "6PM",
		"price": "$10",
		"source": "baltshowplace.tumblr.com",
		"created_at": "2025-03-08T00:36:12.752Z",
		"imageurl": null
		},
		{
		"id": 17,
		"title": "Electro Soul Techno w/ Lo Dazz, Lady Witch, Moses Malone, Keilah, +MORE",
		"location": "Address sent after ticket purchase on RA",
		"time": "9PM",
		"price": "$11-$17",
		"source": "baltshowplace.tumblr.com",
		"created_at": "2025-03-08T00:36:12.755Z",
		"imageurl": null
		},
		{
		"id": 18,
		"title": "Gameface Con",
		"location": "Peabody Heights",
		"time": "12PM",
		"price": "$FREE",
		"source": "baltshowplace.tumblr.com",
		"created_at": "2025-03-08T00:36:12.758Z",
		"imageurl": null
		},
		{
		"id": 19,
		"title": "Catherine Russell.  & 9",
		"location": "Keystone Korner",
		"time": "6PM",
		"price": "$15-$55",
		"source": "baltshowplace.tumblr.com",
		"created_at": "2025-03-08T00:36:12.760Z",
		"imageurl": null
		},
		{
		"id": 20,
		"title": "Cowboy Bebop Live",
		"location": "Soundstage",
		"time": "7PM",
		"price": "$SOLD OUT",
		"source": "baltshowplace.tumblr.com",
		"created_at": "2025-03-08T00:36:12.761Z",
		"imageurl": null
		},
		{
		"id": 21,
		"title": "Sheng Wang",
		"location": "The Lyric",
		"time": "7PM",
		"price": "$57",
		"source": "baltshowplace.tumblr.com",
		"created_at": "2025-03-08T00:36:12.762Z",
		"imageurl": null
		},
		{
		"id": 22,
		"title": "Karaoke.",
		"location": "Old Major",
		"time": "7PM",
		"price": "$FREE",
		"source": "baltshowplace.tumblr.com",
		"created_at": "2025-03-08T00:36:12.763Z",
		"imageurl": null
		},
		{
		"id": 23,
		"title": "Small Wins Play",
		"location": "Submersive HQ (3523 Buena Vista Ave)",
		"time": "8PM",
		"price": "$0-$15",
		"source": "baltshowplace.tumblr.com",
		"created_at": "2025-03-08T00:36:12.764Z",
		"imageurl": null
		},
		{
		"id": 24,
		"title": "Mad Chameleon, The Black Sevens, Analog, Endless Anomaly, Maisonet",
		"location": "Morsbergers",
		"time": "7PM",
		"price": "Unknown",
		"source": "baltshowplace.tumblr.com",
		"created_at": "2025-03-08T00:36:12.765Z",
		"imageurl": null
		},
		{
		"id": 25,
		"title": "Midlife Crisis",
		"location": "The Recher",
		"time": "7PM",
		"price": "$FREE",
		"source": "baltshowplace.tumblr.com",
		"created_at": "2025-03-08T00:36:12.766Z",
		"imageurl": null
		},
		{
		"id": 26,
		"title": "2025 Saturday ‘Visiter’ Awards Call for Entries",
		"location": "Virtual Event",
		"time": "09:00 AM - 05:00 PM",
		"price": "$",
		"source": "https://events.baltimoremagazine.com/event/2025-saturday-visiter-awards-call-for-entries",
		"created_at": "2025-03-08T00:36:13.572Z",
		"imageurl": "https://localist-images.azureedge.net/photos/48666531039603/huge/fa82e8887e56a0c0bb267e4811ba91a9edf1a0bb.jpg"
		},
		{
		"id": 27,
		"title": "Sharebaby Diaper Drive",
		"location": "The Shops at Kenilworth",
		"time": "09:00 AM - 06:00 PM",
		"price": "Not Provided",
		"source": "https://events.baltimoremagazine.com/event/sharebaby-diaper-drive",
		"created_at": "2025-03-08T00:36:13.575Z",
		"imageurl": "https://localist-images.azureedge.net/photos/49019605619984/huge/02c6b252c30e145fd929bdbd595cf146f25fe111.jpg"
		},
		{
		"id": 28,
		"title": "Air Quality: The Influence of Smog on European Modernism",
		"location": "The Baltimore Museum of Art",
		"time": "10:00 AM - 05:00 PM",
		"price": "FREE",
		"source": "https://events.baltimoremagazine.com/event/air-quality-the-influence-of-smog-on-european-modernism",
		"created_at": "2025-03-08T00:36:13.577Z",
		"imageurl": "https://localist-images.azureedge.net/photos/48667470343584/huge/c8ea26b4856ffd1c78e0d3b95ba2c8d0775b31c7.jpg"
		},
		{
		"id": 29,
		"title": "It's a MF Pleasure",
		"location": "Woolly Mammoth Theatre Company",
		"time": "10:00 AM - 10:00 PM",
		"price": "30",
		"source": "https://events.baltimoremagazine.com/event/its-a-mf-pleasure",
		"created_at": "2025-03-08T00:36:13.579Z",
		"imageurl": "https://localist-images.azureedge.net/assets/main/thumbs/event-huge-4820bb5c9e28a2cf4acef980a65992d6aee20211700fbe1494bea7af79aec963.png"
		},
		{
		"id": 30,
		"title": "LaToya Ruby Frazier: More Than Conquerors: A Monument for Community Health Workers of Baltimore, Maryland 2021-2022",
		"location": "The Baltimore Museum of Art",
		"time": "10:00 AM - 05:00 PM",
		"price": "FREE",
		"source": "https://events.baltimoremagazine.com/event/latoya-ruby-frazier-more-than-conquerors-a-monument-for-community-health-workers-of-baltimore-maryland-2021-2022",
		"created_at": "2025-03-08T00:36:13.581Z",
		"imageurl": "https://localist-images.azureedge.net/photos/47676493894314/huge/8fcea1915cac7c292658facc1ce8de81db5532a9.jpg"
		},
		{
		"id": 31,
		"title": "Maryland Home & Garden + Craft Show",
		"location": "Maryland State Fairgrounds",
		"time": "10:00 AM - 06:00 PM",
		"price": "$10-$12",
		"source": "https://events.baltimoremagazine.com/event/maryland-home-garden-craft-show",
		"created_at": "2025-03-08T00:36:13.585Z",
		"imageurl": "https://localist-images.azureedge.net/photos/48606024917257/huge/dc3a6df6bba60bb90ab5d4d9d8da5fe8489c5cd0.jpg"
		},
		{
		"id": 32,
		"title": "TWILIGHT ZONE: Hidden Wonders of the Ocean",
		"location": "ARTECHOUSE DC",
		"time": "10:00 AM - 10:00 PM",
		"price": "0-30",
		"source": "https://events.baltimoremagazine.com/event/twilight-zone-hidden-wonders-of-the-ocean-8957",
		"created_at": "2025-03-08T00:36:13.586Z",
		"imageurl": "https://localist-images.azureedge.net/photos/48706272105250/huge/07eb3f6c0bb945f520b1f0f1683d740ff7bf44c3.jpg"
		},
		{
		"id": 33,
		"title": "Watershed: Transforming the Landscape in Early Modern Dutch Art",
		"location": "The Baltimore Museum of Art",
		"time": "10:00 AM - 05:00 PM",
		"price": "FREE",
		"source": "https://events.baltimoremagazine.com/event/watershed-transforming-the-landscape-in-early-modern-dutch-art",
		"created_at": "2025-03-08T00:36:13.589Z",
		"imageurl": "https://localist-images.azureedge.net/photos/48667317204467/huge/5cc4120af506d475efe36a40b0f50502be765c54.jpg"
		},
		{
		"id": 34,
		"title": "Wine and Food Tastings",
		"location": "Simpatico, Italy's Finest",
		"time": "10:00 AM - 05:00 PM",
		"price": "Free",
		"source": "https://events.baltimoremagazine.com/event/wine_and_food_tastings",
		"created_at": "2025-03-08T00:36:13.590Z",
		"imageurl": "https://localist-images.azureedge.net/assets/main/thumbs/event-huge-4820bb5c9e28a2cf4acef980a65992d6aee20211700fbe1494bea7af79aec963.png"
		},
		{
		"id": 35,
		"title": "Leave No Trace: John Work Garrett in the American Outdoors ",
		"location": "Evergreen Museum & Library",
		"time": "11:00 AM - 04:00 PM",
		"price": "Free-$5",
		"source": "https://events.baltimoremagazine.com/event/leave-no-trace-john-work-garrett-in-the-american-outdoors",
		"created_at": "2025-03-08T00:36:13.591Z",
		"imageurl": "https://localist-images.azureedge.net/photos/47561079326308/huge/d8332791c879a84f7c2d28a623af4367db5220ff.jpg"
		},
		{
		"id": 36,
		"title": "https://www.artechouse.com/program/blooming-wonders/",
		"location": "ARTECHOUSE DC",
		"time": "12:00 PM - 10:00 PM",
		"price": "0-30",
		"source": "https://events.baltimoremagazine.com/event/httpswwwartechousecomprogramblooming-wonders",
		"created_at": "2025-03-08T00:36:14.107Z",
		"imageurl": "https://localist-images.azureedge.net/photos/48969439825924/huge/851d7bf75435e99657ec135d3500f496327fda7e.jpg"
		},
		{
		"id": 37,
		"title": "First Friday Release of Grisette",
		"location": "Manor Hill Brewing",
		"time": "04:00 PM - 04:00 PM",
		"price": "Not Provided",
		"source": "https://events.baltimoremagazine.com/event/first-friday-release-of-grisette",
		"created_at": "2025-03-08T00:36:14.109Z",
		"imageurl": "https://localist-images.azureedge.net/photos/48958933518081/huge/61b295bade46fbf0f98ce101975d0985c83072c2.jpg"
		},
		{
		"id": 38,
		"title": "Busy Slowing Down art exhibit opening",
		"location": "Maryland Art Place",
		"time": "05:00 PM - 07:00 PM",
		"price": "Free",
		"source": "https://events.baltimoremagazine.com/event/busy-slowing-down-art-exhibit-opening",
		"created_at": "2025-03-08T00:36:14.111Z",
		"imageurl": "https://localist-images.azureedge.net/assets/main/thumbs/event-huge-4820bb5c9e28a2cf4acef980a65992d6aee20211700fbe1494bea7af79aec963.png"
		},
		{
		"id": 39,
		"title": "Showcase Exhibit Opening Reception: Michael Bruley",
		"location": "Baltimore Art Gallery",
		"time": "05:30 PM - 08:30 PM",
		"price": "Free",
		"source": "https://events.baltimoremagazine.com/event/showcase-exhibit-opening-reception-michael-bruley",
		"created_at": "2025-03-08T00:36:14.113Z",
		"imageurl": "https://localist-images.azureedge.net/photos/48914926000293/huge/1f0594af98ecda095d244772242773d0c4842477.jpg"
		},
		{
		"id": 40,
		"title": "Ranky Tanky",
		"location": "Keystone Korner Baltimore",
		"time": "06:00 PM - 07:30 PM",
		"price": "$15-45",
		"source": "https://events.baltimoremagazine.com/event/ranky-tanky",
		"created_at": "2025-03-08T00:36:14.114Z",
		"imageurl": "https://localist-images.azureedge.net/photos/49056077432243/huge/8208ce21a6fc4213640c25e2d207007f59c07c56.jpg"
		},
		{
		"id": 41,
		"title": "House of Finn LIVE at Cult",
		"location": "Cult Classic Brewing Company",
		"time": "07:00 PM - 11:00 PM",
		"price": "20",
		"source": "https://events.baltimoremagazine.com/event/house-of-finn-live-at-cult",
		"created_at": "2025-03-08T00:36:14.117Z",
		"imageurl": "https://localist-images.azureedge.net/photos/48665962920314/huge/25f597460edbebbd5a8e95d014f630068d907d02.jpg"
		},
		{
		"id": 42,
		"title": "ART at Vagabond Players",
		"location": "Vagabond Players",
		"time": "08:00 PM - 08:00 PM",
		"price": "$25-$28",
		"source": "https://events.baltimoremagazine.com/event/art-at-vagabond-players",
		"created_at": "2025-03-08T00:36:14.118Z",
		"imageurl": "https://localist-images.azureedge.net/photos/48782144290763/huge/9c8804c576b9a34ee654aab0ce7881ebb9e643ae.jpg"
		},
		{
		"id": 43,
		"title": "Mondrary, A Deer A Horse, Tripper, Euclid C Finder",
		"location": "Holy Frijoles",
		"time": "08:00 PM - 08:00 PM",
		"price": "12",
		"source": "https://events.baltimoremagazine.com/event/mondrary-a-deer-a-horse-tripper-euclid-c-finder",
		"created_at": "2025-03-08T00:36:14.120Z",
		"imageurl": "https://localist-images.azureedge.net/photos/49047022610461/huge/7fb7111143cd2b80afbef6182b9d56fa3611bec8.jpg"
		},
		{
		"id": 44,
		"title": "The Reagan Years at Twain’s Tavern",
		"location": "Twain’s Tavern",
		"time": "08:30 PM - 11:00 PM",
		"price": "$10.00",
		"source": "https://events.baltimoremagazine.com/event/the-reagan-years-at-twains-tavern",
		"created_at": "2025-03-08T00:36:14.121Z",
		"imageurl": "https://localist-images.azureedge.net/photos/48901526764268/huge/47d38de0ec4db733e256cc4be97a3174be7da036.jpg"
		},
		{
		"id": 45,
		"title": "Ranky Tanky",
		"location": "Keystone Korner Baltimore",
		"time": "09:00 PM - 10:30 PM",
		"price": "$15-45",
		"source": "https://events.baltimoremagazine.com/event/ranky-tanky",
		"created_at": "2025-03-08T00:36:14.122Z",
		"imageurl": "https://localist-images.azureedge.net/photos/49056077432243/huge/8208ce21a6fc4213640c25e2d207007f59c07c56.jpg"
		},
		{
		"id": 46,
		"title": "Free Tax Preparation",
		"location": "Central Library",
		"time": "12:00 AM - 12:00 AM",
		"price": "Not Provided",
		"source": "https://calendar.prattlibrary.org/event/free-tax-preparation",
		"created_at": "2025-03-08T00:36:14.769Z",
		"imageurl": "https://localist-images.azureedge.net/photos/47800328927902/huge/42687aefd820c9279811b65ab5fc5d55760b637f.jpg"
		},
		{
		"id": 47,
		"title": "The Civic Pride of the Baltimore Salt Box",
		"location": "Central Library",
		"time": "12:00 AM - 12:00 AM",
		"price": "Not Provided",
		"source": "https://calendar.prattlibrary.org/event/civic_pride_salt_box",
		"created_at": "2025-03-08T00:36:14.779Z",
		"imageurl": "https://localist-images.azureedge.net/photos/48243741753091/huge/1d345268a2c4e2f0885fcbf6b162fa7d9d5ad06d.jpg"
		},
		{
		"id": 48,
		"title": "Baby & Toddler Storytime",
		"location": "Orleans Street",
		"time": "10:30 AM - 10:30 AM",
		"price": "Not Provided",
		"source": "https://calendar.prattlibrary.org/event/baby_toddler_storytime_orl",
		"created_at": "2025-03-08T00:36:14.781Z",
		"imageurl": "https://localist-images.azureedge.net/photos/47923814711008/huge/35ce0d1f0cf6128727746be5670684389a913f75.jpg"
		},
		{
		"id": 49,
		"title": "Baby & Toddler Storytime",
		"location": "Central Library",
		"time": "11:00 AM - 11:00 AM",
		"price": "Not Provided",
		"source": "https://calendar.prattlibrary.org/event/baby_toddler_storytime_6129",
		"created_at": "2025-03-08T00:36:14.783Z",
		"imageurl": "https://localist-images.azureedge.net/photos/682106/huge/9643adfaf86cfd4c5dc43ac40f8124df73c49fc3.jpg"
		},
		{
		"id": 50,
		"title": "Cuentos y Cantos; Spanish/English Preschool Storytime",
		"location": "Southeast Anchor",
		"time": "11:00 AM - 11:00 AM",
		"price": "Not Provided",
		"source": "https://calendar.prattlibrary.org/event/cuentos-y-cantos-en-espanol-y-ingles-spanish-english-preschool-storytime-sel",
		"created_at": "2025-03-08T00:36:14.786Z",
		"imageurl": "https://localist-images.azureedge.net/photos/47940476617421/huge/a61ab2e23055f12ee2769373163f9884d1afdea6.jpg"
		},
		{
		"id": 51,
		"title": "Friday Matinee: Twisters",
		"location": "Patterson Park",
		"time": "11:00 AM - 02:00 PM",
		"price": "Not Provided",
		"source": "https://calendar.prattlibrary.org/event/friday-matinee-twisters",
		"created_at": "2025-03-08T00:36:14.789Z",
		"imageurl": "https://localist-images.azureedge.net/photos/48490339421700/huge/07dea6a99720f831c0fe053e77029cb2ce6c2f39.jpg"
		},
		{
		"id": 52,
		"title": "Job and Career Clinic",
		"location": "Central Library",
		"time": "11:00 AM - 04:00 PM",
		"price": "Not Provided",
		"source": "https://calendar.prattlibrary.org/event/job-and-career-clinic",
		"created_at": "2025-03-08T00:36:14.791Z",
		"imageurl": "https://localist-images.azureedge.net/photos/649047/huge/4a29bca2a374f869ae5bc874605c1933150d4a4d.jpg"
		},
		{
		"id": 53,
		"title": "Let's Dance with Dance Baltimore - Salsa",
		"location": "Central Library",
		"time": "11:00 AM - 11:00 AM",
		"price": "Not Provided",
		"source": "https://calendar.prattlibrary.org/event/lets-dance-with-dance-baltimore-3-7-25",
		"created_at": "2025-03-08T00:36:14.793Z",
		"imageurl": "https://localist-images.azureedge.net/photos/48064870380050/huge/f389f25ae3909ecefc46cf9e89ea150351683b88.jpg"
		},
		{
		"id": 54,
		"title": "Playdate at the Library:  Eric Carle’s World",
		"location": "Hampden",
		"time": "11:00 AM - 12:00 PM",
		"price": "Not Provided",
		"source": "https://calendar.prattlibrary.org/event/eric-carle-playdate",
		"created_at": "2025-03-08T00:36:14.794Z",
		"imageurl": "https://localist-images.azureedge.net/photos/35157605430622/huge/dd7293cabe65276f1f595f84cda54af85acf03f8.jpg"
		},
		{
		"id": 55,
		"title": "Cuentos y Cantos; Spanish/English Preschool Storytime",
		"location": "Southeast Anchor",
		"time": "01:00 PM - 01:00 PM",
		"price": "Not Provided",
		"source": "https://calendar.prattlibrary.org/event/cuentos-y-cantos-en-espanol-y-ingles-spanish-english-preschool-storytime-sel",
		"created_at": "2025-03-08T00:36:14.796Z",
		"imageurl": "https://localist-images.azureedge.net/photos/47940476617421/huge/a61ab2e23055f12ee2769373163f9884d1afdea6.jpg"
		},
		{
		"id": 56,
		"title": "After School Fun",
		"location": "Hamilton",
		"time": "03:00 PM - 04:00 PM",
		"price": "Not Provided",
		"source": "https://calendar.prattlibrary.org/event/after_school_funhamilton",
		"created_at": "2025-03-08T00:36:15.322Z",
		"imageurl": "https://localist-images.azureedge.net/photos/45121339551779/huge/257ae667600af9a4e49fda504a101108f730fa1e.jpg"
		},
		{
		"id": 57,
		"title": "Anime & Manga Cafe",
		"location": "Light Street",
		"time": "03:00 PM - 03:00 PM",
		"price": "Not Provided",
		"source": "https://calendar.prattlibrary.org/event/anime_manga_cafe",
		"created_at": "2025-03-08T00:36:15.327Z",
		"imageurl": "https://localist-images.azureedge.net/photos/43110648508883/huge/1e77ccf7590823d97f6bf8802184c2e090ab0174.jpg"
		},
		{
		"id": 58,
		"title": "Teen Game Night with PlayStation 5",
		"location": "Waverly",
		"time": "03:00 PM - 04:30 PM",
		"price": "Not Provided",
		"source": "https://calendar.prattlibrary.org/event/teen-game-night-with-playstation-5",
		"created_at": "2025-03-08T00:36:15.329Z",
		"imageurl": "https://localist-images.azureedge.net/photos/48473313534872/huge/4aa903b6fb3b219f36fe1a70f2aede1a967ca935.jpg"
		},
		{
		"id": 59,
		"title": "GameFace Con",
		"location": "Peabody Heights Brewery. Featuring over 30 vendors",
		"time": "10 p.m.",
		"price": "Not Provided",
		"source": "https://baltimorebeat.com/baltimore-government-and-community-events-02-26-25-03-12-25/",
		"created_at": "2025-03-08T00:36:16.369Z",
		"imageurl": null
		},
		{
		"id": 60,
		"title": "Science Slam with BUGSS",
		"location": "Bird in Hand",
		"time": "5 p.m. to 6:30 p.m.",
		"price": "Not Provided",
		"source": "https://baltimorebeat.com/baltimore-government-and-community-events-02-26-25-03-12-25/",
		"created_at": "2025-03-08T00:36:16.388Z",
		"imageurl": null
		},
		{
		"id": 61,
		"title": "Cafe Disco: A Coffee Shop Rave",
		"location": "Ceremony Coffee Roasters",
		"time": "7 p.m. to 10 p.m.",
		"price": "$10",
		"source": "https://baltimorebeat.com/baltimore-arts-and-culture-events-02-26-24-03-12-25/",
		"created_at": "2025-03-08T00:36:16.531Z",
		"imageurl": null
		},
		{
		"id": 62,
		"title": "Glorian Album Release Party",
		"location": "The Club Car",
		"time": "7 p.m. to 11:59 p.m.",
		"price": "$12",
		"source": "https://baltimorebeat.com/baltimore-arts-and-culture-events-02-26-24-03-12-25/",
		"created_at": "2025-03-08T00:36:16.558Z",
		"imageurl": null
		},
		{
		"id": 63,
		"title": "Hip-Hop Karaoke “The Biggie Tribute”",
		"location": "Mobtown Ballroom",
		"time": "8 p.m. to 11 p.m.",
		"price": "$10",
		"source": "https://baltimorebeat.com/baltimore-arts-and-culture-events-02-26-24-03-12-25/",
		"created_at": "2025-03-08T00:36:16.560Z",
		"imageurl": null
		}
		]
		);
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
			if (isBaltimoreBeatChecked) {
				fe.push(
					...events.filter((event) =>
						event.source.includes("https://baltimorebeat.com")
					)
				);
			}

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
		isBaltimoreBeatChecked,
		isBaltimoreMagazineChecked,
		isBaltimoreShowplaceChecked,
		isEnochPrattLibraryChecked,
		setFilteredEvents
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
