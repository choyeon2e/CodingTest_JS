function solution(numbers) {
    var answer = "";

    let stringArr = [];
    for (let i = 0; i < numbers.length; i++) {
        stringArr.push(numbers[i].toString());
    }
    stringArr.sort((a, b) => b + a - (a + b));

    for (let i = 0; i < stringArr.length; i++) {
        answer += stringArr[i];
    }

    if (answer[0] === "0") {
        return "0";
    }

    return answer;
}
