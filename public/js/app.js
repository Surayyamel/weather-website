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
  document.getElementById('searchbox').value = '';

  // Fetching weather data
  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        message1.textContent = data.error;
        message2.textContent = '';
      } else {
        // Inserting the forecast data into the hbs
        message1.textContent = data.location;
        message2.textContent = data.forecast;
       

        // Grabbing the SVGs
        const rainSvg = document.getElementById('rain-svg');
        const sunnySvg = document.getElementById('sunny-svg');
        const cloudySvg = document.getElementById('cloudy-svg');

        const forecast = data.forecast.toLowerCase();

        // Checking for different weather types to show different SVGs
        if (forecast.includes('cloudy') || forecast.includes('fog') || forecast.includes('smoke') || forecast.includes('overcast') || forecast.includes('mist')) {
          rainSvg.classList.add('disapear');
          sunnySvg.classList.add('disapear');
          cloudySvg.classList.remove('disapear');
          

        } else if (forecast.includes('sunny') || forecast.includes('clear')) {
          rainSvg.classList.add('disapear');
          cloudySvg.classList.add('disapear');
          sunnySvg.classList.remove('disapear');
          

        } else if (forecast.includes('rain') || forecast.includes('drizzle')) {
          sunnySvg.classList.add('disapear');
          cloudySvg.classList.add('disapear');
          rainSvg.classList.remove('disapear');
         
        }
      }
    });
  });
});
