import { Buffer } from 'buffer'
import axios from 'axios'
import qs from 'qs'
import dotenv from 'dotenv'

dotenv.config()

const url = 'https://accounts.spotify.com/api/token'

export const getUserToken = async (
  clientId: string,
  clientSecret: string,
  userCode: string
): Promise<string> => {
  try {
    const data = qs.stringify({
      grant_type: 'authorization_code',
      code: userCode,
      redirect_uri: process.env.REDIRECT_URI,
    })

    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization:
          'Basic ' +
          Buffer.from(clientId + ':' + clientSecret).toString('base64'),
      },
    })

    const { access_token } = await response.data
    return access_token
  } catch (_) {
    throw new Error('Error obtaining token')
  }
}
