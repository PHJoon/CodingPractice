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
    const [n, m] = input[0];
    const graph = Array(n);
    const dp = Array.from({length: n + 1}, () => Array(n + 1).fill(0));

    for (let i = 0; i < n; i++) {
        graph[i] = input[i + 1];
    }

    function sum_dp() {
        for (let i = 1; i <= n; i++) {
            for (let j = 1; j <= n; j++) {
                dp[i][j] = graph[i - 1][j - 1] + dp[i - 1][j] + dp[i][j - 1] - dp[i - 1][j - 1];
            }
        }
    }

    function get_sum(input) {
        const [x1, y1, x2, y2] = input;
        return dp[x2][y2] - dp[x2][y1 - 1] - dp[x1 - 1][y2] + dp[x1 - 1][y1 - 1];
    }
    
    sum_dp();

    let ret = [];
    for (let i = 0; i < m; i++) {
        ret.push(get_sum(input[i + 1 + n]));
    }

    console.log(ret.join('\n'));
}