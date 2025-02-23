const express = require('express');
const qr = require('qr-image');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3005;

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

app.post('/generate', (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: 'URL обязателен' });
    }

    const qrCodePath = path.join(__dirname, 'public', 'qr-code.png');
    const qrCode = qr.image(url, { type: 'png' });

    qrCode.pipe(fs.createWriteStream(qrCodePath))
        .on('finish', () => {
            res.json({ qrImageUrl: '/qr-code.png' });
        })
        .on('error', (err) => {
            res.status(500).json({ error: 'Ошибка генерации QR-кода' });
        });

    fs.writeFile('input.txt', url, (err) => {
        if (err) console.error('Ошибка сохранения URL:', err);
    });
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
