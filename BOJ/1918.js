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
    solution(input);
    process.exit();
});

function solution(input) {
    const str = input[0].trim();
    
    const opers = ['+', '-', '*', '/'];
    const top_opers = ['*', '/'];
    const parenthesis = ['(', ')'];

    function rpn(s) {
        let ret = "";
        const stack = [];

        for (let i = 0; i < s.length; i++) {
            if (opers.includes(s[i])) {
                if (top_opers.includes(s[i])) {
                    while (top_opers.includes(stack[stack.length - 1])) {
                        ret += stack.pop();
                    }
                } else {
                    while (stack.length > 0 && stack[stack.length - 1] !== '(') {
                        ret += stack.pop();
                    }
                }
                stack.push(s[i]);
            } else if (parenthesis.includes(s[i])) {
                if (s[i] === '(') {
                    stack.push(s[i]);
                } else {
                    while (stack[stack.length - 1] !== '(') {
                        ret += stack.pop();
                    }
                    stack.pop();
                }
            } else {
                ret += s[i];
            }

        }
        while (stack.length > 0) {
            ret += stack.pop();
        }

        return ret;
    }

    console.log(rpn(str));
}