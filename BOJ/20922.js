const readline = require("readline");
const fs = require('fs');

const rl = readline.createInterface({
  input: fs.createReadStream('./예제.txt'),
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
  const [n, k] = input[0].split(" ").map(Number);
  const arr = input[1].split(" ").map(Number);
  const count = new Array(100001).fill(0);

  let start = 0;
  let end = 0;
  let answer = 1;

  count[arr[start]] += 1;

  while (start <= end && end < n) {
    if (count[arr[end]] === k + 1) {
      count[arr[start]] -= 1;
      start += 1;
    } else if (count[arr[end]] <= k) {
      end += 1;
      count[arr[end]] += 1;
    }
    if (count[arr[end]] <= k) {
      answer = Math.max(answer, end - start + 1);
    }
  }

  console.log(answer);
}
