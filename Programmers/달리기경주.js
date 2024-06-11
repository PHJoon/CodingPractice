function solution(players, callings) {
  const rank = {};
  players.forEach((p, idx) => (rank[p] = idx));

  let call;
  let callIdx, p1, p2;

  for (call of callings) {
    callIdx = rank[call];
    p1 = players[callIdx];
    p2 = players[callIdx - 1];
    players[callIdx] = p2;
    players[callIdx - 1] = p1;
    rank[p1] -= 1;
    rank[p2] += 1;
  }

  return players;
}
