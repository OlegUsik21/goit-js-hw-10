import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor((ms % hour) / minute);
  const seconds = Math.floor((ms % minute) / second);
    
  return { days, hours, minutes, seconds };
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      iziToast.show({
        message: 'Please choose a date in the future',
      });
        
      btnStart.disabled = true;
    } else {
      btnStart.disabled = false;
        userSelectedDate = selectedDates[0];
    }
  },
};

const input = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('[data-start]');
btnStart.disabled = true;
let userSelectedDate;

flatpickr(input, options);

btnStart.addEventListener('click', () => {
  const days = document.querySelector('[data-days]');
  const hours = document.querySelector('[data-hours]');
  const minutes = document.querySelector('[data-minutes]');
  const seconds = document.querySelector('[data-seconds]');

  btnStart.disabled = true;
  input.disabled = true;

  const interval = setInterval(() => {
    const dif = userSelectedDate -  Date.now();

    if (dif <= 0) {
      clearInterval(interval);
      input.disabled = false;
      btnStart.disabled = false;
      return;
    }

    const time = convertMs(dif);

    days.textContent = String(time.days).padStart(2, '0');
    hours.textContent = String(time.hours).padStart(2, '0');
    minutes.textContent = String(time.minutes).padStart(2, '0');
    seconds.textContent = String(time.seconds).padStart(2, '0');
  }, 1000);
});