import fastify, { FastifyRequest } from 'fastify'
import fastifyStatic from '@fastify/static'
import path from 'path'
import dotenv from 'dotenv'
import { getUserPermission } from './apiConnectivity/getUserPermision'
import { getRecentlyPlayed } from './apiConnectivity/getRecentlyPlayed'
import { getUserToken } from './apiConnectivity/getUserToken'
import {
  addAlbums,
  createDatabase,
  initializeDatabase,
} from './database/database'
dotenv.config()
const server = fastify()

let userCode: string

// Register the fastify-static plugin
server.register(fastifyStatic, {
  root: path.join(__dirname, 'frontend'),
  prefix: '/public/',
})

server.get(
  '/',
  async (request: FastifyRequest<{ Querystring: { code: string } }>, reply) => {
    userCode = request.query.code
    if (userCode && process.env.CLIENT_ID && process.env.CLIENT_SECRET) {
      const accessToken = await getUserToken(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        userCode
      )

      const albums = await getRecentlyPlayed(accessToken)
      await addAlbums(albums)
    }

    return reply.redirect('/public/index.html')
  }
)

server.get('/userPermission', async (request, reply) => {
  if (process.env.CLIENT_ID === undefined)
    return { error: 'APP CLIENT_ID required' }

  getUserPermission(process.env.CLIENT_ID, reply)
})

const PORT = Number(process.env.PORT) || 3000

server.listen({ port: PORT, host: '0.0.0.0' }, async (err, address) => {
  createDatabase()
  await initializeDatabase()
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
