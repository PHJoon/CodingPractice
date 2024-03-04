const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: fs.createReadStream('./예제.txt'),
    // input: process.stdin,
    output: process.stdout
});

const input = [];

rl.on('line', function(line) {
    input.push(line);
}).on('close', function() {
    const list = input.map((l) => l.split(' ').map((el) => parseInt(el)));
    solution(list);
    process.exit();
});

function solution(input) {
    const [n] = input[0];
    const tri = Array(n);
    for (let i = 0; i < n; i++) {
        tri[i] = input[i + 1];
    }

    for (let i = 1; i < n; i++) {
        for (let j = 0; j <= i; j++) {
            if (j === 0) {
                tri[i][j] += tri[i - 1][j];
            } else if (j === i) {
                tri[i][j] += tri[i - 1][j - 1];
            } else {
                tri[i][j] += Math.max(tri[i - 1][j - 1], tri[i - 1][j]);
            }
        }
    }

    console.log(Math.max(...tri[n - 1]));
}