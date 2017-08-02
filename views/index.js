// console.log("heather is sleepy");
var cityInput = document.getElementById('info');
var result = document.getElementById('result')

cityInput.addEventListener('submit', function(e) { //event listener for any change in input of starInput
  var cityName = document.getElementById('city-name').value; //please check if input is letters
  //if (cityName)

  var date = document.getElementById('date').value;
  e.preventDefault();
  document.getElementById("info").reset();
  var url = '/sunset?' + 'cityname=' + encodeURI(cityName) + '&date=' + date;
  console.log(url);
  var xhr = new XMLHttpRequest(); //create new xhr request
  xhr.onreadystatechange = function() {
    if (xhr.status === 200 && xhr.readyState === 4) {
      // var result = JSON.parse(xhr.response);
      result.innerText = xhr.response;
    }
  }
  xhr.open('GET', url); //open GET request
  xhr.send(); // send request
});
