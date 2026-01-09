import { Server } from 'socket.io'
import { isPartOfCampaign } from '../../middleware/auth.js'
import { sessionMiddleware } from '../../app.js'
import http from 'http'

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: ['http://localhost:8080'],
    credentials: true
  }
})

io.engine.use(sessionMiddleware)

// io.use(isPartOfCampaign)

socket.campaignId = 1
socket.userId = 1

io.on('connection', (socket) => {
  socket.join(`campaign:${socket.campaignId}`)

  socket.on('log:entry', (entry) => {
    io.to(`campaign:${socket.campaignId}`).emit('log:entry',
      { ...entry, userId: socket.userId })
  })

  socket.on('disconnect', () => {
    console.log('Socket disconnected', socket.id)
  })
})

// http server why ?
