import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import izitoast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const inputEl = document.querySelector("#datetime-picker");
const btnEl = document.querySelector("[data-start]");
const timerDays = document.querySelector("[data-days]");
const timerHours = document.querySelector("[data-hours]");
const timerMinutes = document.querySelector("[data-minutes]");
const timerSeconds = document.querySelector("[data-seconds]");

let userSelectedDate;
btnEl.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
    minuteIncrement: 1,
  locale: {
    "firstDayOfWeek": 1 
  },

  onClose(selectedDates) {
    userSelectedDate = selectedDates[0].getTime();
    if (userSelectedDate < Date.now()) {
      btnEl.disabled = true;
      izitoast.show({
       message: "Please choose a date in the future",
       position: "topCenter",
       color: "red",
      
      });
    } else {
      btnEl.disabled = false;
    }
  },
};

flatpickr(inputEl, options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

function updateTimer({days, hours, minutes, seconds}){
 timerDays.textContent = `${String(days).padStart(2,"0")}`;
 timerHours.textContent = `${String(hours).padStart(2,"0")}`;
 timerMinutes.textContent = `${String(minutes).padStart(2,"0")}`;
 timerSeconds.textContent = `${String(seconds).padStart(2,"0")}`;
}


btnEl.addEventListener("click", isStartTimer)

function isStartTimer(event) {
  btnEl.disabled = true;
    
  const intervalId = setInterval(() => {
  const currentTime = Date.now(); // отримуємо поточний час
  const ms = userSelectedDate - currentTime; // отримуємо різницю в часі 
  const restTime = convertMs(ms); // перетворюємо кількість мілісекунд (різниця в часі) на обʼєкт з годинами, хвилинами та секундами
  updateTimer(restTime); // викликаємо функцію, яка запише дані в таймер
  if (ms <= 1000) {
      clearInterval(intervalId);
    }

  }, 1000);
}
