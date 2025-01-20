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
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const events_1 = __importDefault(require("./api/events"));
const db_1 = __importDefault(require("../db"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const node_cron_1 = __importDefault(require("node-cron"));
const tumblr_1 = require("./utils/tumblr");
(0, dotenv_1.configDotenv)();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: "https://bmoretoday.modamo.xyz", optionsSuccessStatus: 200 }));
app.use("/api/events", events_1.default);
app.use(express_1.default.static(path_1.default.join(__dirname, "../frontend/build")));
app.get("*", (req, res) => {
    res.sendFile(path_1.default.resolve(__dirname, "../frontend/build", "index.html"));
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.default.query("SELECT NOW()");
        console.log("Database connected successfully!");
    }
    catch (error) {
        console.error("Error connecting to databases:", error);
    }
}))();
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
node_cron_1.default.schedule("0 14 * * *", () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.default.query("TRUNCATE TABLE events");
        yield (0, tumblr_1.getBaltShowPlaceEvents)();
    }
    catch (error) {
        console.error("Error during cron job:", error);
    }
}));
