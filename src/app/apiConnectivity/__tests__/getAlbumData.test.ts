import { describe, expect, it } from "vitest";
import dotenv from "dotenv";
import { getAlbumData } from "../getAlbumData";
import { getAccessToken } from "../getToken";

dotenv.config();

describe("getAlbumData", () => {
    const albumId = "4aawyAB9vmqN3uQ7FjRGTy";

    it("obtains album data", async () => {
        const clientId = process.env.CLIENT_ID!;
        const clientSecret = process.env.CLIENT_SECRET!;

        const accessToken = await getAccessToken(clientId, clientSecret);

        const albumData = await getAlbumData(albumId);
        expect(albumData).toBeDefined();
        expect(albumData.name).toBeDefined();
        expect(albumData.artists).toBeInstanceOf(Array);
    });
    
    it("non-existing album id", async () => {
        const fakeAlbumId = "1234567890abcdef";

        try {
            await getAlbumData(fakeAlbumId);
        } catch (error: any) {
            expect(error).toBeDefined();
            expect(error.response.status).toBe(404);
        }
    });
});
