import axios from "axios";
import qs from "qs";
import dotenv from "dotenv";

dotenv.config();

const url = "https://accounts.spotify.com/api/token";

const getAccesToken = async (): Promise<string> => {
    try {
        const data = qs.stringify({
            grant_type: "client_credentials",
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
        });

        const response = await axios.post(url, data, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });

        const { access_token } = await response.data;
        return access_token;
    } catch (error: any) {
        throw new Error("Error obtaining token");
    }
};

console.log(getAccesToken());
