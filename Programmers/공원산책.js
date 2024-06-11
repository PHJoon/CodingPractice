function solution(park, routes) {
  let route, d, m;
  const dog = { x: 0, y: 0 };

  // 시작점 찾기
  for (let i = 0; i < park.length; i++) {
    for (let j = 0; j < park[0].length; j++) {
      if (park[i][j] === "S") {
        dog.x = i;
        dog.y = j;
        break;
      }
    }
  }

  // 장애물 체크, 아웃 체크
  function checkObs(x, y, dir, move) {
    while (move >= 0) {
      if (x < 0 || x >= park.length || y < 0 || y >= park[0].length) {
        return false;
      }
      if (park[x][y] === "X") {
        return false;
      }
      if (dir === "N") {
        x--;
      } else if (dir === "S") {
        x++;
      } else if (dir === "W") {
        y--;
      } else {
        y++;
      }
      move--;
    }
    return true;
  }

  for (route of routes) {
    d = route[0];
    m = parseInt(route[2]);

    if (!checkObs(dog.x, dog.y, d, m)) {
      continue;
    }

    if (d === "N") {
      dog.x -= m;
    } else if (d === "S") {
      dog.x += m;
    } else if (d === "W") {
      dog.y -= m;
    } else {
      dog.y += m;
    }
  }

  return [dog.x, dog.y];
}
