const decrementButton = document.querySelector('.decrement');
const incrementButton = document.querySelector('.increment');
const inputField = document.querySelector('.value');

decrementButton.addEventListener('click', () => {
  let currentValue = parseInt(inputField.value);
  if (currentValue > 0) {
    inputField.value = currentValue - 1;
  }
});

incrementButton.addEventListener('click', () => {
  let currentValue = parseInt(inputField.value);
  inputField.value = currentValue + 1;
});
