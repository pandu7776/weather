const apiKey = 'c24bc653628742c2899161054250103'; // Replace with your WeatherAPI key

async function getWeather() {
    const location = document.getElementById('locationInput').value;

    if (!location) {
        alert('Please enter a location.');
        return;
    }

    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Location not found!');

        const data = await response.json();
        
        displayWeather(data);
        updateBackground(data.current.condition.text.toLowerCase());
        
    } catch (error) {
        alert(error.message);
        document.body.className = ''; // Reset background
        document.getElementById('weatherInfo').innerHTML = '';
    }
}

function updateBackground(condition) {
    // Reset classes
    document.body.className = '';

    // Apply a class based on the weather condition
    if (condition.includes('sunny') || condition.includes('clear')) {
        document.body.classList.add('sunny');
    } else if (condition.includes('cloud')) {
        document.body.classList.add('cloudy');
    } else if (condition.includes('rain')) {
        document.body.classList.add('rainy');
    } else if (condition.includes('snow')) {
        document.body.classList.add('snowy');
    } else {
        // Default fallback
        document.body.style.background = 'linear-gradient(to bottom, #83a4d4, #b6fbff)';
    }
}

function displayWeather(data) {
    const weatherInfo = `
        <h2>${data.location.name}, ${data.location.region}, ${data.location.country}</h2>
        <p><strong>Condition:</strong> ${data.current.condition.text}</p>
        <p><strong>Temperature:</strong> ${data.current.temp_c}°C (${data.current.temp_f}°F)</p>
        <img src="${data.current.condition.icon}" alt="${data.current.condition.text}">
        <p><strong>Wind:</strong> ${data.current.wind_kph} kph</p>
        <p><strong>Humidity:</strong> ${data.current.humidity}%</p>
        <p><strong>Cloud Cover:</strong> ${data.current.cloud}%</p>
     `;

     document.getElementById('weatherInfo').innerHTML = weatherInfo;
}
