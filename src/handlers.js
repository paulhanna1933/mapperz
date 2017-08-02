const path = require('path');
const fs = require('fs');
const https = require('https');



const handleHomeRoute = (res) => {
  //path.join will adjust for diff OS
  const filePath = path.join(__dirname, "..", "views", "index.html");
  fs.readFile(filePath, (err, file) => {
    if (err) {
      console.log(err);
      res.writeHead(500, "Content-Type:text/html");
      res.end("<h1>Server error</h1>");
    } else {
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
    js: "application/javascript",
    ico: "image/x-icon"
  }
  const filePath = path.join(__dirname, "..", url);
  fs.readFile(filePath, (err, file) => {
    if (err) {
      console.log(err);
      res.writeHead(500, "Content-Type:text/html");
      res.end("<h1>Server error</h1>");
    } else {
      // console.log(file);
      res.writeHead(200, `Content-Type:${extensionType[extension]}`);
      res.end(file);
    }
  });
}

const handleSunset = (res, url) => {
  const cityName = url.split('&')[0].split('cityname=')[1];
  const date = url.split('date=')[1];
  //please filter out empty date input
  const googleUrl = `https://maps.googleapis.com/maps/api/geocode/json?&address=${cityName}`; //check for google api for no results
  https.get(googleUrl, (res) => {
    let error;
    // if (res.statusCode !== 200) {
    //   error = new Error('Request Failed.\n' + `statusCode:
    //     $ {
    //       res.statusCode
    //     }`);
    // }
    if (error) {
      console.log(error);
      return;
    }
    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => {
      rawData += chunk;
    });
    res.on('end', () => {
      const parsedResult = JSON.parse(rawData);
      if (parsedResult.results.length == 0) {
        console.log('There is such city');
      }
      //console.log(rawData);
    });
  }).on('error', (e) => {
    console.log(e);
  });

  //https://developers.google.com/maps/documentation/geocoding/intro
  //https://sunrise-sunset.org/api
  // res.end(googleUrl)



}

module.exports = {
  handleHomeRoute,
  handlePublic,
  handleSunset
}
