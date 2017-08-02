// console.log("heather is sleepy");
var cityInput = document.getElementById('info');
var result = document.getElementById('result')

cityInput.addEventListener('submit', function(e) { //event listener for any change in input of starInput
  e.preventDefault();

  var cityName = document.getElementById('city-name').value.trim();
  var date = document.getElementById('date').value;
  //please check if input is valid
  if(cityName.match("^[a-zA-Z0-9,\\s]+$")){
    result.innerText = "Loading..."
    document.getElementById("info").reset();
    var url = '/sunset?' + 'cityname=' + encodeURI(cityName) + '&date=' + date;
    console.log(url);
    var xhr = new XMLHttpRequest(); //create new xhr request
    xhr.onreadystatechange = function() {
      if (xhr.status === 200 && xhr.readyState === 4) {
        result.innerText = xhr.response;
      }
    }
    xhr.open('GET', url); //open GET request
    xhr.send(); // send request
  }else{
    result.innerText = "Your search contains speical characters or the format is not right, please make sure you input correctly";
  }

});
