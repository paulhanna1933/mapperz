const path = require('path');
const fs = require('fs');
const https = require('https');
const apiRequest = require("./myRequest");


const handleRoutes = (res, url) => {
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
//make function
const handleSunset = (res, url, callback) => {
  const cityName = url.split('&')[0].split('cityname=')[1];
  let date = url.split('date=')[1];
  if (date && date.length === 0)
    date = "today";
  //please filter out empty date input
  const googleUrl = `https://maps.googleapis.com/maps/api/geocode/json?&address=${cityName}`; //check for google api for no results
  apiRequest(res, googleUrl, (err, data) => {
    if (data.results.length == 0) {
      callback(null, `you sure that's a valid location, buddy?`);
    } else {
      //console.log(data);
      const lat = data.results[0].geometry.location.lat;
      const lng = data.results[0].geometry.location.lng;
      const sunUrl = `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=${date}`;
      apiRequest(res, sunUrl, (err, data) => {
        if (err) {
          callback(err);
          return;
        }
        const sunrise = data.results.sunrise;
        const sunset = data.results.sunset;
        callback(null, `You are searching for ${decodeURI(cityName)}\nTime in UTC:\nsunrise:${sunrise}, sunset:${sunset}`);
      });
    }
  });
}

module.exports = {
  handleRoutes,
  handleSunset
}
