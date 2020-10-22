console.log('Client side javascript file is loaded!');

// Selecting from index.hbs
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const message1 = document.querySelector('#message-1');
const message2 = document.querySelector('#message-2');

// Submit event handler
weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = search.value;
  message1.textContent = 'Loading...';
  message2.textContent = '';
  // Fetching weather data
  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        message1.textContent = data.error;
        //message2.textContent = '';
      } else {
        message1.textContent = data.location;
        message2.textContent = data.forecast;
      }
    });
  });
});
