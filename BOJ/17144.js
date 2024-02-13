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

function solution(input) {
    let [r, c, t] = input[0];
    
    const room = Array(r);
    for (let i = 0; i < r; i++) {
        room[i] = input[i + 1];
    }

    const cleaner = [];

    function dust_spread() {
        for (let i = 0; i < r; i++) {
            for (let j = 0; j < c; j++) {
                if (room[i][j] > 0) {
                    spread(i, j, room[i][j]);
                } else if (room[i][j] == -1) {
                    cleaner.push(i);
                }
            }
        }
    }
    
    const dx = [-1, 1, 0, 0];
    const dy = [0, 0, -1, 1];
    let dust_exist = [];

    function spread(x, y, dust) {
        let nx, ny;
        let cnt = 0;
        for (let i = 0; i < 4; i++) {
            nx = x + dx[i];
            ny = y + dy[i];

            if (nx >= 0 && ny >= 0 && nx < r && ny < c) {
                if (room[nx][ny] !== -1) {
                    dust_exist.push([nx, ny, Math.floor(dust / 5)]);
                    cnt++;
                }
            }
        }
        if (cnt) {
            room[x][y] -= Math.floor(dust / 5) * cnt;
        }
    }

    function cleaner_work() {
        let [top, bottom] = cleaner;

        // cleaner에 빨려들어가는 것으로 계산
        // down
        for (let i = top - 1; i > 0; i--) {
            room[i][0] = room[i - 1][0];
        }
        // left
        for (let i = 0; i < c - 1; i++) {
            room[0][i] = room[0][i + 1];
        }
        // up
        for (let i = 0; i < top; i++) {
            room[i][c - 1] = room[i + 1][c - 1];
        }
        // right
        for (let i = c - 1; i > 0; i--) {
            room[top][i] = room[top][i - 1];
        }
        room[top][1] = 0;

        // up
        for (let i = bottom + 1; i < r - 1; i++) {
            room[i][0] = room[i + 1][0];
        }
        // left
        for (let i = 0; i < c - 1; i++) {
            room[r - 1][i] = room[r - 1][i + 1];
        }
        // down
        for (let i = r - 1; i > bottom; i--) {
            room[i][c - 1] = room[i - 1][c - 1];
        }
        // right
        for (let i = c - 1; i > 0; i--) {
            room[bottom][i] = room[bottom][i - 1];
        }
        room[bottom][1] = 0;
    }

    while (t) {
        dust_exist = [];
        dust_spread();

        for (let ex of dust_exist) {
            const [x, y, d] = ex;
            room[x][y] += d;
        }
        cleaner_work();
        t--;
    }

    let res = 0;
    for (let r of room) {
        for (let el of r) {
            if (el !== -1) {
                res += el;
            }
        }
    }

    console.log(res);
}