function solution(wallpaper) {
  const a = { x: 0, y: 0 };
  const b = { x: 0, y: 0 };

  let fPoint = 1;

  for (let i = 0; i < wallpaper.length; i++) {
    for (let j = 0; j < wallpaper[0].length; j++) {
      if (wallpaper[i][j] === "#") {
        // 처음 만나는 파일
        if (fPoint) {
          a.x = i;
          a.y = j;
          b.x = i;
          b.y = j;
          fPoint = 0;
          continue;
        }

        if (j > a.y) {
          if (j > b.y) {
            b.y = j;
          }
        } else {
          a.y = j;
        }

        if (i > b.x) {
          b.x = i;
        }
      }
    }
  }

  return [a.x, a.y, b.x + 1, b.y + 1];
}
