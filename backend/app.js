import 'dotenv/config'
import express from 'express'
import path from 'path'
import helmet from 'helmet'
import { rateLimit } from 'express-rate-limit'
import session from 'express-session'
import { Server } from 'socket.io';
import http from 'http';


import authRouthes from './routers/users/authRoutes.js'
import skillsRoutes from './routers/skill/skillsRouter.js'
import apptitudesRouter from './routers/apptitudes/apptitudesRouter.js'
import weaponRouter from './routers/weapons/weaponsRouter.js'
import categoryRouter from './routers/items/categoryRoutes.js'
import availabilityRouter from './routers/items/availabilityRouter.js'
import weaponClassRouter from './routers/weapons/weaponClassRouter.js'
import weaponTraitRouter from './routers/weapons/weaponTraitRouter.js'
import itemsRouter from './routers/items/ItemsRouiters.js'
import armorRouter from './routers/armor/armorRoutes.js'
import craftsmanshipRouter from './routers/items/craftmanshipRouter.js'
import lineageRouter from './routers/characters/lineageRouter.js'
import characteristicsRouter from './routers/characters/characteristicRouter.js'
import raceRouter from './routers/characters/racesRouter.js'
import statlineRouter from './routers/characters/statlineRaceRouter.js'
import sizeROuter from './routers/characters/sizeRouter.js'
import talentsRouter from './routers/characters/talentsRouter.js'
import traitsRouter from './routers/characters/TraitsRouter.js'
import classPowers from './routers/classes/classPowersRouter.js'
import classRouter from './routers/classes/classRouter.js'
const app = express()

app.use(express.json())

app.use(express.static('./../frontend/dist'))

app.use(helmet())

export const sessionMiddleware = session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
});

app.use(sessionMiddleware);

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:8080"],
        credentials: true
    }
});

//socket

io.engine.use(sessionMiddleware);

//io.use(isPartOfCampaign)



io.on('connection', (socket) => {

    socket.campaignId = 1;
    socket.userId = 1;

  socket.join(`campaign:${socket.campaignId}`);

  socket.on('log:entry', (entry) => {
    console.log(entry)
    io.to(`campaign:${socket.campaignId}`).emit('log:entry', 
      {...entry, userId: socket.userId});
  });

  socket.on('disconnect', () => {
    console.log('Socket disconnected', socket.id)
  })
})


const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  ipv6Subnet: 56 // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
})

app.use(generalLimiter)

// skills

app.use(skillsRoutes)

// apptitudes

app.use(apptitudesRouter)

// weapons
app.use(weaponRouter)

app.use(weaponClassRouter)

app.use(weaponTraitRouter)

// items

app.use(itemsRouter)

app.use(categoryRouter)

app.use(availabilityRouter)

app.use(craftsmanshipRouter)

// armor

app.use(armorRouter)

// character

app.use(lineageRouter)

app.use(characteristicsRouter)

app.use(raceRouter)

app.use(sizeROuter)

app.use(statlineRouter)

app.use(talentsRouter)

app.use(traitsRouter)

//classes

app.use(classRouter)

app.use(classPowers)
// aouth
app.use(authRouthes)

app.get('/{*splat}', (req, res) => {
  res.sendFile(path.resolve('../frontend/dist/index.html'))
})

app.all('/{*splat}', (req, res) => {
  res.status(404).send({ data: "Didn't match with a route" })
})

const PORT = 8080
server.listen(PORT, () => console.log("Server is running on port", PORT));
