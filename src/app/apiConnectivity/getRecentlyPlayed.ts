import axios from "axios";
import dotenv from "dotenv";
import { getAccessToken } from "./getToken"; 

dotenv.config();

export const getRecentlyPlayed = async (accessToken: string) => {
    try {

        const response = await axios.get("https://api.spotify.com/v1/me/player/recently-played", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            params: {
                limit: 50,
            },
        });

        const tracks = response.data.items;

        const albums = tracks.map((track: any) => track.track.album)
                            .filter((album: any, index: number, self: any[]) => 
                                self.findIndex(a => a.id === album.id) === index
                            );

        console.log("Recently played albums:", albums);
        return albums;
    } catch (error: any) {
        console.error("Error obtaining recently played tracks:", error.response?.data || error.message);
    }
};


