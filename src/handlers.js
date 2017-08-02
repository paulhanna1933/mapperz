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
    ico: "image/x-icon",
    jpg: "image/jpg"

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

const handleSunset = (res, url, callback) => {
  const cityName = url.split('&')[0].split('cityname=')[1];
  let date = url.split('date=')[1];
  if (date.length === 0)
    date = "today";
  //please filter out empty date input
  const googleUrl = `https://maps.googleapis.com/maps/api/geocode/json?&address=${cityName}`; //check for google api for no results
  https.get(googleUrl, (res) => {
    let error;
    if (res.statusCode !== 200) {
      error = new Error('Request Failed.\n' + `statusCode:${res.statusCode}`);
    }
    if (error) {
      callback(error.message);
      return;
    }
    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => {
      rawData += chunk;
    });
    res.on('end', () => {
      console.log(rawData);
      const parsedResult = JSON.parse(rawData);

      if (parsedResult.results.length == 0) {
        callback(null, `you sure that's a valid location, buddy?`);
      } else {
        const lat = parsedResult.results[0].geometry.location.lat;
        const lng = parsedResult.results[0].geometry.location.lng;
        const sunUrl = `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=${date}`;
        https.get(sunUrl, (res) => {
          let error;
          if (res.statusCode !== 200) {
            error = new Error('Request Failed.\n' + `statusCode:${res.statusCode}`);
          }
          if (error) {
            callback(error.message);
            return;
          }
          res.setEncoding('utf8');
          let sunData = '';
          res.on('data', (chunk) => {
            sunData += chunk;
          });
          res.on('end', () => {
            const parsedSunData = JSON.parse(sunData);
            const sunrise = parsedSunData.results.sunrise;
            const sunset = parsedSunData.results.sunset;

            callback(null, `You are searching for ${decodeURI(cityName)}\nTime in UTC:\nsunrise:${sunrise}, sunset:${sunset}`);
          });
        }).on('error', (e) => {
          callback(e.message);
        });
      }
    })
  }).on('error', (e) => {
    callback(e.message);

  });
}

module.exports = {
  handleHomeRoute,
  handlePublic,
  handleSunset
}
