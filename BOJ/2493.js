const readline = require("readline");
const fs = require("fs");

const rl = readline.createInterface({
  input: fs.createReadStream("./예제.txt"),
  // input: process.stdin,
  output: process.stdout,
});

const input = [];

rl.on("line", function (line) {
  input.push(line);
}).on("close", function () {
  solution(input);
  process.exit();
});

function solution(input) {
  const n = Number(input[0].trim(' '));
  const tower = input[1].split(' ').map(Number);
  const result = Array(n).fill(0);
  const laserStack = [];

  laserStack.push(n - 1);
  let idx = n - 2;
  while (idx >= 0) {
    while (tower[idx] > tower[laserStack[laserStack.length - 1]]) {
      result[laserStack.pop()] = idx + 1;
    }
    laserStack.push(idx);
    idx--;
  }

  console.log(result.join(' '));
}