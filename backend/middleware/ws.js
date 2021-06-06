module.exports = (ws) => {
  return (req, res, next) => {
    req.ws = ws;
    next()
  }
}