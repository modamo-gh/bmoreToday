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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var cheerio_1 = require("cheerio");
var luxon_1 = require("luxon");
var getBaltimoreBeatURLs = function () { return __awaiter(void 0, void 0, void 0, function () {
    var response, html, $, governmentAndCommunityEventsURL, artsAndCultureEventsURL;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, axios_1.default.get("https://baltimorebeat.com/category/calendar/")];
            case 1:
                response = _a.sent();
                html = response.data;
                $ = (0, cheerio_1.load)(html);
                governmentAndCommunityEventsURL = "";
                artsAndCultureEventsURL = "";
                $("article").each(function (_, element) {
                    var title = $(element).find("h2 a").text().trim();
                    var url = $(element).find("h2 a").attr("href");
                    if (title.includes("Baltimore Government and Community Events") &&
                        url &&
                        !governmentAndCommunityEventsURL) {
                        governmentAndCommunityEventsURL = url;
                    }
                    if (title.includes("Baltimore Arts and Culture Events") &&
                        url &&
                        !artsAndCultureEventsURL) {
                        artsAndCultureEventsURL = url;
                    }
                    if (governmentAndCommunityEventsURL && artsAndCultureEventsURL) {
                        return false;
                    }
                });
                return [2 /*return*/, { governmentAndCommunityEventsURL: governmentAndCommunityEventsURL, artsAndCultureEventsURL: artsAndCultureEventsURL }];
        }
    });
}); };
var getBaltimoreBeatEvents = function (url) { return __awaiter(void 0, void 0, void 0, function () {
    var response, html, $, today, todaysSection, todaysEvents, events;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, axios_1.default.get(url)];
            case 1:
                response = _a.sent();
                html = response.data;
                $ = (0, cheerio_1.load)(html);
                today = luxon_1.DateTime.now().toFormat("EEEE, MMMM d");
                todaysSection = $("p strong")
                    .filter(function (_, element) { return $(element).text().trim() === today; })
                    .parent();
                todaysEvents = todaysSection.nextUntil("p.has-primary-color", "p");
                events = [];
                todaysEvents.each(function (_, element) {
                    var _a, _b, _c;
                    var event = {
                        title: "Not Provided",
                        location: "Not Provided",
                        time: "Not Provided",
                        price: "Not Provided"
                    };
                    var title = $(element).find("a strong").text().trim();
                    if (!title) {
                        title = $(element).find("strong a").text().trim();
                    }
                    event.title = title;
                    var price = (_a = $(element).text().trim().match(/\$\d+/)) === null || _a === void 0 ? void 0 : _a[0];
                    if (price) {
                        event.price = price;
                    }
                    var location = (_b = $(element)
                        .text()
                        .trim()
                        .match(/at\s([\w|\s|\.|’]+)(,[\w|\s|\.|']+)?\./)) === null || _b === void 0 ? void 0 : _b[1];
                    if (location) {
                        event.location = location[0].toUpperCase() + location.slice(1);
                    }
                    var time = (_c = $(element)
                        .text()
                        .trim()
                        .match(/\d{1,2}(:\d{1,2})?\s[a|p]\.m\.(\sto\s((\d{1,2}(:\d{1,2})?\s[a|p]\.m\.)|noon))?/)) === null || _c === void 0 ? void 0 : _c[0];
                    if (time) {
                        event.time = time;
                    }
                    events.push(event);
                });
                return [2 /*return*/, events];
        }
    });
}); };
var getEvents = function () { return __awaiter(void 0, void 0, void 0, function () {
    var events, urls, _i, _a, url, es;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                events = [];
                return [4 /*yield*/, getBaltimoreBeatURLs()];
            case 1:
                urls = _b.sent();
                _i = 0, _a = Object.values(urls);
                _b.label = 2;
            case 2:
                if (!(_i < _a.length)) return [3 /*break*/, 5];
                url = _a[_i];
                return [4 /*yield*/, getBaltimoreBeatEvents(url)];
            case 3:
                es = _b.sent();
                events = __spreadArray(__spreadArray([], events, true), es, true);
                _b.label = 4;
            case 4:
                _i++;
                return [3 /*break*/, 2];
            case 5:
                console.log(events);
                return [2 /*return*/];
        }
    });
}); };
getEvents();
