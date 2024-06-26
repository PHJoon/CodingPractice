const fs = require("fs");
const readline = require("readline");
const rl = readline.createInterface({
  input: fs.createReadStream("./예제.txt", "utf8"),
  // input: process.stdin,
  output: process.stdout,
});

const input = [];

rl.on("line", function (line) {
  input.push(line);
}).on('close', function() {
  solution(input);
  process.exit();
});

function solution(input) {
  const [m, n] = input[0].split(' ').map(Number);
  const graph = input.slice(1).map((l) => l.split(' ').map(Number));

  const queue = [];

  let days = 0;
  let tomatoes = 0;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (graph[i][j] === 1) {
        queue.push([i, j, 0]);
      }
      if (graph[i][j] === 0) {
        tomatoes++;
      }
    }
  }

  const dir = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  let nx, ny;
  
  let head = 0;
  while (queue.length > head) {
    const [x, y, cnt] = queue[head++];
    
    for (const [dx, dy] of dir) {
      nx = x + dx;
      ny = y + dy;

      if (nx >= 0 && nx < n && ny >= 0 && ny < m) {
        if (graph[nx][ny] === 0) {
          graph[nx][ny] = cnt + 1;
          queue.push([nx, ny, cnt + 1]);
          days = cnt + 1;
          tomatoes--;
        } 
      }
    }
  }

  console.log(tomatoes ? -1 : days);
}