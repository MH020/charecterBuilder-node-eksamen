import { Router } from 'express'
import auth from '../../util/encrypter.js'
import db from '../../db/connection.js'
import sendMail from '../../util/nodeMailer.js'
import crypto from 'crypto'
import { buildSingupEmail } from '../../util/emailPageBuilder.js'
import { rateLimit } from 'express-rate-limit'
import { isLoggedIn } from '../../middleware/auth.js'

const router = Router()

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 30,
  standardHeaders: 'draft-8',
  legacyHeaders: false
})

router.use(authLimiter)

router.get('/api/users/id', isLoggedIn, async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM "user" where id = $1', [req.session.user.id])
    const user = result.rows[0]

    return res.status(200).send({ username: user.username, email: user.email, role: user.role })
  } catch (error) {
    console.error(error)
    return res.status(500).send({ message: 'server error', error: error.message })
  }
})


router.get('/api/me', isLoggedIn, (req, res) => {
  res.status(200).send({
    user: req.session.user
  });
});

router.post('/api/login', async (req, res) => {
  const { password, email } = req.body
  const result = await db.query('SELECT * FROM "user" WHERE email = $1', [email])
  const user = result.rows[0]

  if (result.rows.length === 0 || !auth.validatePassword(password, user.password)) {
    return res.status(401).send({ message: 'incorrect' })
  }

  if (user.verified === 0) {
    return res.status(403).send({ message: 'you are not varrified yet' })
  }

  req.session.user = {
    id: user.id,
    name: user.username,
    email: user.email,
    role: user.role
  }
  return res.status(200).send({ message: 'login successful', user: req.session.user })
})

router.post('/api/users', async (req, res) => {
  try {
    const { username, password, email } = req.body

    if (!username || !password || !email) {
      return res.status(400).send({ message: 'missing fields' })
    }

    const usedEmail = await db.query('SELECT * FROM "user" WHERE email = $1', [email])
    if (usedEmail.rows.length > 0) {
      return res.status(409).send({ message: 'email allready in use' })
    }

    const verificationCode = crypto.randomBytes(3).toString('hex')

    const hashPassword = await auth.encryptPassword(password)

    await db.query(
      `INSERT INTO users (username, password, email, verified, verification_code)
             VALUES ($1, $2, $3, 0, $4)`,
      [username, hashPassword, email, verificationCode]
    )

    const singupHTML = buildSingupEmail(username, verificationCode)

    // email needs to be sent
    sendMail(email, 'vaify signup', 'welcome to the front soldier', singupHTML)

    return res.status(201).send({ message: 'User created successfully a email has been sent with the ferification code' })
  } catch (error) {
    console.error(error)
    return res.status(500).send({ message: 'server error', error: error.message })
  }
})

router.post('/api/vaify', async (req, res) => {
  try {
    const { verificationCode } = req.body
    const result = await db.query('SELECT * FROM "user" WHERE verification_code = $1', [verificationCode])
    const user = result.rows[0]

    if (result.length === 0 || user.verification_code !== verificationCode) {
      return res.status(401).send({ message: 'incorrect' })
    }

    if (user.verified === 1) {
      return res.status(403).send({ message: 'this "user" is allready varified' })
    }

    await db.query('UPDATE "user" SET verified = 1 WHERE verification_code = $1', [verificationCode])

    return res.status(200).send({ message: 'vaification successful' })
  } catch (error) {
    console.error(error)
    return res.status(500).send({ message: 'server error', error: error.message })
  }
})

export default router
