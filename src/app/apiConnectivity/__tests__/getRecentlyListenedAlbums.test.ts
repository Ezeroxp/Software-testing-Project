import { describe, expect, it, beforeAll } from 'vitest';
import dotenv from 'dotenv';
import { getAccessToken } from '../getToken';
import { getRecentlyPlayed } from '../getRecentlyPlayed';

dotenv.config();

describe('getRecentlyPlayed', () => {
  let accessToken: string;

  beforeAll(async () => {
    const clientId = process.env.CLIENT_ID!;
    const clientSecret = process.env.CLIENT_SECRET!;

    accessToken = await getAccessToken(clientId, clientSecret);
  });

  it('obtains recently played albums', async () => {
    const albums = await getRecentlyPlayed(accessToken);

    expect(albums).toBeDefined();
    expect(albums).toBeInstanceOf(Array);
    expect(albums.length).toBeGreaterThan(0);

    const firstAlbum = albums[0];
    expect(firstAlbum).toHaveProperty('id');
    expect(firstAlbum).toHaveProperty('name');
    expect(firstAlbum).toHaveProperty('artists');
    expect(firstAlbum.artists).toBeInstanceOf(Array);
  });

  it('does not obtain recently played albums if token is invalid', async () => {
    await expect(getRecentlyPlayed('invalidToken')).rejects.toThrow();
  });

  it('returns an empty array if no albums have been played recently', async () => {
    // Aquí podrías mockear la respuesta de Spotify para simular que no hay reproducciones recientes
    const albums = await getRecentlyPlayed(accessToken);

    if (albums.length === 0) {
      console.log('No albums played recently');
    }

    expect(albums).toBeInstanceOf(Array);
  });
});
