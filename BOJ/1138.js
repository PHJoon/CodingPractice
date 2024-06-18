const readline = require("readline");
const fs = require("fs");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let n, arr;

rl.on("line", function (line) {
  if (!n) {
    n = parseInt(line);
  } else {
    arr = line.split(" ").map(Number);
    rl.close();
  }
}).on("close", function () {
  solution();
  process.exit();
});

function solution() {
  const result = Array(n).fill(-1);

  result[arr[0]] = 1;

  let cnt;
  for (let i = 1; i < n; i++) {
    cnt = arr[i] + 1;
    for (let j = 0; j < n; j++) {
      if (result[j] === -1) {
        cnt--;
      }
      if (cnt === 0) {
        result[j] = i + 1;
        break;
      }
    }
  }

  console.log(result.join(" "));
}
