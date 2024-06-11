function solution(friends, gifts) {
  const record = Array.from(Array(friends.length), () =>
    Array(friends.length).fill(0)
  );

  for (const g of gifts) {
    const name = g.split(" ");
    record[friends.indexOf(name[0])][friends.indexOf(name[1])] += 1;
  }

  function getGiftIndexCount(idx) {
    const giveIndex = record[idx].reduce((acc, cur) => {
      return acc + cur;
    }, 0);
    let getIndex = 0;
    record.forEach((r) => {
      getIndex += r[idx];
    });
    return giveIndex - getIndex;
  }

  let iGiftIndex, jGiftIndex;
  let answer = Array(friends.length).fill(0);

  for (let i = 0; i < friends.length; i++) {
    for (let j = i + 1; j < friends.length; j++) {
      // 선물 주고 받은 기록 아예 없는 경우 || 같은 수로 주고 받은 경우
      if (
        (record[i][j] === 0 && record[j][i] === 0) ||
        record[i][j] === record[j][i]
      ) {
        // 선물지수 비교
        iGiftIndex = getGiftIndexCount(i);
        jGiftIndex = getGiftIndexCount(j);
        if (iGiftIndex > jGiftIndex) {
          answer[i] += 1;
        }
        if (iGiftIndex < jGiftIndex) {
          answer[j] += 1;
        }
      } else {
        // 선물 주고 받은 기록 있는 경우 더 많은 선물 준 사람이 다음 달에 선물 하나 받음
        if (record[i][j] > record[j][i]) {
          answer[i] += 1;
        } else {
          answer[j] += 1;
        }
      }
    }
  }

  return Math.max(...answer);
}
