const path = require('path');
const fs = require('fs');

const handleHomeRoute = (res) => {
  //path.join will adjust for diff OS
  const filePath = path.join(__dirname, "..", "views", "index.html");
  fs.readFile(filePath, (err, file)=>{
    if(err){
      console.log(err);
      res.writeHead(500, "Content-Type:text/html");
      res.end("<h1>Server error</h1>");
    }
    else {
      res.writeHead(200, "Content-Type:text/html");
      res.end(file);
    }
  });
}

const handlePublic = (res, url) => {
  const extension = url.split('.')[1];
  const extensionType = {
    html: "text/html",
    css: "text/css",
    js:"application/javascript",
    ico: "image/x-icon"
  }
  const filePath = path.join(__dirname,"..",url);
  fs.readFile(filePath,(err, file) => {
    if(err){
      console.log(err);
      res.writeHead(500, "Content-Type:text/html");
      res.end("<h1>Server error</h1>");
    }
    else {
      // console.log(file);
      res.writeHead(200, `Content-Type:${extensionType[extension]}`);
      res.end(file);
    }
  });
}

//const handleSunset

module.exports = {
  handleHomeRoute,
  handlePublic,
  // handleSunset
}
