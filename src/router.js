const handlers = require('./handlers');


const router = (req, res) => {
  const url = req.url;
  if (url === '/') {
    handlers.handleRoutes(res, 'views/index.html');
  } else if (url.indexOf('/sunset') !== -1) {
    handlers.handleSunset(res, url, function(err, result) {
      if (err) {
        res.writeHead(500, "Content-Type:text/html");
        res.end("<h1>heather broke something on the back end</h1>");
      } else {
        res.writeHead(200, "Content-Type:text/html");
        res.end(result);
      }
    });
  } else if (url.indexOf('/views') !== -1) {
    handlers.handleRoutes(res, url);
  } else {
    res.writeHead(404, "Content-Type:text/html");
    res.end("<h1>404 not found</h1>");
  }

}

module.exports = router;
