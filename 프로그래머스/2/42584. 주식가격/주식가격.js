/**
 * 가격이 떨어지지않은 기간은 몇초?
 **/

function solution(prices) {
    const totalT = prices.length;
    const priceStack = new Array(totalT).fill(0);

    for (let i = 0; i < totalT; i++) {
        for (let j = i + 1; j < totalT; j++) {
            priceStack[i]++;
            if (prices[i] > prices[j]) {
                break;
            }
        }
    }
    return priceStack;
}
