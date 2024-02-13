function spread(x, y, graph) {
    graph[x][y] = 2;

    const a = [-1, 1, 0, 0];
    const b = [0, 0, -1, 1];
    
    for (let i = 0; i < 4; i++) {
        if (x + a[i] >= 0 && x + a[i] < graph.length && y + b[i] >= 0 && y + b[i] < graph[0].length) {
            if (graph[x + a[i]][y + b[i]] === 0) {
                spread(x + a[i], y + b[i], graph);
            }
        }
    }
}

function cntZero(graph) {
    let ret = 0;
    for (let i = 0; i < graph.length; i++) {
        const tmp = graph[i].filter((el) => el === 0);
        const sum = tmp.length;
        ret += sum;
    }
    return ret;
}


function makeWall(x, y, graph, cnt, ret) {
    if (cnt === 3) {
        const copyTmp = graph.map((row) => {
            return row.slice();
        });

        for (let i = 0; i < graph.length; i++) {
            for (let j = 0; j < graph[0].length; j++) {
                if (copyTmp[i][j] === 2) {
                    spread(i, j, copyTmp);
                }
            }
        }

        const sum = cntZero(copyTmp);
        ret.push(sum);
        return ;
    }

    for (let i = x; i < graph.length; i++) {
        const k = i === x ? y : 0;
        for (let j = k; j < graph[0].length; j++) {
            if (graph[i][j] === 0) {
                graph[i][j] = 1;
                makeWall(i, j, graph, cnt + 1, ret);
                graph[i][j] = 0;
            }
        }
    }
}


function solution(input) {
    const [n, m] = input[0];
    
    let graph = Array.from({length: n}, () => []);
    
    // get graph
    for (let i = 1; i <= n; i++) {
        graph[i - 1] = input[i];
    }
    
    let ret = [];
    // make wall
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (graph[i][j] === 0) {
                graph[i][j] = 1;
                makeWall(i, j, graph, 1, ret);
                graph[i][j] = 0;
            }
        }
    }

    console.log(Math.max(...ret));

}

// let input = [[7, 7], [2, 0, 0, 0, 1, 1, 0], [0, 0, 1, 0, 1, 2, 0], [0, 1, 1, 0, 1, 0, 0
// ], [0, 1, 0, 0, 0, 0, 0
// ], [0, 0, 0, 0, 0, 1, 1
// ], [0, 1, 0, 0, 0, 0, 0
// ], [0, 1, 0, 0, 0, 0, 0
// ]];

let input = [[3, 3], [0, 0, 0], [0, 0, 0], [0, 0, 0]];

// let input = [[4, 6], [0, 0, 0, 0, 0, 0], [1, 0, 0, 0, 0, 2], [1, 1, 1, 0, 0, 2], [0, 0, 0, 0, 0, 2]];



solution(input);