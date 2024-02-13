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
    const graph = Array.from({length: n}, () => []);

    for (let i = 0; i < n - 1; i++) {
        const [p, c, w] = input[i + 1];
        graph[p - 1].push([c - 1, w]);
        graph[c - 1].push([p - 1, w]);
    }
    
    // dfs
    // let visited = Array(n).fill(0);

    // function dfs(val) {
    //     if (visited[val] === 1) {
    //         return -101;
    //     }
    //     visited[val] = 1;

    //     let sum = 0;
    //     for (let node of graph[val]) {
    //         const next = node[0];
    //         const weight = node[1];
    //         sum = Math.max(sum, weight + dfs(next));
    //     }
    //     return sum;
    // }

    // let ans = 0;
    // for (let i = 0; i < n; i++) {
    //     visited = visited.map(() => 0);
    //     ans = Math.max(ans, dfs(i));
    // }

    // bfs
    function bfs(start) {
        const visited = Array(n).fill(0);
        visited[start] = 1;
        const q = [];
        q.push([start, 0]);
        
        const ret = [0, 0];
        let node, weight;
        while (q.length !== 0) {
            [node, weight] = q.shift();

            if (ret[1] < weight) {
                ret[0] = node;
                ret[1] = weight;
            }
            for (let next of graph[node]) {
                if (visited[next[0]] === 0) {
                    q.push([next[0], weight + next[1]]);
                    visited[next[0]] = 1;
                }
            }
        }
        return ret;
    }

    const start = bfs(0);

    console.log(bfs(start[0])[1]);
}