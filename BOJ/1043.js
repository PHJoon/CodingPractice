function filter(trueP, party, attend) {
    const q = [trueP];
    while (q.length !== 0) {
        const t = q.pop();
        for (let i = 0; i < party.length; i++) {
            if (party[i].includes(t)) {
                attend[i] = true;
                party[i].splice(party[i].indexOf(t), 1);
                for (let p of party[i]) {
                    if (p !== t) {
                        q.push(p);
                    }
                }
            }
        }
    }
}

function solution(input) {
    const [n, m] = input[0];
    const trueN = input[1];

    if (trueN[0] === 0) {
        console.log(m);
        return ;
    }

    trueN.splice(0, 1);

    const party = Array(m + 1).fill([]);
    for (let i = 1; i < m + 1; i++) {
        party[i] = input[1 + i].slice(1);
    }
    
    const attend = Array(m + 1).fill(false);

    for (let t of trueN) {
        filter(t, party, attend);
    }

    const ret = attend.reduce((acc, cur) => {
        return acc + (cur === true ? 0 : 1);
    }, 0);
    console.log(ret - 1);
}





let input = [[4, 5], [1, 1], [1, 1], [1, 2], [1, 3], [1, 4], [2, 4, 1]];

// let input = [[10, 9], [4, 1, 2, 3, 4], [2, 1, 5], [2, 2, 6], [1, 7], [1, 8], [2, 7, 8], [1, 9], [1, 10], [2, 3, 10], [1, 4]];

// let input = [[4, 3], [1, 4], [2, 1, 3], [2, 2, 3], [2, 3, 4]];

solution(input);