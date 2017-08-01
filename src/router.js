const handlers = require('./handlers');

const router = (req, res) => {
  const url = req.url;
  if (url === '/') {
    handlers.handleHomeRoute(res);
  } else if (url.indexOf('/sunset') !== -1) {
    handlers.handleSunset(res);
  } else if (url.indexOf('/views') !== -1) {
    handlers.handlePublic(res, url);
  } else {
    res.writeHead(404, "Content-Type:text/html");
    res.end("<h1>404 not found</h1>");
  }

}

module.exports = router;
