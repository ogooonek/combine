
const express = require('express');
const path = require('path'); // <-- Добавил импорт модуля path
const app = express();
const port = 5000;

// Настройка статических файлов
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Объект с соответствием маршрутов и портов API
const services = {
    log: 3004,
    "blog-api": 3001,
    bmi: 3002,
    email: 3003,
    newqr: 3005,
    "weather-api-app": 3006
};

// Редирект для каждого API
Object.entries(services).forEach(([name, port]) => {
    app.use(`/${name}`, (req, res) => {
        res.redirect(`http://localhost:${port}`);
    });
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});

