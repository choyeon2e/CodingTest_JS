const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : './input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n');

for (let i=0; i<input.length; i++){
    input[i] = input[i].split(' ').map(item=>+item);
    if (input[i][0]=== 0) break;
    input[i].sort((a,b)=>{
        return a-b;
    });


    if (input[i][0]**2+input[i][1]**2 === input[i][2]**2){
        console.log("right")
    } else {
        console.log("wrong");
    }
}


