import {beforeAll, afterAll, it, expect, describe} from "vitest";
import {
    initializeDatabase,
    closeDatabase,
    addAlbum,
    getAlbumById,
    getAlbumCount,
    getAllAlbums,
    createDatabase
} from "../database";

beforeAll(async () => {
    createDatabase(":memory:")
  await initializeDatabase();
});

afterAll(async () => {
  await closeDatabase();
});

describe("Database connection", async () => {
    it("creates an empty database", async () => {
        const count = await getAlbumCount();

        expect(count).toBe(0);
    });

    it("adds an album", async () => {
        const albumId = "exampleAlbumId";
        await addAlbum(albumId);

        const album = await getAlbumById(albumId);

        expect(album).not.toBeNull();
        expect(album!.album_id).toBe(albumId);
        expect(album!.amount).toBe(1);


    });

    it("returns an all albums", async () => {
        await addAlbum("testAlbum2");

        const albums = await getAllAlbums();
        const count = await getAlbumCount();

        expect(count).toBe(2);
        expect(albums[0]).toBeDefined();
        expect(albums[0]!.amount).toBe(1);
    });
})