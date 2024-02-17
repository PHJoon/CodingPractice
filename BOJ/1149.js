// 질문게시판의 qowl0326님 질문의 Icr7324님 답변 참고

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

    const ans = Array.from({length: n + 1}, () => [0, 0, 0]);
    
    for (let i = 1; i <= n; i++) {
        // 현재 레드를 선택하는 경우 => 이전에 블루 또는 그린 선택한 경우 중 최소 + 현재 레드 선택
        ans[i][0] = Math.min(ans[i - 1][1], ans[i - 1][2]) + input[i][0];
        // 현재 그린을 선택하는 경우
        ans[i][1] = Math.min(ans[i - 1][0], ans[i - 1][2]) + input[i][1];
        // 현재 블루를 선택하는 경우
        ans[i][2] = Math.min(ans[i - 1][0], ans[i - 1][1]) + input[i][2];
    }

    console.log(Math.min(...ans[n]));
}