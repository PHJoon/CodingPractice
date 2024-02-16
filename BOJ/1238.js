// kchang6869님 71673248 풀이 참고

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
    const [n, m, x] = input[0];
    const graph = Array.from({length: n + 1}, () => []);
    const reverseGraph = Array.from({length: n + 1}, () => []);
    
    for (let i = 0; i < m; i++) {
        const [x, y, d] = input[i + 1];
        graph[x].push({to: y, dist: d});
        reverseGraph[y].push({to: x, dist: d});
    }

    function dijkstra(graph, start) {
        const dists = Array(graph.length).fill(Infinity);
        const q = [{ to: start, dist: 0}];
        dists[start] = 0;

        while (q.length) {
            const { to, dist } = q.shift();

            if (dists[to] < dist) continue;
            graph[to].forEach((next) => {
                const acc = dists[to] + next.dist;
                if (dists[next.to] > acc) {
                    dists[next.to] = acc;
                    q.push({to: next.to, dist: acc});
                }
            })
        }
        return dists;
    }

    distToX = dijkstra(graph, x);
    distFromX = dijkstra(reverseGraph, x);

    let ret = 0;
    for (let i = 1; i <= n; i++) {
        ret = Math.max(ret, distToX[i] + distFromX[i]);
    }

    console.log(ret);
}