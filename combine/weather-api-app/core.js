const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const PORT = 3006;

app.use(express.static('public')); 


app.get('/weather', async (req, res) => {
    const city = req.query.city || 'London';
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    try {
        const response = await axios.get(url);
        const data = response.data;
        res.json({
            temperature: data.main.temp,
            description: data.weather[0].description,
            icon: data.weather[0].icon,
            coordinates: data.coord,
            feels_like: data.main.feels_like,
            humidity: data.main.humidity,
            pressure: data.main.pressure,
            wind_speed: data.wind.speed,
            country: data.sys.country,
            rain: data.rain ? data.rain['3h'] : 'No rain',
        });
    } catch (error) {
        res.status(500).json({ error: 'Ошибка' });
    }
});

app.get('/timezone', async (req, res) => {
    const { lat, lon } = req.query;
    const apiKey = process.env.TIMEZONEDB_API_KEY;
    const url = `http://api.timezonedb.com/v2.1/get-time-zone?key=${apiKey}&format=json&by=position&lat=${lat}&lng=${lon}`;
    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка' });
    }
});

app.get('/news', async (req, res) => {
    const city = req.query.city || 'London';
    const apiKey = process.env.NEWS_API_KEY;
    const url = `https://newsapi.org/v2/everything?q=${city}&apiKey=${apiKey}`;
    try {
        const response = await axios.get(url);
        res.json(response.data.articles);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка' });
    }
});





app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
