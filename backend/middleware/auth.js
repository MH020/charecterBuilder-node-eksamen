export function isLoggedIn (req, res, next) {
  if (req.session.user) {
    return next()
  }
  res.status(401).send({ message: 'you need to be logged in to acess this content' })
}



export function isAdmin (req, res, next) {
  if (req.session.user.role === "ADMIN") {
    return next()
  }
  res.status(401).send({ message: 'you need to be logged in to acess this content' })
}