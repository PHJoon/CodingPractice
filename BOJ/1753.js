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
            if (childTwo < heapLen && this._heap[child][1] > this._heap[childTwo][1]) {
                child = childTwo;
            }
            if (this._heap[curNode][1] > this._heap[child][1]) {
                this.swap(curNode, child);
                curNode = child;
                child = curNode * 2 + 1;
            } else break;
        }   
    }
}


function dijkstra(start, graph) {
    const dist = Array(graph.length).fill(Infinity);
    const visited = Array(graph.length).fill(false);

    dist[start - 1] = 0;
    const q = new MinHeap();
    q.push([start, 0]);

    while (!q.isEmpty()) {
        const to = [...q.top()][0];
        q.pop();

        if (visited[to - 1]) continue;
        visited[to - 1] = true;

        for (let i = 0; i < graph[to - 1].length; i++) {
            const next = graph[to - 1][i];

            const acc = dist[to - 1] + next[1];
            if (dist[next[0] - 1] > acc) {
                dist[next[0] - 1] = acc;
                q.push([next[0], acc]);
            }
        }
    }

    return dist;
}

function solution(input) {
    const [n, e] = input[0];
    const [k] = input[1];

    const graph = Array.from({length: n}, () => []);

    for (let i = 0; i < e; i++) {
        const [u, v, w] = input[i + 2];
        graph[u - 1].push([v, w]);
    }

    const dist = dijkstra(k, graph);

    for (let d of dist) {
        console.log(d === Infinity ? "INF" : d);
    }
}




const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: fs.createReadStream("./예제.txt"),
    // input: process.stdin,
    output: process.stdout
});

let input = [];

rl.on('line', function(line) {
    input.push(line);
}).on('close', function() {
    const list = input.map((l) => l.split(' ').map((el) => parseInt(el)));
    solution(list);
    process.exit();
});