interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const rating = (average: number, target: number): 1 | 2 | 3 => {
    if (average > target) {
        return 3
    } else if (target / average > 2) {
        return 1
    } return 2
}

const ratingDescription = (rating: number): string => {
    if (rating === 1) {
        return 'could be better'
    } else if (rating === 2) {
        return 'not too bad but could be better'
    } return 'excellent work'
}

const calculateExercises = (hours: number[], target: number): Result => {
    let cumulativeHours = hours.reduce((cumulative, hours) => cumulative + hours, 0);
    let trainingDays = hours.reduce((cumulative, hours) => hours !== 0 ? cumulative + 1 : cumulative, 0);
    let average = cumulativeHours / hours.length;
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));