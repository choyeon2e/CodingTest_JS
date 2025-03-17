const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n');

let [y1,m1,d1] = input[0].split(" ").map(Number);
let [y2,m2,d2] = input[1].split(" ").map(Number);

function isLeapYear(year){  //윤년이면 true, 평년이면 false
    if ((year%4===0 && year%100!==0) || year%400===0){
        return true;
    } else {
        false;
    }
}

const daysInMonth = [
    0,31,28,31,30,31,30,31,31,30,31,30,31
];

function totalDays(y,m,d){  //day수 계산
    let result = 0;

    for (let year=1; year<y; year++){    //1년부터 y-1년까지
        result += isLeapYear(year) ? 366 : 365;    //윤년이면 366일, 아니면 365일
    }

    for (let month=1; month<m; month++){
        result += daysInMonth[month];

        if (isLeapYear(y) && month===2){
            result+=1;
        }
    }

    result+=d;

    return result;
}

const day1 = totalDays(y1,m1,d1);
const day2 = totalDays(y2,m2,d2);

if (y2-y1 > 1000 || (y2-y1===1000) && (m2>m1 || (m2===m1 && d2>=d1))){
    console.log("gg");
} else {
    console.log(`D-${day2-day1}`);
}