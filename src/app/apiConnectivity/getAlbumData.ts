import axios from "axios";
import dotenv from "dotenv";
import { getAccessToken } from "./getToken"; 

dotenv.config();

const BASE_URL = "https://api.spotify.com/v1/albums";


export const getAlbumData = async (albumId: string) => {
    try {
        const clientId = process.env.CLIENT_ID!;
        const clientSecret = process.env.CLIENT_SECRET!;
        const accessToken = await getAccessToken(clientId, clientSecret);

        const response = await axios.get(`${BASE_URL}/${albumId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return response.data;
    } catch (error: any) {
        console.error("Error obtaining album data:", error.response?.data || error.message);
    }
};

