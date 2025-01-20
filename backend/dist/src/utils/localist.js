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
exports.getBaltimoreMagazineEvents = void 0;
const luxon_1 = require("luxon");
const db_1 = __importDefault(require("../../db"));
const getBaltimoreMagazineEvents = () => __awaiter(void 0, void 0, void 0, function* () {
    const baseURL = "https://events.baltimoremagazine.com";
    console.log("Fetching Baltimore Magazine events...");
    const response = yield fetch(`${baseURL}/api/2/events`);
    const data = yield response.json();
    console.log("Parsed data:", data);
    const events = data.events;
    for (const event of events) {
        console.log("Processing event:", event.event.title);
        const title = event.event.title;
        const location = event.event.location || event.event.location_name;
        const startTime = event.event.event_instances[0].event_instance.start;
        const endTime = event.event.event_instances[0].event_instance.end || startTime;
        const startDateTime = luxon_1.DateTime.fromISO(startTime);
        const endDateTime = luxon_1.DateTime.fromISO(endTime);
        const formattedStartTime = startDateTime.toFormat("hh:mm a");
        const formattedEndTime = endDateTime.toFormat("hh:mm a");
        const time = `${formattedStartTime} - ${formattedEndTime}`;
        const price = event.event.ticket_cost || "Not Provided";
        yield db_1.default.query("INSERT INTO events (title, location, time, price, source) VALUES ($1, $2, $3, $4, $5)", [title, location, time, price, baseURL]);
    }
});
exports.getBaltimoreMagazineEvents = getBaltimoreMagazineEvents;
