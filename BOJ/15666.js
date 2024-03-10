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

    const arr = Array.from(new Set(input[1])).sort((a, b) => a - b);
    const ret = [];

    function make_seq(cur_seq, idx) {
        if (cur_seq.length === m) {
            ret.push(cur_seq);
            return;
        }
        for (let i = idx; i < arr.length; i++) {
            make_seq([...cur_seq, arr[i]], i);
        }
    }

    make_seq([], 0);
    console.log(ret.map((el) => el.join(' ')).join('\n'));
}