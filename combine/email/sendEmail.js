// // const nodemailer = require('nodemailer');

// // const transporter = nodemailer.createTransport({
// //   host: 'smtp-mail.outlook.com',  
// //   port: 587,  
// //   secure: false,  
// //   auth: {
// //     user: '230468@astanait.edu.kz', 
// //     pass: 'wexNw39llgWWm'  
// //   }
// // });

// // const mailOptions = {
// //   from: '230468@astanait.edu.kz',  
// //   to: '230468@astanait.edu.kz',  
// //   subject: 'Hello from Node.js using Outlook!',  
// //   text: 'This is a test email sent from Node.js using Outlook SMTP.'  
// // };

// // transporter.sendMail(mailOptions, (error, info) => {
// //   if (error) {
// //     return console.log('Error occurred:', error);
// //   }
// //   console.log('Email sent:', info.response);
// // });

// const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//   service: 'Outlook',
//   auth: {
//     user: '230468@astanait.edu.kz',  
//     pass: 'wexNw39llgWWm'      
//   }
// });

// const mailOptions = {
//   from: '230468@astanait.edu.kz',    
//   to: '230468@astanait.edu.kz',  
//   subject: 'Hello from Node.js using Outlook!',
//   text: 'This is a test email sent from Node.js using async/await and Outlook SMTP.'
// };

// async function sendEmail() {
//   try {
//     const info = await transporter.sendMail(mailOptions);
//     console.log('Email sent: ' + info.response);
//   } catch (error) {
//     console.log('Error occurred: ' + error);
//   }
// }

// sendEmail();

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3003;

app.use(express.static('public')); // Подключаем статические файлы (HTML, CSS)
app.use(express.urlencoded({ extended: true })); // Для обработки form-data
app.use(cors());

// Настройки SMTP
const transporter = nodemailer.createTransport({
    service: 'Outlook',
    auth: {
        user: '230468@astanait.edu.kz',
        pass: 'wexNw39llgWWm' 
    }
});

// Обработчик формы
app.post('/send-email', async (req, res) => {
    const { to, subject, message } = req.body;

    if (!to || !subject || !message) {
        return res.status(400).send('Required!');
    }

    const mailOptions = {
        from: '230468@astanait.edu.kz',
        to,
        subject,
        text: message
    };

    try {
        await transporter.sendMail(mailOptions);
        res.send('Email succesfully send!');
    } catch (error) {
        res.status(500).send('error: ' + error.message);
    }
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
