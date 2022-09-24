import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  datePicker: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('[data-start]'),
  inpDays: document.querySelector('[data-days]'),
  inpHours: document.querySelector('[data-hours]'),
  inpMin: document.querySelector('[data-minutes]'),
  inpSec: document.querySelector('[data-seconds]'),
  boxTimerStyle: document.querySelector('.timer'),
};

function addStyle(el) {
  el.style.display = 'flex';
  el.style.gap = '30px';

  for (const i of el.children) {
    i.style.display = 'flex';
    i.style.flexDirection = 'column';

    i.firstElementChild.style.fontSize = '40px';
  }
}

addStyle(refs.boxTimerStyle);

// Деактивация кнопки Start
refs.btnStart.setAttribute('disabled', true);

// counter input date
let counterPicker = null;
let carrentTime = 0;
let restOfTime = '';

// настройки flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    checkValidTime(selectedDates[0].getTime(), Date.now());
    carrentTime = selectedDates[0].getTime();
  },
};

// check valid time
function checkValidTime(carrent, choese) {
  if (carrent < choese) {
    refs.btnStart.setAttribute('disabled', true);
    Notiflix.Notify.failure('Please choose a date in the future');
    return;
  }

  refs.btnStart.removeAttribute('disabled');
  restOfTime = carrent - choese;
  const { days, hours, minutes, seconds } = convertMs(restOfTime);

  updateTimer(days, hours, minutes, seconds);
}

// connection flatpickr
refs.datePicker.flatpickr(options);

refs.btnStart.addEventListener('click', () => {
  refs.btnStart.setAttribute('disabled', true);

  counterPicker = setInterval(() => {
    if (carrentTime - Date.now() > 1000) {
      const { days, hours, minutes, seconds } = convertMs(
        carrentTime - Date.now()
      );

      updateTimer(days, hours, minutes, seconds);
    } else {
      clearInterval(counterPicker);
      refs.inpSec.textContent = '00';
    }
  }, 1000);
});

// update Timer
function updateTimer(days, hours, minutes, seconds) {
  refs.inpDays.textContent = addLeadingZero(days);
  refs.inpHours.textContent = addLeadingZero(hours);
  refs.inpMin.textContent = addLeadingZero(minutes);
  refs.inpSec.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

//time conversion
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
