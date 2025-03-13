import querystring from 'node:querystring'
import { FastifyReply } from 'fastify'
import dotenv from 'dotenv'

dotenv.config()

export const getUserPermission = (clientId: string, reply: FastifyReply) => {
  var state = '1234567890abcd'
  var scope = 'user-read-recently-played'

  reply.redirect(
    'https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: clientId,
        scope: scope,
        redirect_uri: process.env.REDIRECT_URI,
        state: state,
      })
  )
}
