function solution(input) {
    const [r, c] = input[0].map((el) => parseInt(el));

    const board = Array(r);

    for (let i = 0; i < r; i++) {
        board[i] = input[i + 1][0];
    }

    const visited = Array(26).fill(false);
    let ret = 0;

    const a = [-1, 1, 0, 0];
    const b = [0, 0, -1, 1];

    function dfs(x, y, cnt) {
        ret = Math.max(ret, cnt);

        for (let i = 0; i < 4; i++) {
            const x_ = x + a[i];
            const y_ = y + b[i];
            if (x_ >= 0 && x_ < r && y_ >= 0 && y_ < c) {
                if (visited[board[x_][y_].charCodeAt(0) - 65] === false) {
                    visited[board[x_][y_].charCodeAt(0) - 65] = true;
                    dfs(x_, y_, cnt + 1);
                    visited[board[x_][y_].charCodeAt(0) - 65] = false;
                }
            }
        }
    }

    visited[board[0][0].charCodeAt(0) - 65] = true;
    dfs(0, 0, 1);

    console.log(ret);
}

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
    const list = input.map((l) => l.split(' '));
    solution(list);
    process.exit();
})