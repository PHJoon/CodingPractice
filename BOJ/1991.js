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
    let [n] = input[0].split(' ').map((el) => parseInt(el));
    let line;
    const tree = {};

    for (let i = 1; i <= n; i++) {
        line = input[i].split(' ');
        tree[line[0]] = {left: line[1], right: line[2]};
    }

    let result = "";
    function preorder(node) {
        if (node === ".") return;
        result += node;
        preorder(tree[node].left);
        preorder(tree[node].right);
    }
    
    function inorder(node) {
        if (node === ".") return;
        inorder(tree[node].left);
        result += node;
        inorder(tree[node].right);
    }
    
    function postorder(node) {
        if (node === ".") return;
        postorder(tree[node].left);
        postorder(tree[node].right);
        result += node;
    }

    preorder("A");
    result += "\n";
    inorder("A");
    result += "\n";
    postorder("A");

    console.log(result);
}