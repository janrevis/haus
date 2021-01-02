
module.exports = (err, req, resp, next) => {
  console.log('stack trace, ', err.stack);
  resp.status(500).send("An unexpected error has occurred");
}
