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
    const arr = input[1].sort((a, b) => a - b);
    const ret = [];
    const visit = Array(n).fill(0);
    const seq = Array(m).fill(0);

    function recursive(seqLen) {
        if (seqLen === m) {
            ret.push(seq.join(' '));
            return;
        }
        for (let i = 0; i < arr.length; i++) {
            if (visit[i]) continue;
            visit[i] = 1;
            seq[seqLen] = arr[i];
            recursive(seqLen + 1);
            visit[i] = 0;
        }
    }
    
    recursive(0);

    console.log(ret.join('\n'));
}