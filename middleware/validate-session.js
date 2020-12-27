
module.exports = (req, resp, next) => {
  if (!req.session.email) {
    resp.status(403).send('not authenticated')
  }
  next();
}
