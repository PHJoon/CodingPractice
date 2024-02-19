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
    const list = input.map((l) => l.toString().trim());
    solution(list);
    process.exit();
});

function solution(input) {
    const [seq_1, seq_2] = input;

    const dp = Array.from({length: seq_1.length + 1}, () => Array(seq_2.length + 1).fill(0));
    
    for (let i = 0; i < seq_1.length; i++) {
        for (let j = 0; j < seq_2.length; j++) {
            if (seq_1[i] == seq_2[j]) {
                dp[i + 1][j + 1] = dp[i][j] + 1;
            } else {
                dp[i + 1][j + 1] = Math.max(dp[i][j + 1], dp[i + 1][j]);
            }
        }
    }

    console.log(dp[seq_1.length][seq_2.length]);
}