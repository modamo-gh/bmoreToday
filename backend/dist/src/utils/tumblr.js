"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBaltShowPlaceEvents = void 0;
const cheerio_1 = require("cheerio");
const luxon_1 = require("luxon");
const dotenv_1 = require("dotenv");
const db_1 = __importDefault(require("../../db"));
(0, dotenv_1.configDotenv)();
const todaysDate = luxon_1.DateTime.now().toLocaleString(luxon_1.DateTime.DATE_HUGE);
const getBaltShowPlaceEvents = () => __awaiter(void 0, void 0, void 0, function* () {
    const blogIdentifier = "baltshowplace.tumblr.com";
    const apiKey = process.env.API_KEY;
    const response = yield fetch(`https://api.tumblr.com/v2/blog/${blogIdentifier}/posts?api_key=${apiKey}`);
    const data = yield response.json();
    const posts = data.response.posts;
    const thisMonthsPost = posts[0];
    const body = thisMonthsPost.body;
    const $ = (0, cheerio_1.load)(body);
    const todaysHeader = $("h2").filter((_, el) => $(el).text().trim() === todaysDate);
    const todaysEvents = todaysHeader.nextUntil("h2", "p");
    const events = [];
    todaysEvents.each((_, el) => {
        let event = $(el).text().trim();
        const locationRegex = /@ (.+)$/;
        const locationMatch = event.match(locationRegex);
        const location = locationMatch ? locationMatch[1].trim() : "Unknown";
        event = event.replace(locationRegex, "").trim();
        const priceRegex = /(\$.+)/;
        const priceMatch = event.match(priceRegex);
        const price = priceMatch ? priceMatch[1].trim() : "Unknown";
        event = event.replace(priceRegex, "").trim();
        const timeRegex = /((\d+:)?\d+(A|P)M)/;
        const timeMatch = event.match(timeRegex);
        const time = timeMatch ? timeMatch[1].trim() : "Unknown";
        event = event.replace(timeRegex, "").trim();
        const title = event.slice(0, -3);
        if (title.length) {
            events.push({ title, time, price, location });
        }
    });
    for (const event of events) {
        yield db_1.default.query("INSERT INTO events (title, location, time, price) VALUES ($1, $2, $3, $4)", [event.title, event.location, event.time, event.price]);
    }
});
exports.getBaltShowPlaceEvents = getBaltShowPlaceEvents;
