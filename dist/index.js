"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const qs_1 = __importDefault(require("qs")); // Import qs for URL encoding
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const url = "https://accounts.spotify.com/api/token";
const getAccesToken = async () => {
    try {
        const data = qs_1.default.stringify({
            grant_type: "client_credentials",
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
        });
        const response = await axios_1.default.post(url, data, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        const { access_token } = await response.data;
        return access_token;
    }
    catch (error) {
        throw new Error("Error obtaining token");
    }
};
console.log(getAccesToken());
