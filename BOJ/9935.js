const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: fs.createReadStream("./예제.txt"),
    // input: process.stdin,
    output: process.stdout
});

const input = [];

rl.on('line', function(line) {
    input.push(line);
}).on('close', function() {
    solution(input);
    process.exit();
});

function solution(input) {
    const str = input[0].trim();
    const bombStr = input[1].trim();

    function bomb(s) {
        const stack = [];
        let top;

        for (let i = 0; i < s.length; i++) {
            stack.push(s[i]);
            top = s[i];
            if (top === bombStr[bombStr.length - 1]) {
                const tmp = stack.slice(-(bombStr.length));
                if (tmp.join('') === bombStr) {
                    stack.splice(-(bombStr.length));
                }
            }
        }
        return stack;
    }

    const ret = bomb(str).join('');
    console.log(ret === '' ? "FRULA" : ret)
}