interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

export interface IParseHours {
    testTarget: number;
    testHours: number[]
}

export const parseArguments = (target: number, exercise_hours: number[]): IParseHours => {
    if (isNaN(target)) {
        throw new Error('malformatted parameters');
    }
    exercise_hours.forEach(hour => {
        if (typeof hour !== "number") {
            throw new Error('malformatted parameters');
        }
    });
    return {
        testTarget: Number(target),
        testHours: exercise_hours
    };
};

const rating = (average: number, target: number): 1 | 2 | 3 => {
    if (average > target) {
        return 3;
    } else if (target / average > 2) {
        return 1;
    } return 2;
};

const ratingDescription = (rating: number): string => {
    if (rating === 1) {
        return 'could be better';
    } else if (rating === 2) {
        return 'not too bad but could be better';
    } return 'excellent work';
};

export const calculateExercises = (target: number, hours: number[]): Result => {
    const cumulativeHours = hours.reduce((cumulative, hours) => cumulative + hours, 0);
    const trainingDays = hours.reduce((cumulative, hours) => hours !== 0 ? cumulative + 1 : cumulative, 0);
    const average = cumulativeHours / hours.length;
    /*if (isNaN(Number(average))) {
        throw new Error('Provided values were not numbers!');
    }*/
    return {
        periodLength: hours.length,
        trainingDays: trainingDays,
        success: average > target,
        rating: rating(average, target),
        ratingDescription: ratingDescription(rating(average, target)),
        target: target,
        average: cumulativeHours / hours.length,
    };
};
/*
try {
    const { testTarget, testHours } = parseArguments(process.argv);
    console.log(calculateExercises(testTarget, testHours));
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}
*/