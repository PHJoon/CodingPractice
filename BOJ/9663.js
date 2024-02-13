const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: fs.createReadStream("./예제.txt"),
    // input: process.stdin,
    output: process.stdout
});

const input = [];

rl.on('line', function(line) {
    input.push(line);
}).on('close', function() {
    const n = parseInt(input[0]);
    solution(n);
    process.exit();
});

function solution(n) {
    const res = [0];
    const board = Array(n).fill(-1);

    function setQueen(curIdx) {
        if (curIdx === n) {
            res[0] += 1;
            return ;
        }

        for (let i = 0; i < n; i++) {
            if (checkQueen(curIdx, i)) {
                board[curIdx] = i;
                setQueen(curIdx + 1);
                board[curIdx] = -1;
            }
        }
    }

    const dx = [-1, -1, 1, 1]; 
    const dy = [-1, 1, -1, 1];

    function checkDiagonal(curIdx, loc) {
        let nx, ny;
        for (let i = 0; i < 4; i++) {
            let coef = 1;
            while (1) {
                nx = curIdx + dx[i] * coef;
                ny = loc + dy[i] * coef;
                if (nx >= 0 && ny >= 0 && nx < n && ny < n) {
                    if (board[nx] === ny) {
                        return false;
                    }
                } else {
                    break;
                }
                coef++;
            }
        }
        return true;
    }

    function checkCross(curIdx, loc) {
        for (let i = 0; i < curIdx; i++) {
            if (board[i] === loc) {
                return false;
            }
        }
        return true;
    }

    function checkQueen(curIdx, loc) {
        if (!checkCross(curIdx, loc)) {
            return false;
        }
        if (!checkDiagonal(curIdx, loc)) {
            return false;
        }
        return true;
    }

    setQueen(0);

    console.log(res[0]);

}