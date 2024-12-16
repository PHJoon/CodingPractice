const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: fs.createReadStream('./예제.txt'),
  // input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on('line', (line) => {
  input.push(line);
});

rl.on('close', () => {
  solution(input);
  process.exit();
});


function lowerBound(arr, target) {
  let left = 0;
  let right = arr.length;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  return right;
}

function solution() {
  const [numOfTitle, numOfChar] = input[0].split(' ').map(el => parseInt(el));

  const titles = [];
  const values = [];

  for (let i = 1; i <= numOfTitle; i++) {
    const [title, value] = input[i].split(' ');
    titles.push(title);
    values.push(value);
  }

  let answer = '';

  for (let i = numOfTitle + 1; i <= numOfTitle + numOfChar; i++) {
    const resultIdx = lowerBound(values, parseInt(input[i]));
    answer += titles[resultIdx];
    answer += i !== numOfTitle + numOfChar ? '\n' : '';
  }

  console.log(answer);
}