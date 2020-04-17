/*
req:
  1) workTime, restTime, reps
  2) code cleanup
  3) automation (repeated code instead of hardcode)
*/
let BODY_STYLE;
let CLOCK
let START_BUTTON;

function domReady() {
  console.log("dom is ready");
  START_BUTTON = document.getElementById('start'); 
  START_BUTTON.focus();
  BODY_STYLE = document.getElementById('body').style;
  CLOCK = document.getElementById('clock');
}

const routines = [{
  name: "1",
  type: "work",
  time: 5
}, {
  name: "2",
  type: "rest",
  time: 10
}, {
  name: "3",
  type: "work",
  time: 10
// }, {
//   name: "4",
//   type: "rest",
//   time: 15
// }, {
//   name: "5",
//   type: "work",
//   time: 45
// }, {
//   name: "6",
//   type: "rest",
  // time: 15
}];

function startRoutine() {
  START_BUTTON.style.display = 'none';

  let delay = 0;
  routines.forEach((routine, i) => {
    console.log(`Routine ${routine.name} starts in ${delay}ms...`);
    setTimeout(runChunk, delay, routine);
    delay += routine.time * 1000;
  });
}

/**
 * Runs a routine given the routine
 * @param {Object} routine - The routine object to run.
 * @param {string} routine.type - The type of interval.
 * @param {number} routine.time - The number of seconds to run.
 */
function runChunk(routine) {
  let counter = routine.time;
  let minutes = Math.floor(counter / 60);
  let seconds = Math.floor(counter % 60);

  CLOCK.innerHTML = `${minutes}:${String(seconds).padStart(2, '0')}`;
  const s = setInterval(function() {
    --counter;
    console.log(`${routine.name} - ${counter}`);
    
    minutes = Math.floor(counter / 60);
    seconds = Math.floor(counter % 60);
    CLOCK.innerHTML = `${minutes}:${String(seconds).padStart(2, '0')}`;
    // insert code here
    // if (counter === routine.time) {
      // }
      
      if (counter === 0) {
        if (routine.type === 'work') {
          BODY_STYLE['animation'] = 'redblue 1s';
        } else if (routine.type === 'rest') {
          BODY_STYLE['animation'] = 'bluered 1s';
        }
      }
      
      if (routine.type === 'work') {
        BODY_STYLE['background-color'] = '#E3493B';
      } else if (routine.type === 'rest') {
        BODY_STYLE['background-color'] = '#23B5AF'
      }
    if (counter === 0) {
      clearInterval(s);
    }
  }, 1000);
}


function toggleButton() {
  var button = document.getElementById('start');
  var bodyStyle = document.getElementById('body').style;
  var demoStyle = document.getElementById('demo').style;
  var demo = document.getElementById("demo");
  button.style.display = 'none';
  
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
      button.focus();
    }
  }, 1000);
  
}
