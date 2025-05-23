let valueSearch = document.getElementById('valueSearch');
let city = document.getElementById('city');
let temperature = document.getElementById('temperature');
let description = document.getElementById('description');
let cloud = document.getElementById('cloud');
let humidity = document.getElementById('humidity');
let pressure = document.getElementById('pressure');
let form = document.getElementById('form');
let main = document.getElementById('main');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (valueSearch.value.trim() !== '') {
        searchweather();
    }
});

let id = '1f0cd335a61c3dfb5c91fdc18c7987c6'; // Replace with your own API key if needed
let url = 'https://api.openweathermap.org/data/2.5/weather?units=metric&appid=' + id;

const searchweather = () => {
    fetch(url + '&q=' + valueSearch.value)
        .then(response => response.json())
        .then(data => {
            if (data.cod == 200) {
                city.querySelector('figcaption').innerText = data.name;
                city.querySelector('img').src = 'https://flagcdn.com/' + data.sys.country.toLowerCase() + '.png';

                temperature.querySelector('img').src = 'https://openweathermap.org/img/wn/' + data.weather[0].icon + '@4x.png';
                temperature.querySelector('figcaption span').innerText = Math.round(data.main.temp);
                description.innerText = data.weather[0].description;
                cloud.innerText = data.clouds.all;
                humidity.innerText = data.main.humidity;
                pressure.innerText = data.main.pressure;
            } else {
                main.classList.add('error');
                setTimeout(() => {
                    main.classList.remove('error');
                }, 1000);
            }
            valueSearch.value = '';
        })
        .catch(err => {
            console.error('Error fetching weather:', err);
        });
};

const initApp = () => {
    valueSearch.value = 'Washington';
    searchweather();
};
initApp();
