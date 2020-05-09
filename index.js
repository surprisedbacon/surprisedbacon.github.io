/*
req:
  1) workTime, restTime, reps
  2) code cleanup
  3) automation (repeated code instead of hardcode)
  */
 let BODY_STYLE, CLOCK, MSG, START_BUTTON, BEEP3_AUDIO, BEEP5_AUDIO, FANFARE_AUDIO;
 
 function domReady() {
   console.log('dom is ready');
   START_BUTTON = document.getElementById('start'); 
   START_BUTTON.focus();
   BUTTONS = document.getElementById('button-group');
   BODY_STYLE = document.getElementById('body').style;
   CLOCK = document.getElementById('clock');
   MSG = document.getElementById('msg');
   BEEP3_AUDIO = document.getElementById('beep3Audio');
   BEEP5_AUDIO = document.getElementById('beep5Audio');
   FANFARE_AUDIO = document.getElementById('fanfareAudio');
   const popup = document.getElementById('popup');
}

const routines = [{
  name: '0',
  type: 'countdown',
  time: 3
}, {
  name: '1',
  type: 'work',
  time: 45
}, {
  name: '2',
  type: 'rest',
  time: 15
}, {
  name: '3',
  type: 'work',
  time: 45
}, {
  name: '4',
  type: 'rest',
  time: 15
}, {
  name: '5',
  type: 'work',
  time: 60
// }, {
//   name: '6',
//   type: 'rest',
//   time: 15
}];

function hidePopup() {
  popup.style.display = 'none';
}

function showPopup() {
  popup.style.display = 'block';
}

function removeTask(e) {
  console.log('removed task');
  e.remove();
}

function addInterval() {
  const type = document.querySelector('input[name="type"]:checked').value;
  const time = document.querySelector('input[id="time"]').value

  const li = document.createElement("li");
  li.addEventListener('click', (me) => {
    // console.log('removed task', me);
    removeTask(me.target);
  })
  li.appendChild(document.createTextNode(`${type} for ${time}s`));
  document.getElementById("routine").appendChild(li);
}

async function startRoutine() {
  BUTTONS.style.display = 'none';
  MSG.innerHTML = '';
  CLOCK.innerHTML = '';

  for (let i=0; i<routines.length; i++) {
    const routine = routines[i];
    // console.log(`Routine ${routine.name} starts...`);
    await runChunk(routine);
  };
  
  FANFARE_AUDIO.play();
  BUTTONS.style.display = 'block';
  BODY_STYLE['background-color'] = '#A9DDD9';
  MSG.innerHTML = 'done!';
  START_BUTTON.focus();
}

/**
 * Runs a routine given the routine
 * @param {Object} routine - The routine object to run.
 * @param {string} routine.type - The type of interval.
 * @param {number} routine.time - The number of seconds to run.
 */
function runChunk(routine) {
  return new Promise((resolve) => {
    let counter = routine.time;
    
    if (routine.type === 'work') {
      BODY_STYLE['animation'] = routine.name === '1' ? 'blackred 1s' : 'bluered 1s';
      BODY_STYLE['background-color'] = '#E3493B';
      CLOCK.style['color'] = '#3A3A3C';
      MSG.style['color'] = '#3A3A3C';
      MSG.innerHTML = routine.type.toUpperCase();
      // console.log(`transition to red`);
    } else if (routine.type === 'rest') {
      BODY_STYLE['animation'] = 'redblue 1s';
      BODY_STYLE['background-color'] = '#23B5AF'
      CLOCK.style['color'] = '#3A3A3C';
      MSG.style['color'] = '#3A3A3C';
      MSG.innerHTML = routine.type.toUpperCase();
      // console.log(`transition to blue`);
    } else if (routine.type === 'countdown') {
      BEEP3_AUDIO.play();
      BODY_STYLE['background-color'] = '#3A3A3C';
      MSG.style['color'] = '#FFFAFA';
      MSG.innerHTML = 'Get Ready!';
      CLOCK.style['color'] = '#FFFAFA';
    }
    updateClock(counter, routine.type);

    const s = setInterval(function() {
      counter--;
      updateClock(counter, routine.type);
      // console.log(`${routine.type}(${routine.name}) - ${counter}`);

      if (counter === 5 && (routine.type === 'work' || routine.type === 'rest')) {
        BEEP5_AUDIO.play();
      }

      if (counter === 0) {
        clearInterval(s);
        resolve();
      }
    }, 1000);
  });
}

function updateClock(counter, type) {
  let minutes = Math.floor(counter / 60);
  let seconds = Math.floor(counter % 60);

  CLOCK.innerHTML = type === "countdown" ? counter : `${minutes}:${String(seconds).padStart(2, '0')}`;
}