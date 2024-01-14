import izitoast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const formEl = document.querySelector(".form")
// console.dir(formEl);


formEl.addEventListener("submit", (event) => {
    event.preventDefault()
   
    const delay = formEl.elements.delay.value;
    const stateValue = formEl.elements.state.value;
    
    const promis = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (stateValue === "fulfilled") {
                resolve(delay)
            }
            reject(delay)
        }, delay);

    })
    
    formEl.reset();

    promis.
    then((delay) => {
    izitoast.success({
        message: `✅ Fulfilled promise in ${delay} ms`,
        color: "green",
        icon: "",
        position: "topCenter",
    });
    })
    .catch((delay) => {
    izitoast.error({
        message: `❌ Rejected promise in ${delay} ms`,
        color: "#ff0000",
        icon: "",
        position: "topCenter",
    });
    })
    .finally();
});
