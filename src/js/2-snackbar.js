import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');

form.addEventListener('submit', event => {
  event.preventDefault();

  const delay = Number(form.elements.delay.value);
  const radioBtn = form.elements.state.value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (radioBtn === 'fulfilled') {
        resolve(`Fulfilled promise in ${delay}ms`);
      } else if (radioBtn === 'rejected') {
        reject(`Rejected promise in ${delay}ms`);
      }
    }, delay);
  });

  promise
    .then(value => {
      iziToast.success({
        message: value,
      });
    })
    .catch(error => {
      iziToast.error({
        message: error,
      });
    });

    form.reset();
});