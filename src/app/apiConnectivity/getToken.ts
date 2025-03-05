import axios from "axios";
import qs from "qs";
import dotenv from "dotenv";

dotenv.config();

const url = "https://accounts.spotify.com/api/token";

export const getAccessToken = async (clientId: string, clientSecret: string): Promise<string> => {
    try {
        const data = qs.stringify({
            grant_type: "client_credentials",
            client_id: clientId,
            client_secret: clientSecret,
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


