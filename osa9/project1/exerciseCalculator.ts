interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

interface ParseHours {
    testTarget: number;
    testHours: number[]
}

const parseArguments = (args: string[]): ParseHours => {
    const parsedArray = args.slice(3).map(h => parseFloat(h))
    if (isNaN(Number(args[2]))) {
        throw new Error('Provided values must be numbers!');
    }
    return {
        testTarget: Number(args[2]),
        testHours: parsedArray
    }
}

const rating = (average: number, target: number): 1 | 2 | 3 => {
    if (average > target) {
        return 3;
    } else if (target / average > 2) {
        return 1;
    } return 2;
}

const ratingDescription = (rating: number): string => {
    if (rating === 1) {
        return 'could be better';
    } else if (rating === 2) {
        return 'not too bad but could be better';
    } return 'excellent work';
}

const calculateExercises = (target: number, hours: number[]): Result => {
    let cumulativeHours = hours.reduce((cumulative, hours) => cumulative + hours, 0);
    let trainingDays = hours.reduce((cumulative, hours) => hours !== 0 ? cumulative + 1 : cumulative, 0);
    let average = cumulativeHours / hours.length;
    if (isNaN(Number(average))) {
        throw new Error('Provided values were not numbers!');
    }
    return {
        periodLength: hours.length,
        trainingDays: trainingDays,
        success: average > target,
        rating: rating(average, target),
        ratingDescription: ratingDescription(rating(average, target)),
        target: target,
        average: cumulativeHours / hours.length,
    }
}

try {
    const { testTarget, testHours } = parseArguments(process.argv);
    console.log(calculateExercises(testTarget, testHours));
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage)
}
