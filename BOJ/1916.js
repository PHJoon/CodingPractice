const readline = require('readline');
const fs = require('fs');
const { resolve } = require('path');

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

class MinHeap {
    constructor() {
        this._heap = [];
    }
    
    isEmpty() {
        return this._heap.length === 0;
    }

    top() {
        if (this.isEmpty()) return null;
        return this._heap[0];
    }

    swap(a, b) {
        [this._heap[a], this._heap[b]] = [this._heap[b], this._heap[a]];
    }

    push(el) {
        this._heap.push(el);
        let curNode = this._heap.length - 1;
        
        while (curNode > 0) {
            const parentNode = Math.floor((curNode - 1) / 2);
            if (this._heap[parentNode][1] > this._heap[curNode][1]) {
                this.swap(parentNode, curNode);
            }
            curNode = parentNode;
        }
    }

    pop() {
        if (this.isEmpty()) return;
        if (this._heap.length === 1) {
            this._heap.pop();
            return;
        }

        let heapLen = this._heap.length -1;
        [this._heap[0], this._heap[heapLen]] = 
        [this._heap[heapLen], this._heap[0]];
        this._heap.pop();
        let curNode = 0;
        let child = 1;

        while (child < heapLen) {
            let childTwo = child + 1;
            if (childTwo < heapLen && this._heap[child].cost > this._heap[childTwo].cost) {
                child = childTwo;
            }
            if (this._heap[curNode].cost > this._heap[child].cost) {
                this.swap(curNode, child);
                curNode = child;
                child = curNode * 2 + 1;
            } else break;
        }   
    }
}


function solution(input) {
    const [n] = input[0];
    const [m] = input[1];
    const [start, end] = input[m + 2];
    const graph = Array.from({length: n + 1}, () => []);
    let s, e, c;
    for (let i = 0; i < m; i++) {
        [s, e, c] = input[i + 2];
        graph[s].push({end: e, cost: c});
    }

    function dijkstra(start) {
        const dist = Array(n + 1).fill(Infinity);
        const visited = Array(n + 1).fill(false);

        const q = new MinHeap();
        dist[start] = 0;
        q.push({node: start, cost: 0});

        while (!q.isEmpty()) {
            const cur = q.top();
            q.pop();

            if (visited[cur.node]) continue;
            visited[cur.node] = true;

            for (let i = 0; i < graph[cur.node].length; i++) {
                const next = graph[cur.node][i];

                const acc = dist[cur.node] + next.cost;
                if (dist[next.end] > acc) {
                    dist[next.end] = acc;
                    visited[next.end] = false;
                    q.push({node: next.end, cost: acc});
                }
            }
        }
        return dist[end];
    }

    console.log(dijkstra(start));
}