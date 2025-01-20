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
const express_1 = require("express");
const db_1 = __importDefault(require("../../db"));
const tumblr_1 = require("../utils/tumblr");
const localist_1 = require("../utils/localist");
const router = (0, express_1.Router)();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db_1.default.query("SELECT * from events");
        res.json(result.rows);
    }
    catch (error) {
        console.log("Error fetching events:", error);
    }
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, tumblr_1.getBaltShowPlaceEvents)();
        yield (0, localist_1.getBaltimoreMagazineEvents)();
        res.status(201).json({ message: "Events saved successfully!" });
    }
    catch (error) {
        console.log("Error saving events:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}));
exports.default = router;
