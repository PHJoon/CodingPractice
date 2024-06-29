const readline = require("readline");
const fs = require("fs");

const rl = readline.createInterface({
  input: fs.createReadStream("./예제.txt"),
  // input: process.stdin,
  output: process.stdout,
});

let t = 0;
const input = [];
rl.on("line", function (line) {
  if (!t) {
    t = parseInt(line);
  } else {
    input.push(line.trim(" "));
  }
}).on("close", function () {
  solution(t, input);
  process.exit();
});

function findString(str, k) {
  const charObj = {};

  for (let i = 0; i < str.length; i++) {
    if (charObj[str[i]]) {
      charObj[str[i]].count += 1;
      charObj[str[i]].index.push(i);
    } else {
      charObj[str[i]] = {
        count: 1,
        index: [i],
      };
    }
  }

  const filtered = {};

  for (const [key, value] of Object.entries(charObj)) {
    if (value.count >= k) {
      filtered[key] = value;
    }
  }

  const len = [];

  for (const value of Object.values(filtered)) {
    const indexArr = value.index;

    for (let i = 0; i < indexArr.length - k + 1; i++) {
      len.push(indexArr[i + k - 1] - indexArr[i] + 1);
    }
  }

  len.sort((a, b) => a - b);
  return len;
}

function solution(t, input) {
  let answer = "";

  for (let i = 0; i < t; i++) {
    const str = input[2 * i];
    const k = parseInt(input[2 * i + 1]);

    const result = findString(str, k);

    if (result.length === 0) {
      answer += "-1";
    } else {
      answer += `${result[0]} ${result[result.length - 1]}`;
    }
    answer += i === t - 1 ? "" : "\n";
  }
  console.log(answer);
}
