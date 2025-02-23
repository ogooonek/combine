

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); 

const PORT = 3002;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');  
});

app.post('/calculate-bmi', (req, res) => {
    const { weight, height } = req.body;

    if (weight <= 0 || height <= 0) {
        return res.send('Please enter positive values for weight and height.');
    }

    const bmi = (weight / (height * height)).toFixed(2);
    let category = '';

    if (bmi < 18.5) {
        category = 'Underweight';
    } else if (bmi < 24.9) {
        category = 'Normal weight';
    } else if (bmi < 29.9) {
        category = 'Overweight';
    } else {
        category = 'Obesity';
    }

    res.send(`
        <h1>Your BMI: ${bmi}</h1>
        <p>Category: <span style="color:${categoryColor(category)}">${category}</span></p>
        <a href="/">Go back</a>
    `);
});

function categoryColor(category) {
    switch (category) {
        case 'Underweight': return 'blue';
        case 'Normal weight': return 'green';
        case 'Overweight': return 'yellow';
        case 'Obesity': return 'red';
        default: return 'black';
    }
}


