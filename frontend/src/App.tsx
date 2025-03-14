import { useEffect, useRef, useState } from "react";
import "./App.css";
import EventsGrid from "./components/EventsGrid";
import Header from "./components/Header";
import SourcesSidebar from "./components/SourcesSidebar";
import { useEventContext } from "./contexts/EventContext";
import { Event } from "./types/Event";
import { DateTime } from "luxon";

const App = () => {
	const {
		isBaltimoreBeatChecked,
		isBaltimoreMagazineChecked,
		isBaltimoreShowplaceChecked,
		isEnochPrattLibraryChecked,
		setFilteredEvents,
		sortSetting
	} = useEventContext();

	const [events, setEvents] = useState<Event[]>([{"id":1,"title":"Jonathan Richman","location":"Ottobar","time":"","price":"$25","source":"baltshowplace.tumblr.com","created_at":"2025-03-13T23:33:56.897Z","imageurl":null,"starttime":"20:00:00","endtime":null},{"id":2,"title":"Fruitcake: A Queer Reading Series","location":"Ottobar Upstairs","time":"","price":"$FREE","source":"baltshowplace.tumblr.com","created_at":"2025-03-13T23:33:56.900Z","imageurl":null,"starttime":"18:00:00","endtime":null},{"id":3,"title":"Queeraoke","location":"Ottobar Upstairs","time":"","price":"$FREE","source":"baltshowplace.tumblr.com","created_at":"2025-03-13T23:33:56.902Z","imageurl":null,"starttime":"21:00:00","endtime":null},{"id":4,"title":"Brant Bjork Trio, Castle Rat, Haze Mage","location":"Metro","time":"","price":"$20","source":"baltshowplace.tumblr.com","created_at":"2025-03-13T23:33:56.904Z","imageurl":null,"starttime":"19:00:00","endtime":null},{"id":5,"title":"The Flower Queen Pl","location":"Mercury Theater","time":"","price":"Unknown","source":"baltshowplace.tumblr.com","created_at":"2025-03-13T23:33:56.905Z","imageurl":null,"starttime":"20:00:00","endtime":null},{"id":6,"title":"Mobtown Music Ki","location":"Mobtown Ballroom","time":"","price":"Unknown","source":"baltshowplace.tumblr.com","created_at":"2025-03-13T23:33:56.907Z","imageurl":null,"starttime":"09:30:00","endtime":null},{"id":7,"title":"Open Mic","location":"Mobtown Ballroom","time":"","price":"$FREE","source":"baltshowplace.tumblr.com","created_at":"2025-03-13T23:33:56.908Z","imageurl":null,"starttime":"18:00:00","endtime":null},{"id":8,"title":"The Vibe Check Open Jam Session","location":"Motor House","time":"","price":"$FREE","source":"baltshowplace.tumblr.com","created_at":"2025-03-13T23:33:56.910Z","imageurl":null,"starttime":"20:00:00","endtime":null},{"id":9,"title":"Consumer Culture, Don Pardo, Wastoid","location":"Holy Frijoles","time":"","price":"$12","source":"baltshowplace.tumblr.com","created_at":"2025-03-13T23:33:56.911Z","imageurl":null,"starttime":"21:00:00","endtime":null},{"id":10,"title":"Anne Malin, Miles Hewitt, John Hoegberg","location":"Normal’s Books","time":"","price":"$10","source":"baltshowplace.tumblr.com","created_at":"2025-03-13T23:33:56.912Z","imageurl":null,"starttime":"20:00:00","endtime":null},{"id":11,"title":"High Wire Improv","location":"Peabody Heights","time":"","price":"$FREE","source":"baltshowplace.tumblr.com","created_at":"2025-03-13T23:33:56.913Z","imageurl":null,"starttime":"19:00:00","endtime":null},{"id":12,"title":"Artemis","location":"Keystone Korner","time":"","price":"$15-$45","source":"baltshowplace.tumblr.com","created_at":"2025-03-13T23:33:56.914Z","imageurl":null,"starttime":"19:00:00","endtime":null},{"id":13,"title":"“Homes for Living: The Fight for Social Housing and a New American Commons” w/ Lawrence Lanahan, Jonathan Tarleton","location":"Red Emma’s","time":"","price":"$FREE","source":"baltshowplace.tumblr.com","created_at":"2025-03-13T23:33:56.915Z","imageurl":null,"starttime":"19:00:00","endtime":null},{"id":14,"title":"Comedy Night","location":"The Manor","time":"","price":"$FREE","source":"baltshowplace.tumblr.com","created_at":"2025-03-13T23:33:56.916Z","imageurl":null,"starttime":"20:00:00","endtime":null},{"id":15,"title":"A Sci-Fi Horror Reading Series + Music","location":"Old Major","time":"","price":"$FREE","source":"baltshowplace.tumblr.com","created_at":"2025-03-13T23:33:56.917Z","imageurl":null,"starttime":"19:00:00","endtime":null},{"id":16,"title":"Read the Room Poetry & Prose Open Mic","location":"Old Major","time":"","price":"$FREE","source":"baltshowplace.tumblr.com","created_at":"2025-03-13T23:33:56.919Z","imageurl":null,"starttime":"19:00:00","endtime":null},{"id":17,"title":"Candyman & The Baltimore Sh","location":"Zen West","time":"","price":"Unknown","source":"baltshowplace.tumblr.com","created_at":"2025-03-13T23:33:56.920Z","imageurl":null,"starttime":"18:30:00","endtime":null},{"id":18,"title":"2025 Saturday ‘Visiter’ Awards Call for Entries","location":"Virtual Event","time":"time","price":"$","source":"https://events.baltimoremagazine.com/event/2025-saturday-visiter-awards-call-for-entries","created_at":"2025-03-13T23:33:57.196Z","imageurl":"https://localist-images.azureedge.net/photos/48666531039603/huge/fa82e8887e56a0c0bb267e4811ba91a9edf1a0bb.jpg","starttime":"09:00:00","endtime":"17:00:00"},{"id":19,"title":"Sharebaby Diaper Drive","location":"The Shops at Kenilworth","time":"time","price":"Not Provided","source":"https://events.baltimoremagazine.com/event/sharebaby-diaper-drive","created_at":"2025-03-13T23:33:57.198Z","imageurl":"https://localist-images.azureedge.net/photos/49019605619984/huge/02c6b252c30e145fd929bdbd595cf146f25fe111.jpg","starttime":"09:00:00","endtime":"18:00:00"},{"id":20,"title":"Air Quality: The Influence of Smog on European Modernism","location":"The Baltimore Museum of Art","time":"time","price":"FREE","source":"https://events.baltimoremagazine.com/event/air-quality-the-influence-of-smog-on-european-modernism","created_at":"2025-03-13T23:33:57.200Z","imageurl":"https://localist-images.azureedge.net/photos/48667470343584/huge/c8ea26b4856ffd1c78e0d3b95ba2c8d0775b31c7.jpg","starttime":"10:00:00","endtime":"21:00:00"},{"id":21,"title":"It's a MF Pleasure","location":"Woolly Mammoth Theatre Company","time":"time","price":"30","source":"https://events.baltimoremagazine.com/event/its-a-mf-pleasure","created_at":"2025-03-13T23:33:57.203Z","imageurl":"https://localist-images.azureedge.net/assets/main/thumbs/event-huge-4820bb5c9e28a2cf4acef980a65992d6aee20211700fbe1494bea7af79aec963.png","starttime":"10:00:00","endtime":"22:00:00"},{"id":22,"title":"LaToya Ruby Frazier: More Than Conquerors: A Monument for Community Health Workers of Baltimore, Maryland 2021-2022","location":"The Baltimore Museum of Art","time":"time","price":"FREE","source":"https://events.baltimoremagazine.com/event/latoya-ruby-frazier-more-than-conquerors-a-monument-for-community-health-workers-of-baltimore-maryland-2021-2022","created_at":"2025-03-13T23:33:57.205Z","imageurl":"https://localist-images.azureedge.net/photos/47676493894314/huge/8fcea1915cac7c292658facc1ce8de81db5532a9.jpg","starttime":"10:00:00","endtime":"20:00:00"},{"id":23,"title":"Watershed: Transforming the Landscape in Early Modern Dutch Art","location":"The Baltimore Museum of Art","time":"time","price":"FREE","source":"https://events.baltimoremagazine.com/event/watershed-transforming-the-landscape-in-early-modern-dutch-art","created_at":"2025-03-13T23:33:57.207Z","imageurl":"https://localist-images.azureedge.net/photos/48667317204467/huge/5cc4120af506d475efe36a40b0f50502be765c54.jpg","starttime":"10:00:00","endtime":"21:00:00"},{"id":24,"title":"Leave No Trace: John Work Garrett in the American Outdoors ","location":"Evergreen Museum & Library","time":"time","price":"Free-$5","source":"https://events.baltimoremagazine.com/event/leave-no-trace-john-work-garrett-in-the-american-outdoors","created_at":"2025-03-13T23:33:57.209Z","imageurl":"https://localist-images.azureedge.net/photos/47561079326308/huge/d8332791c879a84f7c2d28a623af4367db5220ff.jpg","starttime":"11:00:00","endtime":"16:00:00"},{"id":25,"title":"https://www.artechouse.com/program/blooming-wonders/","location":"ARTECHOUSE DC","time":"time","price":"0-30","source":"https://events.baltimoremagazine.com/event/httpswwwartechousecomprogramblooming-wonders","created_at":"2025-03-13T23:33:57.210Z","imageurl":"https://localist-images.azureedge.net/photos/48969439825924/huge/851d7bf75435e99657ec135d3500f496327fda7e.jpg","starttime":"12:00:00","endtime":"22:00:00"},{"id":26,"title":"Wye Oak Lecture Series—Pulling Threads: Early Embroidery Samplers of The Historic St. James Episcopal Church","location":"Maryland Center for History and Culture","time":"time","price":"$15 for Members | $30 for Non-members","source":"https://events.baltimoremagazine.com/event/wye-oak-lecture-seriespulling-threads-early-embroidery-samplers-of-the-historic-st-james-episcopal-church","created_at":"2025-03-13T23:33:57.212Z","imageurl":"https://localist-images.azureedge.net/photos/48747254246241/huge/dd1c710e3ef3e715cb58cc7e848a91b6a574c588.jpg","starttime":"17:30:00","endtime":"19:30:00"},{"id":27,"title":"Depths of History: Gender-Based Violence in Art","location":"The Walters Art Museum","time":"time","price":"Free, registration required ","source":"https://events.baltimoremagazine.com/event/depths-of-history-gender-based-violence-in-art","created_at":"2025-03-13T23:33:57.214Z","imageurl":"https://localist-images.azureedge.net/photos/48349921188117/huge/3d2e9aee09248b4c1002494458fc6d6bf1385bed.jpg","starttime":"18:00:00","endtime":"19:30:00"},{"id":28,"title":"BREWS N’ Qs THURSDAY NIGHT TRIVIA","location":"Cult Classic Brewing Company","time":"time","price":"0","source":"https://events.baltimoremagazine.com/event/brews-n-qs-thursday-night-trivia","created_at":"2025-03-13T23:33:57.706Z","imageurl":"https://localist-images.azureedge.net/photos/48488752374299/huge/8bd615c52c96e490148a31cc081139a8883c903c.jpg","starttime":"18:30:00","endtime":"20:00:00"},{"id":29,"title":"Fundamentals of Musical Improv - Multi-Week Class!","location":"Riverside Third Space","time":"time","price":"$225, scholarships available","source":"https://events.baltimoremagazine.com/event/fundamentals-of-musical-improv-multi-week-class","created_at":"2025-03-13T23:33:57.709Z","imageurl":"https://localist-images.azureedge.net/photos/48861260697023/huge/8724bd23e32e14b4c0177c725b6cac7c227514c4.jpg","starttime":"18:30:00","endtime":"21:30:00"},{"id":30,"title":"Loyola University Maryland 2025 Humanities Symposium Keynote Address","location":"Loyola University Maryland-McGuire Hall (Andrew White Student Center)","time":"time","price":"Free","source":"https://events.baltimoremagazine.com/event/loyola-university-maryland-2025-humanities-symposium-keynote-address","created_at":"2025-03-13T23:33:57.711Z","imageurl":"https://localist-images.azureedge.net/photos/48687436846619/huge/3f06f2a92d1622d81352697ce207ba9c13d08c73.jpg","starttime":"18:30:00","endtime":"20:00:00"},{"id":31,"title":"Loyola University Maryland 2025 Humanities Symposium Keynote Address","location":"Loyola University Maryland-McGuire Hall","time":"time","price":"Free","source":"https://events.baltimoremagazine.com/event/loyola-university-maryland-2025-humanities-symposium-keynote-address-8656","created_at":"2025-03-13T23:33:57.713Z","imageurl":"https://localist-images.azureedge.net/photos/48687461409349/huge/950629facd4948ad8fdcbeb8f66bacf8414b634d.jpg","starttime":"18:30:00","endtime":"20:00:00"},{"id":32,"title":"Artemis","location":"Keystone Korner Baltimore","time":"time","price":"$15-45","source":"https://events.baltimoremagazine.com/event/artemis","created_at":"2025-03-13T23:33:57.715Z","imageurl":"https://localist-images.azureedge.net/photos/49056239742077/huge/5e817507e72598c59b0d8bd717933cd22cf6ee80.jpg","starttime":"19:00:00","endtime":"20:30:00"},{"id":60,"title":"Grow your own seeds","location":"Patterson Park","time":"time","price":"Not Provided","source":"https://calendar.prattlibrary.org/event/grow-your-own-seeds","created_at":"2025-03-13T23:33:59.952Z","imageurl":"https://localist-images.azureedge.net/photos/48489974056555/huge/d83bba4a2832687dde705e147fb276f0703930bb.jpg","starttime":"15:00:00","endtime":"16:00:00"},{"id":33,"title":"Best of Women : a Comedy Celebration","location":"Peabody Heights Brewer","time":"time","price":"$0-10, sliding scale","source":"https://events.baltimoremagazine.com/event/best-of-women-a-comedy-celebration","created_at":"2025-03-13T23:33:57.717Z","imageurl":"https://localist-images.azureedge.net/photos/48844690842718/huge/92ebf0ced48c213f03a6058fbb032ac4ce7ba5d4.jpg","starttime":"19:00:00","endtime":"21:00:00"},{"id":34,"title":"Trivia Night","location":"Nacho Mama's Towson","time":"time","price":"Free","source":"https://events.baltimoremagazine.com/event/trivia_night_1353","created_at":"2025-03-13T23:33:57.720Z","imageurl":"https://localist-images.azureedge.net/photos/44455179943303/huge/e18115277b61da35f39f72fe90cb03771d0fcc63.jpg","starttime":"19:00:00","endtime":null},{"id":35,"title":"ART at Vagabond Players","location":"Vagabond Players","time":"time","price":"$25-$28","source":"https://events.baltimoremagazine.com/event/art-at-vagabond-players","created_at":"2025-03-13T23:33:57.721Z","imageurl":"https://localist-images.azureedge.net/photos/48782144290763/huge/9c8804c576b9a34ee654aab0ce7881ebb9e643ae.jpg","starttime":"20:00:00","endtime":null},{"id":36,"title":"RAIN—A TRIBUTE TO THE BEATLES","location":"Strathmore Music Center","time":"time","price":"Not Provided","source":"https://events.baltimoremagazine.com/event/raina-tribute-to-the-beatles","created_at":"2025-03-13T23:33:57.723Z","imageurl":"https://localist-images.azureedge.net/photos/47756831771125/huge/76ab6f5ebbccaf288be42f6dcd9f3e1179e67707.jpg","starttime":"20:00:00","endtime":null},{"id":37,"title":"Free Tax Preparation","location":"Central Library","time":"time","price":"Not Provided","source":"https://calendar.prattlibrary.org/event/free-tax-preparation","created_at":"2025-03-13T23:33:58.419Z","imageurl":"https://localist-images.azureedge.net/photos/47800328927902/huge/42687aefd820c9279811b65ab5fc5d55760b637f.jpg","starttime":"00:00:00","endtime":null},{"id":38,"title":"The Civic Pride of the Baltimore Salt Box","location":"Central Library","time":"time","price":"Not Provided","source":"https://calendar.prattlibrary.org/event/civic_pride_salt_box","created_at":"2025-03-13T23:33:58.421Z","imageurl":"https://localist-images.azureedge.net/photos/48243741753091/huge/1d345268a2c4e2f0885fcbf6b162fa7d9d5ad06d.jpg","starttime":"00:00:00","endtime":null},{"id":39,"title":"Baby & Toddler Storytime","location":"Waverly","time":"time","price":"Not Provided","source":"https://calendar.prattlibrary.org/event/baby_toddler_storytime_wvr","created_at":"2025-03-13T23:33:58.422Z","imageurl":"https://localist-images.azureedge.net/photos/683143/huge/46a36bd5adf9778b95c89f92140e82662e32c4b8.jpg","starttime":"10:30:00","endtime":null},{"id":40,"title":"Family Storytime","location":"Roland Park","time":"time","price":"Not Provided","source":"https://calendar.prattlibrary.org/event/family_storytime_rln","created_at":"2025-03-13T23:33:58.424Z","imageurl":"https://localist-images.azureedge.net/photos/649860/huge/ae34e3cc169b5ed25e948de0d820fac4d05e97e4.jpg","starttime":"10:30:00","endtime":null},{"id":41,"title":"Introduction to PowerPoint 2019","location":"Hamilton","time":"time","price":"Not Provided","source":"https://calendar.prattlibrary.org/event/introduction-to-powerpoint-2019","created_at":"2025-03-13T23:33:58.426Z","imageurl":"https://localist-images.azureedge.net/photos/48285889442110/huge/27998ee12b1d2514f78d0568262dc13240b3633a.jpg","starttime":"10:30:00","endtime":"12:30:00"},{"id":42,"title":"Family Storytime","location":"Southeast Anchor","time":"time","price":"Not Provided","source":"https://calendar.prattlibrary.org/event/family_storytime_7656","created_at":"2025-03-13T23:33:58.428Z","imageurl":"https://localist-images.azureedge.net/photos/649860/huge/ae34e3cc169b5ed25e948de0d820fac4d05e97e4.jpg","starttime":"11:00:00","endtime":null},{"id":43,"title":"Job and Career Clinic","location":"Central Library","time":"time","price":"Not Provided","source":"https://calendar.prattlibrary.org/event/job-and-career-clinic","created_at":"2025-03-13T23:33:58.430Z","imageurl":"https://localist-images.azureedge.net/photos/649047/huge/4a29bca2a374f869ae5bc874605c1933150d4a4d.jpg","starttime":"11:00:00","endtime":"16:00:00"},{"id":44,"title":"Baltimore Literature Discussion","location":"Pennsylvania Avenue","time":"time","price":"Not Provided","source":"https://calendar.prattlibrary.org/event/baltimore-literature-discussion","created_at":"2025-03-13T23:33:58.431Z","imageurl":"https://localist-images.azureedge.net/photos/48348048544526/huge/46dce188a69cf83014f14b2491113310e051e1be.jpg","starttime":"12:00:00","endtime":null},{"id":45,"title":"Introduction to Computer Basics","location":"Virtual Event","time":"time","price":"Not Provided","source":"https://calendar.prattlibrary.org/event/introduction-to-computer-basics-1155","created_at":"2025-03-13T23:33:58.433Z","imageurl":"https://localist-images.azureedge.net/photos/648964/huge/6432c342cf369d1b97b4198eca2591b79a428feb.jpg","starttime":"12:00:00","endtime":"14:00:00"},{"id":46,"title":"Shut Up and Write - Virtual","location":"","time":"time","price":"Not Provided","source":"https://calendar.prattlibrary.org/event/shut-up-and-write-virtual-6950","created_at":"2025-03-13T23:33:58.442Z","imageurl":"https://localist-images.azureedge.net/photos/648964/huge/6432c342cf369d1b97b4198eca2591b79a428feb.jpg","starttime":"12:00:00","endtime":"13:30:00"},{"id":47,"title":"Shut Up and Write Virtual","location":"Virtual Event","time":"time","price":"Not Provided","source":"https://calendar.prattlibrary.org/event/shut-up-and-write-virtual","created_at":"2025-03-13T23:33:59.274Z","imageurl":"https://localist-images.azureedge.net/photos/649047/huge/4a29bca2a374f869ae5bc874605c1933150d4a4d.jpg","starttime":"12:00:00","endtime":"13:30:00"},{"id":48,"title":"Family Storytime","location":"Govans","time":"time","price":"Not Provided","source":"https://calendar.prattlibrary.org/event/family_storytime_gvn","created_at":"2025-03-13T23:33:59.281Z","imageurl":"https://localist-images.azureedge.net/photos/649860/huge/ae34e3cc169b5ed25e948de0d820fac4d05e97e4.jpg","starttime":"12:30:00","endtime":null},{"id":49,"title":"Introduction to Google Workspace","location":"Walbrook","time":"time","price":"Not Provided","source":"https://calendar.prattlibrary.org/event/introduction-to-google-workspace-9965","created_at":"2025-03-13T23:33:59.284Z","imageurl":"https://localist-images.azureedge.net/photos/48188559706710/huge/5b3bb92e2168bc7c1fdb7ceede0cf66e9700a5fc.jpg","starttime":"12:30:00","endtime":"14:30:00"},{"id":50,"title":"Lunch & Learn: Preserving the AFRO News Archives","location":"Virtual Event","time":"time","price":"Not Provided","source":"https://calendar.prattlibrary.org/event/lunch-learn-preserving-the-AFRO-News-Archives","created_at":"2025-03-13T23:33:59.286Z","imageurl":"https://localist-images.azureedge.net/photos/48621445175133/huge/c0a2d75b34e8ee9b7dbe267a43ef3d0e27fe70e4.jpg","starttime":"13:00:00","endtime":null},{"id":51,"title":"Digital Drop-In Clinic","location":"Southeast Anchor","time":"time","price":"Not Provided","source":"https://calendar.prattlibrary.org/event/digital_drop_in","created_at":"2025-03-13T23:33:59.293Z","imageurl":"https://localist-images.azureedge.net/photos/648962/huge/a63a95710cef6b675daa039eb0fcf97f983b2492.jpg","starttime":"14:00:00","endtime":"16:00:00"},{"id":52,"title":"Introduction to Computer Basics","location":"Cherry Hill","time":"time","price":"Not Provided","source":"https://calendar.prattlibrary.org/event/introduction-to-computer-basics-6487","created_at":"2025-03-13T23:33:59.299Z","imageurl":"https://localist-images.azureedge.net/photos/48242264481297/huge/fe6d4ac6f64a286265d374283d15dbc287f74d44.jpg","starttime":"14:00:00","endtime":"16:00:00"},{"id":53,"title":"Introduction to Workplace Readiness","location":"Edmondson Avenue","time":"time","price":"Not Provided","source":"https://calendar.prattlibrary.org/event/introduction-to-workplace-readiness-7250","created_at":"2025-03-13T23:33:59.301Z","imageurl":"https://localist-images.azureedge.net/photos/48285430062612/huge/f51a28cfaab1a6a3d63157070802a3421721c745.jpg","starttime":"14:00:00","endtime":"16:00:00"},{"id":54,"title":"Paper Crafts","location":"Southeast Anchor","time":"time","price":"Not Provided","source":"https://calendar.prattlibrary.org/event/paper_crafts","created_at":"2025-03-13T23:33:59.303Z","imageurl":"https://localist-images.azureedge.net/photos/649069/huge/d32bd77837f0871461b1d23207be837a7586df0d.jpg","starttime":"14:00:00","endtime":null},{"id":55,"title":"Workplace Readiness Series","location":"Pennsylvania Avenue","time":"time","price":"Not Provided","source":"https://calendar.prattlibrary.org/event/workplace-readiness-series-4458","created_at":"2025-03-13T23:33:59.307Z","imageurl":"https://localist-images.azureedge.net/photos/48285430062612/huge/f51a28cfaab1a6a3d63157070802a3421721c745.jpg","starttime":"14:00:00","endtime":"16:00:00"},{"id":56,"title":"After School Fun","location":"Hamilton","time":"time","price":"Not Provided","source":"https://calendar.prattlibrary.org/event/after_school_funhamilton","created_at":"2025-03-13T23:33:59.312Z","imageurl":"https://localist-images.azureedge.net/photos/45121339551779/huge/257ae667600af9a4e49fda504a101108f730fa1e.jpg","starttime":"15:00:00","endtime":"16:00:00"},{"id":57,"title":"Cozy Reading Cafe for Teens","location":"Hampden","time":"time","price":"Not Provided","source":"https://calendar.prattlibrary.org/event/cozy-reading-cafe-for-teens","created_at":"2025-03-13T23:33:59.944Z","imageurl":"https://localist-images.azureedge.net/photos/47233963200017/huge/243534fda4f020102460269f88d485e57523856c.jpg","starttime":"15:00:00","endtime":"16:00:00"},{"id":58,"title":"Family Movie: Moana 2 ","location":"Govans","time":"time","price":"Not Provided","source":"https://calendar.prattlibrary.org/event/family-movie-moana-2","created_at":"2025-03-13T23:33:59.946Z","imageurl":"https://localist-images.azureedge.net/photos/48338341108471/huge/5f511920f4bbc0ab5233dd8c4563ba7ea146adf6.jpg","starttime":"15:00:00","endtime":null},{"id":59,"title":"Family Storytime","location":"Pennsylvania Avenue","time":"time","price":"Free ","source":"https://calendar.prattlibrary.org/event/family_storytime_pnn","created_at":"2025-03-13T23:33:59.948Z","imageurl":"https://localist-images.azureedge.net/photos/649860/huge/ae34e3cc169b5ed25e948de0d820fac4d05e97e4.jpg","starttime":"15:00:00","endtime":null},{"id":61,"title":"One Rainy Day","location":"Hamilton","time":"time","price":"Not Provided","source":"https://calendar.prattlibrary.org/event/one-rainy-day","created_at":"2025-03-13T23:33:59.954Z","imageurl":"https://localist-images.azureedge.net/photos/48261142790155/huge/fd7dfe293004b4f334e279239e0f8ebbb0048795.jpg","starttime":"15:00:00","endtime":"16:00:00"},{"id":62,"title":"Sensory Mapping: Art Beyond Sight ","location":"Hamilton Branch","time":"time","price":"$0","source":"https://calendar.prattlibrary.org/event/sensory-mapping-art-beyond-sight","created_at":"2025-03-13T23:33:59.957Z","imageurl":"https://localist-images.azureedge.net/photos/48782440020940/huge/2b05ca535d42a29922d2cc3375851b4f3450583b.jpg","starttime":"15:00:00","endtime":"16:30:00"},{"id":63,"title":"Super Smash Bros. Tournament ","location":"Roland Park","time":"time","price":"Not Provided","source":"https://calendar.prattlibrary.org/event/super-smash-bros-tournament","created_at":"2025-03-13T23:33:59.959Z","imageurl":"https://localist-images.azureedge.net/photos/48295852857472/huge/35a34e6bcf80dca5ea52490a0714a678ab026fd8.jpg","starttime":"15:00:00","endtime":"16:00:00"},{"id":64,"title":"Club de Anime en Español","location":"Southeast Anchor","time":"time","price":"Not Provided","source":"https://calendar.prattlibrary.org/event/club-de-anime-en-espanol","created_at":"2025-03-13T23:33:59.960Z","imageurl":"https://localist-images.azureedge.net/photos/48906591183108/huge/92007b073bcd16872f0a91c5ba4b7d9ceac8759d.jpg","starttime":"15:30:00","endtime":"16:30:00"},{"id":65,"title":"DIY Shower Steamer","location":"Children's Department","time":"time","price":"Not Provided","source":"https://calendar.prattlibrary.org/event/diy-shower-steamer","created_at":"2025-03-13T23:33:59.962Z","imageurl":"https://localist-images.azureedge.net/photos/48490064413477/huge/06f3ba68bb4ed336134c12508251bf053b22262d.jpg","starttime":"15:30:00","endtime":"16:30:00"},{"id":66,"title":"Building Block Club","location":"Waverly","time":"time","price":"Not Provided","source":"https://calendar.prattlibrary.org/event/building_block_club","created_at":"2025-03-13T23:33:59.965Z","imageurl":"https://localist-images.azureedge.net/photos/45686055958713/huge/3aa97d0dd94afba1f77bd27f921127208609ed12.jpg","starttime":"16:00:00","endtime":null},{"id":67,"title":"Family Storytime","location":"Orleans Street","time":"time","price":"Not Provided","source":"https://calendar.prattlibrary.org/event/family_storytime_776","created_at":"2025-03-13T23:34:00.651Z","imageurl":"https://localist-images.azureedge.net/photos/47924160750021/huge/519a6bfb38e09d26c19fed4cafbf3349dc97ecd5.jpg","starttime":"16:00:00","endtime":null},{"id":68,"title":"No Pressure Book Club!","location":"Patterson Park","time":"time","price":"Not Provided","source":"https://calendar.prattlibrary.org/event/no-pressure-book-club-5565","created_at":"2025-03-13T23:34:00.653Z","imageurl":"https://localist-images.azureedge.net/photos/649069/huge/d32bd77837f0871461b1d23207be837a7586df0d.jpg","starttime":"16:00:00","endtime":"17:00:00"},{"id":69,"title":"Jamercise with Ginger","location":"Cherry Hill","time":"time","price":"Not Provided","source":"https://calendar.prattlibrary.org/event/jamercise-with-ginger-4656","created_at":"2025-03-13T23:34:00.656Z","imageurl":"https://localist-images.azureedge.net/photos/47816914388393/huge/c73380629c5732780599e77971f43200d9bba8c8.jpg","starttime":"16:30:00","endtime":"17:30:00"},{"id":70,"title":"Board Games ","location":"Edmondson Avenue","time":"time","price":"Not Provided","source":"https://calendar.prattlibrary.org/event/board-game-night-1092","created_at":"2025-03-13T23:34:00.658Z","imageurl":"https://localist-images.azureedge.net/photos/48356856457003/huge/e970edf1de959b2df43dd009077fb23741a41161.jpg","starttime":"17:00:00","endtime":"18:30:00"},{"id":71,"title":"Google Workspace Intermediate Skills","location":"Orleans Street","time":"time","price":"Not Provided","source":"https://calendar.prattlibrary.org/event/google-workspace-intermediate-skills","created_at":"2025-03-13T23:34:00.661Z","imageurl":"https://localist-images.azureedge.net/photos/48791453938199/huge/24fc7bde533d0b2088c1abe15c8a342e78a0a60b.jpg","starttime":"17:30:00","endtime":"19:30:00"},{"id":72,"title":"Photo Book Meet-Up","location":"Central Library","time":"time","price":"Not Provided","source":"https://calendar.prattlibrary.org/event/photo_book_meet-up_8747","created_at":"2025-03-13T23:34:00.664Z","imageurl":"https://localist-images.azureedge.net/photos/44137931711388/huge/9fb1e38e68c56269c501995f5cc85e3b1bdeb395.jpg","starttime":"17:30:00","endtime":"19:30:00"},{"id":73,"title":"Get on Board!","location":"Light Street","time":"time","price":"Not Provided","source":"https://calendar.prattlibrary.org/event/get_on_board_8579","created_at":"2025-03-13T23:34:00.665Z","imageurl":"https://localist-images.azureedge.net/photos/43961409579624/huge/c8c73d94ae73249a2888605de7b4b3ac8d09e19b.jpg","starttime":"18:30:00","endtime":null},{"id":74,"title":"Clara Bingham: \"The Movement\"","location":"Virtual Event","time":"time","price":"Not Provided","source":"https://calendar.prattlibrary.org/event/clara-bingham-the-movement","created_at":"2025-03-13T23:34:00.668Z","imageurl":"https://localist-images.azureedge.net/photos/48542268494769/huge/82371f8debdb1742c8c75d7e3108a05bf25c2279.jpg","starttime":"19:00:00","endtime":"20:00:00"},{"id":75,"title":"Sip Her Story: A “Women in Wine” Tasting","location":"Not Provided","time":"Not Provided","price":"$20","source":"https://baltimorebeat.com/baltimore-arts-and-culture-events-3-12-25-3-26-25/","created_at":"2025-03-13T23:34:01.388Z","imageurl":null,"starttime":"18:30:00","endtime":"20:30:00"},{"id":76,"title":"Queeraoke","location":"Ottobar","time":"Not Provided","price":"Not Provided","source":"https://baltimorebeat.com/baltimore-arts-and-culture-events-3-12-25-3-26-25/","created_at":"2025-03-13T23:34:01.394Z","imageurl":null,"starttime":"21:00:00","endtime":null}]
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
				case "earliestToLatest":
					sortedEvents.sort((a, b) => {
						const aStartTime =
							a.starttime &&
							DateTime.fromFormat(
								a.starttime.toString(),
								"HH:mm:ss"
							);
						const bStartTime =
							b.starttime &&
							DateTime.fromFormat(
								b.starttime.toString(),
								"HH:mm:ss"
							);

						return (
							(aStartTime?.toMillis() || 0) -
							(bStartTime?.toMillis() || 0)
						);
					});
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
