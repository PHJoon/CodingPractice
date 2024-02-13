const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: fs.createReadStream("./예제.txt"),
    // input: process.stdin,
    output: process.stdout
});

let input = [];

rl.on('line', function(line) {
    input.push(line);
}).on('close', function() {
    let list = input.map((l) => l.split(' ').map((el) => parseInt(el)));
    solution(list);
    process.exit();
});


function dp(n, sticker) {
    const arr = [Array(n + 1).fill(0), Array(n + 1).fill(0)];

    arr[0][1] = sticker[0][0];
    arr[1][1] = sticker[1][0];

    for (let i = 2; i <= n; i++) {
        arr[0][i] = Math.max(arr[1][i - 1], arr[1][i - 2]) + sticker[0][i - 1];
        arr[1][i] = Math.max(arr[0][i - 1], arr[0][i - 2]) + sticker[1][i - 1];
    }

    console.log(Math.max(arr[0][n], arr[1][n]));
}


function solution(input) {
    const [t] = input[0];

    for (let i = 0; i < t; i++) {
        const [n] = input[i * 3 + 1];
        const sticker = [[], []];
        sticker[0] = input[i * 3 + 2];
        sticker[1] = input[i * 3 + 3];
        dp(n, sticker);
    }
}