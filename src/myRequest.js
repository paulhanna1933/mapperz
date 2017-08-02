const https = require('https');

const apiRequest = (res, url, callback) => {
  https.get(url, (res)=>{
    let error;
    if (res.statusCode !== 200) {
      error = new Error('Request Failed.\n' + `statusCode:${res.statusCode}`);
    }
    if (error) {
      callback(error);
      return;
    }
    res.setEncoding('utf8');
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => {
      const parsedData = JSON.parse(data);
      callback(null, parsedData);
  });
}).on('error', (e) => {
    callback(e);
});
}

module.exports = apiRequest;
