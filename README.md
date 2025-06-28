<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Forecastly - Dynamic Weather Experience</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="particles" id="particles"></div>
    
    <div class="container">
        <div class="header">
            <h1 class="logo">Forecastly</h1>
            <p class="subtitle">Experience Weather Like Never Before</p>
        </div>

        <div class="search-container">
            <div class="search-box">
                <input type="text" class="search-input" id="cityInput" placeholder="Enter city name...">
                <button class="search-btn" id="searchBtn">🔍</button>
            </div>
        </div>

        <div class="weather-card" id="weatherCard" style="display: none;">
            <div class="current-weather">
                <div class="weather-main">
                    <div class="temperature" id="temperature">--°</div>
                    <div class="weather-desc" id="weatherDesc">--</div>
                    <div class="location" id="location">--</div>
                </div>
                <div class="weather-icon" id="weatherIcon">🌤️</div>
            </div>

            <div class="weather-details" id="weatherDetails">
                <div class="detail-item">
                    <div class="detail-icon">💧</div>
                    <div class="detail-value" id="humidity">--%</div>
                    <div class="detail-label">Humidity</div>
                </div>
                <div class="detail-item">
                    <div class="detail-icon">💨</div>
                    <div class="detail-value" id="windSpeed">-- km/h</div>
                    <div class="detail-label">Wind Speed</div>
                </div>
                <div class="detail-item">
                    <div class="detail-icon">👁️</div>
                    <div class="detail-value" id="visibility">-- km</div>
                    <div class="detail-label">Visibility</div>
                </div>
                <div class="detail-item">
                    <div class="detail-icon">🌡️</div>
                    <div class="detail-value" id="feelsLike">--°</div>
                    <div class="detail-label">Feels Like</div>
                </div>
            </div>

            <div class="forecast" id="forecast"></div>
        </div>

        <div class="loading" id="loading" style="display: none;">
            <div class="spinner"></div>
            <p>Getting weather data...</p>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html># forecastly
Forecastly is a stylish weather app that shows real-time weather updates for any city using live API data. Built with HTML, CSS, and JavaScript, it features smooth visuals and a user-friendly interface.
