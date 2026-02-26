function calculatePhotoScore(persons, scoreMap) {
    let sum = 0;
    for (const person of persons) {
        sum += scoreMap[person] || 0;
    }
    return sum;
}

function solution(name, yearning, photo) {
    const scoreMap = {};
    name.forEach((n, index) => {
        scoreMap[n] = yearning[index];
    });

    return photo.map(p => calculatePhotoScore(p, scoreMap));
}