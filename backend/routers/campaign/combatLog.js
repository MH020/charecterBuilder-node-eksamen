import { Server } from 'socket.io'
import { isPartOfCampaign } from '../../middleware/auth.js'
import { sessionMiddleware } from '../../app.js'

const io = new Server(server)

io.engine.use(sessionMiddleware);

io.use(isPartOfCampaign)


io.on('connection', (socket) => {

  socket.join(`campaign:${socket.campaignId}`);

  socket.on('log:entry', (entry) => {

    io.to(`campaign:${socket.campaignId}`).emit('log:entry', 
      {...entry, userId: socket.userId});
  });

  socket.on('disconnect', () => {
    console.log('Socket disconnected', socket.id)
  })
})
