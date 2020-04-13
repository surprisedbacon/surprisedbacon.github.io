function domReady() {
  console.log("dom is ready");
}

function toggleButton() {
  var button = document.getElementById('start');
  button.style.display = 'none';
  
  var demo = document.getElementById("demo");
  demo.innerHTML = "3m 0s";
  var distance = 5;

  // Update the count down every 1 second
  var x = setInterval(function() {
      console.log(distance);
    // Find the distance between now and the count down date
    --distance;
      
    // Time calculations for minutes and seconds
    var minutes = Math.floor(distance / 60);
    var seconds = Math.floor(distance % 60);
      
    // Output the result in an element with id="demo"
    demo.innerHTML = minutes + "m " + seconds + "s ";
      
    // Colour change at certain times
    if (distance === 135) {
      
    }
    // If the count down is over, write some text 
    if (distance === 0) {
      clearInterval(x);
      button.style.display = 'block';
      demo.innerHTML = "done!";
    }
  }, 1000);
  
}
