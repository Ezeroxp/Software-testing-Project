import fastify from 'fastify'
import fastifyStatic from '@fastify/static'
import path from 'path'

const server = fastify()

// Register the fastify-static plugin
server.register(fastifyStatic, {
  root: path.join(__dirname, 'frontend'),
  prefix: '/public/',
})

server.get('/ping', async (request, reply) => {
  return 'pong\n'
})

server.get('/', async (request, reply) => {
  // Return the content at the route /public/index.html
  return reply.redirect('/public/index.html')
})

const PORT = Number(process.env.PORT) || 3000
console.log('heroku port:' + Number(process.env.PORT))
server.listen({ port: PORT, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
