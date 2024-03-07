const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: fs.createReadStream('./예제.txt'),
    // input: process.stdin,
    output: process.stdout
});

const input = [];

rl.on('line', function(line) {
    input.push(line);
}).on('close', function() {
    const list = input.map((l) => l.split(' ').map((el) => parseInt(el)));
    solution(list);
    process.exit();
});

function solution(input) {
  const [n, m] = input[0];
  const seq = Array(n).fill(1);
  for (let i = 0; i < n; i++) {
    seq[i] = seq[i] + i;
  }

  const ret = [];

  function make_seq(cur_arr, idx) {
    if (cur_arr.length === m) {
      ret.push(cur_arr);
      return;
    }

    for (let i = idx; i < n; i++) {
      make_seq([...cur_arr, seq[i]], i);
    }
  }

  make_seq([], 0);
  console.log(ret.map((el) => el.join(' ')).join('\n'));
}