// Particle system
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        particlesContainer.appendChild(particle);
    }
}

function searchWeather() {
    const city = document.getElementById('cityInput').value.toLowerCase().trim();
    const loading = document.getElementById('loading');
    const weatherCard = document.getElementById('weatherCard');

    if (!city) return;

    loading.style.display = 'block';
    weatherCard.style.display = 'none';

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=e8684cfc53879ef8fbbea77c86edec5c`)
        .then(res => {
            if (!res.ok) throw new Error("City not found");
            return res.json();
        })
        .then(data => {
            const weatherInfo = {
                temp: Math.round(data.main.temp),
                desc: data.weather[0].description,
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                visibility: data.visibility / 1000,
                feelsLike: Math.round(data.main.feels_like),
                icon: getWeatherIcon(data.weather[0].main),
                type: getWeatherType(data.weather[0].main),
                forecast: generateRandomForecast() // still random unless you want real forecast API
            };
            displayWeather(weatherInfo, city);
            updateBackground(weatherInfo.type);
        })
        .catch(() => {
            alert("City not found or API error!");
        })
        .finally(() => {
            loading.style.display = 'none';
            weatherCard.style.display = 'block';
        });
}


// Weather data simulation
const weatherData = {
    'new york': {
        temp: 22,
        desc: 'partly cloudy',
        humidity: 65,
        windSpeed: 12,
        visibility: 10,
        feelsLike: 25,
        icon: '⛅',
        type: 'cloudy',
        forecast: [
            { day: 'Tomorrow', icon: '☀️', temp: '25°/18°' },
            { day: 'Thursday', icon: '🌧️', temp: '20°/15°' },
            { day: 'Friday', icon: '⛅', temp: '23°/17°' },
            { day: 'Saturday', icon: '☀️', temp: '26°/19°' },
            { day: 'Sunday', icon: '🌤️', temp: '24°/16°' }
        ]
    },
    'london': {
        temp: 15,
        desc: 'light rain',
        humidity: 80,
        windSpeed: 8,
        visibility: 6,
        feelsLike: 13,
        icon: '🌧️',
        type: 'rainy',
        forecast: [
            { day: 'Tomorrow', icon: '🌧️', temp: '16°/12°' },
            { day: 'Thursday', icon: '⛅', temp: '18°/14°' },
            { day: 'Friday', icon: '🌤️', temp: '20°/15°' },
            { day: 'Saturday', icon: '☀️', temp: '22°/17°' },
            { day: 'Sunday', icon: '⛅', temp: '19°/14°' }
        ]
    },
    'tokyo': {
        temp: 28,
        desc: 'sunny',
        humidity: 45,
        windSpeed: 6,
        visibility: 15,
        feelsLike: 31,
        icon: '☀️',
        type: 'sunny',
        forecast: [
            { day: 'Tomorrow', icon: '☀️', temp: '30°/22°' },
            { day: 'Thursday', icon: '🌤️', temp: '27°/20°' },
            { day: 'Friday', icon: '⛅', temp: '25°/18°' },
            { day: 'Saturday', icon: '🌧️', temp: '23°/17°' },
            { day: 'Sunday', icon: '☀️', temp: '29°/21°' }
        ]
    },
    'paris': {
        temp: 18,
        desc: 'overcast',
        humidity: 70,
        windSpeed: 10,
        visibility: 8,
        feelsLike: 16,
        icon: '☁️',
        type: 'cloudy',
        forecast: [
            { day: 'Tomorrow', icon: '☁️', temp: '19°/13°' },
            { day: 'Thursday', icon: '🌦️', temp: '17°/11°' },
            { day: 'Friday', icon: '⛅', temp: '21°/15°' },
            { day: 'Saturday', icon: '☀️', temp: '24°/18°' },
            { day: 'Sunday', icon: '🌤️', temp: '22°/16°' }
        ]
    },
    'sydney': {
        temp: 25,
        desc: 'clear sky',
        humidity: 55,
        windSpeed: 15,
        visibility: 12,
        feelsLike: 27,
        icon: '☀️',
        type: 'sunny',
        forecast: [
            { day: 'Tomorrow', icon: '☀️', temp: '27°/19°' },
            { day: 'Thursday', icon: '🌤️', temp: '24°/17°' },
            { day: 'Friday', icon: '⛅', temp: '22°/16°' },
            { day: 'Saturday', icon: '🌧️', temp: '20°/14°' },
            { day: 'Sunday', icon: '☀️', temp: '26°/18°' }
        ]
    },
    'mumbai': {
        temp: 32,
        desc: 'hot and humid',
        humidity: 85,
        windSpeed: 7,
        visibility: 8,
        feelsLike: 38,
        icon: '🌡️',
        type: 'sunny',
        forecast: [
            { day: 'Tomorrow', icon: '🌡️', temp: '34°/28°' },
            { day: 'Thursday', icon: '🌧️', temp: '30°/26°' },
            { day: 'Friday', icon: '⛈️', temp: '28°/24°' },
            { day: 'Saturday', icon: '🌤️', temp: '31°/27°' },
            { day: 'Sunday', icon: '☀️', temp: '33°/29°' }
        ]
    },
    'delhi': {
        temp: 35,
        desc: 'very hot',
        humidity: 40,
        windSpeed: 5,
        visibility: 6,
        feelsLike: 42,
        icon: '🔥',
        type: 'sunny',
        forecast: [
            { day: 'Tomorrow', icon: '🔥', temp: '37°/30°' },
            { day: 'Thursday', icon: '☀️', temp: '36°/29°' },
            { day: 'Friday', icon: '🌤️', temp: '34°/28°' },
            { day: 'Saturday', icon: '⛅', temp: '32°/26°' },
            { day: 'Sunday', icon: '🌧️', temp: '29°/24°' }
        ]
    }
};

function searchWeather() {
    const city = document.getElementById('cityInput').value.toLowerCase().trim();
    const loading = document.getElementById('loading');
    const weatherCard = document.getElementById('weatherCard');
    
    if (!city) return;
    
    loading.style.display = 'block';
    weatherCard.style.display = 'none';
    
    setTimeout(() => {
        const data = weatherData[city];
        
        if (data) {
            displayWeather(data, city);
            updateBackground(data.type);
        } else {
            // Generate random weather for unknown cities
            const randomWeather = generateRandomWeather(city);
            displayWeather(randomWeather, city);
        }
        
        loading.style.display = 'none';
        weatherCard.style.display = 'block';
    }, 1500);
}

function generateRandomWeather(city) {
    const icons = ['☀️', '⛅', '☁️', '🌧️', '🌤️', '🌡️', '❄️'];
    const descriptions = ['sunny', 'partly cloudy', 'cloudy', 'light rain', 'clear sky', 'hot', 'cold'];
    const types = ['sunny', 'cloudy', 'rainy', 'snowy'];
    
    const randomIcon = icons[Math.floor(Math.random() * icons.length)];
    const randomDesc = descriptions[Math.floor(Math.random() * descriptions.length)];
    const randomType = types[Math.floor(Math.random() * types.length)];
    
    return {
        temp: Math.floor(Math.random() * 30) + 5,
        desc: randomDesc,
        humidity: Math.floor(Math.random() * 40) + 40,
        windSpeed: Math.floor(Math.random() * 20) + 5,
        visibility: Math.floor(Math.random() * 10) + 5,
        feelsLike: Math.floor(Math.random() * 30) + 5,
        icon: randomIcon,
        type: randomType,
        forecast: generateRandomForecast()
    };
}

function generateRandomForecast() {
    const days = ['Tomorrow', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const icons = ['☀️', '⛅', '☁️', '🌧️', '🌤️', '❄️', '⛈️'];
    
    return days.map(day => ({
        day: day,
        icon: icons[Math.floor(Math.random() * icons.length)],
        temp: `${Math.floor(Math.random() * 15) + 15}°/${Math.floor(Math.random() * 10) + 5}°`
    }));
}

function displayWeather(data, city) {
    document.getElementById('temperature').textContent = `${data.temp}°C`;
    document.getElementById('weatherDesc').textContent = data.desc;
    document.getElementById('location').textContent = city.charAt(0).toUpperCase() + city.slice(1);
    document.getElementById('weatherIcon').textContent = data.icon;
    document.getElementById('humidity').textContent = `${data.humidity}%`;
    document.getElementById('windSpeed').textContent = `${data.windSpeed} km/h`;
    document.getElementById('visibility').textContent = `${data.visibility} km`;
    document.getElementById('feelsLike').textContent = `${data.feelsLike}°C`;
    
    // Update forecast
    const forecastContainer = document.getElementById('forecast');
    forecastContainer.innerHTML = '';
    
    data.forecast.forEach(item => {
        const forecastItem = document.createElement('div');
        forecastItem.className = 'forecast-item';
        forecastItem.innerHTML = `
            <div class="forecast-day">${item.day}</div>
            <div class="forecast-icon">${item.icon}</div>
            <div class="forecast-temp">${item.temp}</div>
        `;
        forecastContainer.appendChild(forecastItem);
    });
}

function updateBackground(weatherType) {
    document.body.className = weatherType;
}

// Add some interactive features
function addInteractiveEffects() {
    // Add click effect to particles
    document.addEventListener('click', function(e) {
        createClickEffect(e.clientX, e.clientY);
    });
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            document.getElementById('cityInput').blur();
        }
    });
}

function createClickEffect(x, y) {
    const effect = document.createElement('div');
    effect.style.position = 'fixed';
    effect.style.left = x + 'px';
    effect.style.top = y + 'px';
    effect.style.width = '10px';
    effect.style.height = '10px';
    effect.style.background = 'rgba(255, 255, 255, 0.8)';
    effect.style.borderRadius = '50%';
    effect.style.pointerEvents = 'none';
    effect.style.zIndex = '1000';
    effect.style.animation = 'clickEffect 0.6s ease-out forwards';
    
    document.body.appendChild(effect);
    
    setTimeout(() => {
        document.body.removeChild(effect);
    }, 600);
}

// Add CSS for click effect
const style = document.createElement('style');
style.textContent = `
    @keyframes clickEffect {
        0% {
            transform: scale(1);
            opacity: 1;
        }
        100% {
            transform: scale(10);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Initialize particles
    createParticles();
    
    // Add interactive effects
    addInteractiveEffects();
    
    // Add event listeners
    document.getElementById('searchBtn').addEventListener('click', searchWeather);
    document.getElementById('cityInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchWeather();
        }
    });
    
    // Auto-load weather for demonstration
    setTimeout(() => {
        document.getElementById('cityInput').value = 'New York';
        searchWeather();
    }, 1000);
});