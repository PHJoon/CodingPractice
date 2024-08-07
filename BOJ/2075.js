const readline = require('readline');
const fs = require('fs');
const { resolve } = require('path');

const rl = readline.createInterface({
  input: fs.createReadStream('./예제.txt'),
  // input: process.stdin,
  output: process.stdout
});

class Heap {
  constructor() {
    this.heap = [];
  }

  swap(index1, index2) {
    let temp = this.heap[index1];
    this.heap[index1] = this.heap[index2];
    this.heap[index2] = temp;
  }

  parentIndex(index) {
    return Math.floor((index - 1) / 2);
  }

  leftChildIndex(index) {
    return index * 2 + 1;
  }

  rightChildIndex(index) {
    return index * 2 + 2;
  }

  parent(index) {
    return this.heap[this.parentIndex(index)];
  }

  leftChild(index) {
    return this.heap[this.leftChildIndex(index)];
  }

  rightChild(index) {
    return this.heap[this.rightChildIndex(index)];
  }

  peek() {
    return this.heap[0];
  }

  size() {
    return this.heap.length;
  }
}

class MinHeap extends Heap {
  bubbleUp() {
    let index = this.size() - 1;
    while (this.parent(index) && this.parent(index) > this.heap[index]) {
      this.swap(this.parentIndex(index), index);
      index = this.parentIndex(index);
    }
  }

  bubbleDown() {
    let index = 0;
    while (
      (this.leftChild(index) && this.leftChild(index) < this.heap[index]) ||
      (this.rightChild(index) && this.rightChild(index) < this.heap[index])
    ) {
      let smallerIndex = this.leftChildIndex(index);
      if (
        this.rightChild(index) &&
        this.rightChild(index) < this.heap[smallerIndex]
      ) {
        smallerIndex = this.rightChildIndex(index);
      }

      this.swap(smallerIndex, index);
      index = smallerIndex;
    }
  }

  add(item) {
    this.heap.push(item);
    this.bubbleUp();
  }

  poll() {
    let item = this.peek();
    this.heap[0] = this.heap[this.size() - 1];
    this.heap.pop();
    this.bubbleDown();
    return item;
  }
}


const minHeap = new MinHeap();
let n = null;

rl.on('line', function(line) {
  if (n === null) {
    n = parseInt(line, 10);
  } else {
    line.split(' ').forEach((el) => {
      minHeap.add(parseInt(el, 10));
      if (minHeap.size() > n) minHeap.poll();
    })
    n--;
  }
  if (n === 0) rl.close();
}).on('close', function() {
  console.log(minHeap.peek());
  process.exit();
});
