// console.log("heather is sleepy");
var cityInput = document.getElementById('info');
var result = document.getElementById('result')

cityInput.addEventListener('submit', function(e) { //event listener for any change in input of starInput
  e.preventDefault();
  document.getElementById("info").reset();
  var url = '/sunset?';
  var xhr = new XMLHttpRequest(); //create new xhr request
  xhr.onreadystatechange = function(){
    if(xhr.status === 200 && xhr.readyState === 4){
      // var result = JSON.parse(xhr.response);
      result.innerText = xhr.response;
    }
  }
  xhr.open('GET', url); //open GET request
  xhr.send(); // send request
});
