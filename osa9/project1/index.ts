import { calculateBmi } from './bmiCalculator';
import { parseArguments } from './exerciseCalculator';
import { calculateExercises } from './exerciseCalculator';

import express from 'express';

const app = express();
app.use(express.json());

app.get(`/bmi`, (req, res) => {
    const { height, weight } = req.query;
    
    if (!height || !weight || isNaN(Number(height)) || isNaN(Number(weight))) {
        return res.status(400).send({ error: 'malformatted parameters'});
    }
    const bmiResult = calculateBmi(Number(height), Number(weight));
    return res.json({
        weight: weight,
        height: height,
        bmi: bmiResult
    });
});

app.post('/exercises', (req, res) => {
    
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;
    if (!daily_exercises || !target) {
        return res.status(400).send({ error: 'parameters missing'} );
    }
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const { testTarget, testHours } = parseArguments(target, daily_exercises);
    const result = calculateExercises(testTarget, testHours);
    return res.send(result);
    } catch(error) {
        return res.status(400).send({ error: 'malformatted parameters'} );
    }
});

const PORT = 3002;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});