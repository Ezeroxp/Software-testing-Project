import { describe, expect, it, beforeAll } from 'vitest'
import dotenv from 'dotenv'
import { getAlbumData } from '../getAlbumData'
import { getAccessToken } from '../getDataToken'

dotenv.config()

describe('getAlbumData', () => {
  const albumId = '4aawyAB9vmqN3uQ7FjRGTy'
  let accessToken: string

  beforeAll(async () => {
    const clientId = process.env.CLIENT_ID!
    const clientSecret = process.env.CLIENT_SECRET!

    accessToken = await getAccessToken(clientId, clientSecret)
  })

  it('obtains album data', async () => {
    const albumData = await getAlbumData(accessToken, albumId)

    expect(albumData).toBeDefined()
    expect(albumData.name).toBeDefined()
    expect(albumData.artists).toBeInstanceOf(Array)
  })

  it('does not obtain album data of nonexistent album', async () => {
    const fakeAlbumId = '1234567890abcdef'

    expect(await getAlbumData(accessToken, fakeAlbumId)).toThrow(Error)
  })

  it('does not obtain album data if token is invalid', async () => {
    expect(await getAlbumData('invalidToken', albumId)).toThrow(Error)
  })
})
