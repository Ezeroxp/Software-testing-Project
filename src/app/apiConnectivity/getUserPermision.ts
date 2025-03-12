import querystring from 'node:querystring'
import { FastifyReply } from 'fastify'

export const getUserPermission = (clientId: string, reply: FastifyReply) => {
  var state = '1234567890abcd'
  var scope = 'user-read-recently-played'

  reply.redirect(
    'https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: clientId,
        scope: scope,
        redirect_uri: 'http://localhost:3000',
        state: state,
      })
  )
}
