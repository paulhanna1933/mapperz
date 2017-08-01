// console.log("heather is sleepy");
var cityInput = document.getElementById('city-name'); // get id star-name from html
starInput.addEventListener('submit', function(e) { //event listener for any change in input of starInput

  var inputString = e.target.value.trim();
  console.log(inputString);
  var url = '/sunset?' + inputString;

  var xhr = new XMLHttpRequest(); //create new xhr request
  xhr.addEventListener("load", function(e){
    console.log(e);
  })
  xhr.open('GET', url); //open GET request
  xhr.send(); // send request
}
