import axios from 'axios'
import dotenv from 'dotenv'
import { getAccessToken } from './getToken'

dotenv.config()

const BASE_URL = 'https://api.spotify.com/v1/albums'

export const getAlbumData = async (token: string, albumId: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/${albumId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return response.data
  } catch (error: any) {
    console.error(
      'Error obtaining album data:',
      error.response?.data || error.message
    )
  }
}
