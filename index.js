function domReady() {
  console.log("dom is ready");
}

function toggleButton() {
  var button = document.getElementById('start');
  var bodyStyle = document.getElementById('body').style;
  button.style.display = 'none';
  
  var demo = document.getElementById("demo");
  bodyStyle['background-color'] = '#E3493B'
  demo.innerHTML = "3:00";
  var distance = 180;

  // Update the count down every 1 second
  var x = setInterval(function() {
    // Find the distance between now and the count down date
    --distance;
    console.log(distance);
      
    // Time calculations for minutes and seconds
    var minutes = Math.floor(distance / 60);
    var seconds = Math.floor(distance % 60);
      
    // Output the result in an element with id="demo"
    if (seconds >= 10) {
      demo.innerHTML = minutes + ":" + seconds;
    // } else if (seconds < 1 && minutes < 0) {
    //   debugger;  
    } else {
      demo.innerHTML = minutes + ":0" + seconds;
    }
      
    // Colour change at certain times
    if (distance === 135 || distance === 75 || distance === 15) { //automate process: -0:45,then -1:00, -1:00, etc
      bodyStyle['animation'] = 'redblue 1s';
    }

    if (distance === 14 || distance === 134 || distance === 74) {
      bodyStyle['animation'] = '';
      bodyStyle['background-color'] = "#23B5AF";
    }

    if (distance === 119 || distance === 59) {
      bodyStyle['background-color'] = '#E3493B'
    }

    if (distance === 120 || distance === 60) {
      bodyStyle['animation'] = 'bluered 1s'
    };
    // If the count down is over, write some text 
    if (distance === 0) {
      clearInterval(x);
      button.style.display = 'block';
      demo.innerHTML = "done!";
      bodyStyle['background-color'] = '#A9DDD9'
    }
  }, 1000);
  
}
