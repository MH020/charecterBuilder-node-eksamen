import db from '../db/connection.js'
export function isLoggedIn (req, res, next) {
  if (req.session.user) {
    return next()
  }
  res.status(401).send({ message: 'you need to be logged in to acess this content' })
}

export function isAdmin (req, res, next) {
  if (req.session.user.role === 'ADMIN' || req.session.user.role === 'OWNER') {
    return next()
  }
  res.status(401).send({ message: 'only admins can do this' })
}

export function isOwner (req, res, next) {
  if (req.session.user.role === 'OWNER') {
    return next()
  }
  res.status(401).send({ message: 'only owners can do this' })
}
export function isPartOfCampaign () {
  return async (socket, next) => {
    try {
      const campaignId = socket.handshake.auth.campaignId
      const userId = socket.request.session.user.id

      if (!campaignId || !userId) {
        return next(new Error('acress denied'))
      }

      const result = await db.query(`
        SELECT 1 FROM campaign_players
        WHERE campaign_id = $1 AND player_id = $2
        UNION
        SELECT 1 FROM campaign WHERE id = $1 AND dm_id = $2
        `,
      [campaignId, userId]
      )

      if (result.rows.length === 0) {
        return next(new Error('Not a member of this campaign'))
      }

      socket.campaignId = campaignId
      socket.userId = userId

      next()
    } catch (err) {
      next(err)
    }
  }
}
