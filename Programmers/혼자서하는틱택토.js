function solution(board) {
  let oCnt = 0;
  let xCnt = 0;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === "O") {
        oCnt++;
        continue;
      }
      if (board[i][j] === "X") {
        xCnt++;
      }
    }
  }

  // 승리여부 체크
  function checkWin(ele) {
    let i, j, eleCnt;

    eleCnt = 0;
    for (i = 0; i < 3; i++) {
      for (j = 0; j < 3; j++) {
        if (board[i][j] === ele) {
          eleCnt++;
        }
      }
      if (eleCnt === 3) {
        return true;
      }
      eleCnt = 0;
    }

    eleCnt = 0;
    for (j = 0; j < 3; j++) {
      for (i = 0; i < 3; i++) {
        if (board[i][j] === ele) {
          eleCnt++;
        }
      }
      if (eleCnt === 3) {
        return true;
      }
      eleCnt = 0;
    }

    if (
      (board[0][0] === ele && board[1][1] === ele && board[2][2] === ele) ||
      (board[0][2] === ele && board[1][1] === ele && board[2][0] === ele)
    ) {
      return true;
    }
    return false;
  }

  let answer = 1;

  // 개수 차이
  if (oCnt - xCnt > 1 || xCnt - oCnt > 0) answer = 0;

  // 한쪽이 이겼는데 게임 계속 진행
  // 둘 다 이겼을 때
  if (checkWin("O") && checkWin("X")) answer = 0;
  // O가 이겼을 때
  if (checkWin("O") && oCnt - xCnt === 0) answer = 0;
  // X가 이겼을 때
  if (checkWin("X") && xCnt - oCnt === -1) answer = 0;

  return answer;
}
