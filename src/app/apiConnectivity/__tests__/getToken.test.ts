import { describe, expect, it } from 'vitest'
import dotenv from 'dotenv'
import { getAccessToken } from '../getToken'

dotenv.config()

describe('Access Token', async () => {
  it('gets access token', async () => {
    const clientId = process.env.CLIENT_ID!
    const clientSecret = process.env.CLIENT_SECRET!

    const response = await getAccessToken(clientId, clientSecret)

    expect(response).not.toBe(undefined)
  })
})
