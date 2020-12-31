
module.exports = (req, resp, next) => {
  if (!req.session.userId) {
    resp.status(403).send('not authenticated');
    return;
  }
  next();
}
