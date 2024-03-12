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
    const list = input.map((l) => l.split(' '));
    solution(list);
    process.exit();
});

class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
        this.prev = null;
    }
};

class Deque {
    constructor() {
        this.init();
    }

    init() {
        this.count = 0;
        this.front = null;
        this.rear = null;
    }

    size() {
        return this.count;
    }

    shift() {
        if (this.count === 0) return;
        
        const value = this.front.value;

        if (this.count === 1) {
            this.init();
        } else {
            this.front = this.front.next;
            this.front.prev = null;
            this.count -= 1;
        }
        return value;
    }

    push(value) {
        const node = new Node(value);

        if (this.count === 0) {
            this.front = node;
            this.rear = node;
        } else {
            const originRear = this.rear;
            originRear.next = node;
            node.prev = originRear;
            this.rear = node;
        }
        this.count += 1;
    }
}

function solution(input) {
    const [n, m] = input[0].map((el) => parseInt(el));
    const arr = Array(n);

    for (let i = 0; i < n; i++) {
        arr[i] = input[i + 1][0];
    }

    function bfs() {
        const deque = new Deque();
        const ret = Array(n * m).fill().map(() => ({t: Infinity, f: Infinity}));
        let nx, ny;
        let x, y, cnt, breakFlag;
        dirX = [-1, 1, 0, 0];
        dirY = [0, 0, -1, 1];

        deque.push([0, 0, 1, false]);
        ret[0].f = 1;
        ret[0].t = 1;
        while (deque.size()) {
            [x, y, cnt, breakFlag] = deque.shift();

            if (x === n - 1 && y === m - 1) {
                continue;
            }
            for (let i = 0; i < 4; i++) {
                nx = x + dirX[i];
                ny = y + dirY[i];
                if (nx >= 0 && nx < n && ny >= 0 && ny < m) {
                    if (arr[nx][ny] === '0') {
                        if (breakFlag && ret[nx * m + ny].t > cnt + 1) {
                            ret[nx * m + ny].t = cnt + 1;
                            deque.push([nx, ny, cnt + 1, breakFlag]);
                        }
                        if (!breakFlag && ret[nx * m + ny].f > cnt + 1) {
                            ret[nx * m + ny].f = cnt + 1;
                            deque.push([nx, ny, cnt + 1, breakFlag]);
                        }
                    }
                    else {
                        if (!breakFlag && ret[nx * m + ny].f > cnt + 1) {
                            ret[nx * m + ny].f = cnt + 1;
                            deque.push([nx, ny, cnt + 1, true]);
                        }
                    }
                }
            }
        }

        const ans = Math.min(ret[(n - 1) * m + m - 1].t, ret[(n - 1) * m + m - 1].f);
        return ans === Infinity ? -1 : ans;
    }

    console.log(bfs());
}