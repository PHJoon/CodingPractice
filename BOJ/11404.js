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
    const [n] = input[0];
    const [m] = input[1];
    const graph = Array.from({length: n}, () => Array(n).fill(Infinity));

    let a, b, c;
    for (let i = 0; i < m; i++) {
        [a, b, c] = input[i + 2];
        a--, b--;
        graph[a][b] = Math.min(graph[a][b], c);
    }
    
    // 자기 자신 0으로 초기화
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (i === j) {
                graph[i][j] = 0;
            }
        }
    }

    // 플로이드 워셜
    for (let k = 0; k < n; k++) {
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                graph[i][j] = Math.min(graph[i][j], graph[i][k] + graph[k][j]);
            }
        }
    }

    // Infinity 0으로
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (graph[i][j] === Infinity) {
                graph[i][j] = 0;
            }
        }
    }

    console.log(graph.map((el) => { return el.join(' ')}).join('\n'));
}