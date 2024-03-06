let fs = require('fs');
let input = fs.readFileSync('./예제.txt').toString().trim().split('\n');

function bellmanFord(n, edges, start) {
    // 최단거리 테이블 초기화
    const dist = Array(n + 1).fill(0);
    // 시작 노드 초기화
    dist[start] = 0;

    let update, s, e, t;
    for (let i = 0; i <= n; i++) {
        update = false;
        for (let edge of edges) {
            [s, e, t] = edge;
            if (dist[e] > dist[s] + t) {
                dist[e] = dist[s] + t;
                update = true;
            }
        }
        if (!update) break;
    }
    // 음수 사이클 확인
    if (update) {
        for (let edge of edges) {
            [s, e, t] = edge;
            if (dist[e] > dist[s] + t) {
                return false;
            }
        }
    }
    return true;
}

let [tc] = input[0].split(' ').map(Number);
let ret = [];

let n, m, w, s, e, t, first;
first = 1;
while (tc > 0) {
    [n, m, w] = input[first].split(' ').map(Number);
    const edges = Array.from({length: n + 1}, () => []);
    // 도로 정보
    for (let i = 0; i < m; i++) {
        [s, e, t] = input[first + i + 1].split(' ').map(Number);
        edges.push([s, e, t]);
        edges.push([e, s, t]);
    }
    // 웜홀 정보
    for (let i = 0; i < w; i++) {
        [s, e, t] = input[first + m + i + 1].split(' ').map(Number);
        edges.push([s, e, -t]);
    }
    // 다음 테케 시작점 갱신
    first += m + w + 1;

    // 벨만 포드
    let negativeFlag = false;
    if (!bellmanFord(n, edges, 1)) {
        negativeFlag = true;
    }
    ret.push(negativeFlag === true ? "YES" : "NO");

    tc--;
}

console.log(ret.join('\n'));
