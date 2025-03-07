import { beforeAll, afterAll, test, expect } from "vitest";
import { initializeDatabase, closeDatabase, addAlbum, getAlbumById, getAlbumCount, getAllAlbums } from "../database";

beforeAll(async () => {
  await initializeDatabase();
});

afterAll(async () => {
  await closeDatabase();
});

test("Empty database after initialization", async () => {
    const count = await getAlbumCount();
    expect(count).toBe(0);
  });

test("Adding a new album", async () => {
  const albumId = "exampleAlbumId";

  await addAlbum(albumId);
  const album = await getAlbumById(albumId);

  expect(album).not.toBeNull();
  expect(album!.album_id).toBe(albumId);
  expect(album!.amount).toBe(1);
});

test("Adding an existing album", async () => {
  const albumId = "duplicateAlbumId";

  await addAlbum(albumId);
  await addAlbum(albumId);

  const album = await getAlbumById(albumId);
  expect(album!.amount).toBe(2);
});

test("Debe devolver un array con todos los álbumes", async () => {
    const albums = await getAllAlbums();
    const count = await getAlbumCount();
    expect(count).toBe(2);
  
    const album1 = albums.find((a) => a.album_id === "exampleAlbumId");
    const album2 = albums.find((a) => a.album_id === "duplicateAlbumId");
  
    expect(album1).toBeDefined();
    expect(album1!.amount).toBe(1);
  
    expect(album2).toBeDefined();
    expect(album2!.amount).toBe(2);
  });
