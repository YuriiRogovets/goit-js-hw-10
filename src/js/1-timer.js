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
let timerStarted = false;
console.log(timerStarted);
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
    console.log(userSelectedDate);
    console.log(Date.now());
    if (userSelectedDate > Date.now()) {
      btnEl.disabled = false;
      showMessage();
    }    
  },
};

const fp = flatpickr(inputEl, options);

function showMessage() {
  iziToast.show({
        title: 'Успіх',
        message: 'Операція виконана успішно!',
      });
}

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
   timerDays.textContent = `${days}`;
   timerHours.textContent = `${hours}`;
   timerMinutes.textContent = `${minutes}`;
   timerSeconds.textContent = `${seconds}`;
}


btnEl.addEventListener("click", isStartTimer)

function isStartTimer(event) {
  btnEl.disabled = true;
  
  
    const intervalId = setInterval(() => {
    const currentTime = Date.now(); // отримуємо поточний час
    const ms = userSelectedDate - currentTime; // отримуємо різницю в часі 
    const restTime = convertMs(ms); // перетворюємо кількість мілісекунд (різниця в часі) на обʼєкт з годинами, хвилинами та секундами
    updateTimer(restTime); // викликаємо функцію, яка запише дані в таймер
    if (ms === 0) {
        clearInterval(intervalId);
      }
      
    // if (ms <= 0) {
    //     clearInterval(intervalId);
    //     btnEl.disabled = false; // Робимо кнопку знову активною, коли таймер завершиться
    //     timerStarted = false; // Змінюємо стан таймера
    //   }
    }, 1000);
}
