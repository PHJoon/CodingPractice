class Node {
    constructor(val, parent, left, right) {
        this._parent = parent;
        this._val = val;
        this._left = left;
        this._right = right;
    }

    left() {
        return this._left;
    }

    right() {
        return this._right;
    }

    parent() {
        return this._parent;
    }

    val() {
        return this._val;
    }

    setLeft(l) {
        this._left = l;
    }

    setRight(r) {
        this._right = r;
    }
    
    setParent(p) {
        this._parent = p;
    }

    setVal(v) {
        this._val = v;
    }
}

function solution(input) {
    const [n] = input[0];

    const arr = [];

    for (let i = 1; i <= n; i++) {
        arr.push(new Node(input[0], ".", input[1], input[2]));
    }

    


}
