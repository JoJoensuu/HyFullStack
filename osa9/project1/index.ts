import { calculateBmi } from './bmiCalculator'
import express from 'express';

const app = express();

app.get(`/bmi`, (req, res) => {
    const { height, weight } = req.query;
    
    if (!height || !weight || isNaN(Number(height)) || isNaN(Number(weight))) {
        return res.status(400).send({ error: 'malformatted parameters'})
    }
    const bmiResult = calculateBmi(Number(height), Number(weight))
    return res.json({
        weight: weight,
        height: height,
        bmi: bmiResult
    })
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});