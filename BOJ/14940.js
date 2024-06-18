const readline = require('readline');
const fs = require('fs');
const { resolve } = require('path');

const rl = readline.createInterface({
  input: fs.createReadStream('./예제.txt'),
  // input: process.stdin,
  output: process.stdout
});

let n, m;
const arr = [];

rl.on('line', function (line) {
  inputListen(line);
}).on('close', function () {
  solution();
  process.exit();
});

function inputListen(line) {
  if (line === '') {
    rl.close();
  }
  if (!n) {
    [n, m] = line.split(' ').map(Number);
  } else {
    arr.push(line.split(' ').map(Number));
  }
}

function solution() {
  const result = Array.from(Array(n), () => Array(m).fill(-1));
  
  let sX, sY;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (arr[i][j] === 2) {
        sX = i;
        sY = j;
      } else if (arr[i][j] === 0) {
        result[i][j] = 0;
      }
    }
  }


  const dx = [0, 0, 1, -1];
  const dy = [1, -1, 0, 0];

  const queue = [];

  let nx, ny;

  queue.push([sX, sY, 0]);

  result[sX][sY] = 0;
  while(queue.length) {
    const [x, y, cnt] = queue.shift();

    for (let i = 0; i < 4; i++) {
      nx = x + dx[i];
      ny = y + dy[i];
      if (nx >= 0 && nx < n && ny >= 0 && ny < m) {
        if (result[nx][ny] === -1) {
          if (arr[nx][ny] === 0) {
            result[nx][ny] = 0;
          } else {
            result[nx][ny] = cnt + 1;
            queue.push([nx, ny, cnt + 1]);
          }
        }
      } 
    }
  }

  let answer = '';
  for (let i = 0; i < n; i++) {
    answer += result[i].join(' ');
    answer += i === n - 1 ? '' : '\n';
  }
  console.log(answer);
}