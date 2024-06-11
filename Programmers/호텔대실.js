function solution(book_time) {
  function hhmmToDate(str) {
    const [hh, mm] = str.split(":");
    const time = new Date(1970, 0, 1);
    time.setHours(parseInt(hh), parseInt(mm), 0, 0);
    return time;
  }

  // 시간 값으로 변환
  const b_time = book_time.map((time) => {
    return [hhmmToDate(time[0]), hhmmToDate(time[1])];
  });

  b_time.sort((a, b) => {
    return a[0] - b[0];
  });

  const rooms = [];

  let needRoom = false;
  let endTime;

  for (const book of b_time) {
    endTime = book[1];
    endTime.setMinutes(endTime.getMinutes() + 10);
    needRoom = true;
    // 사용가능한 방있는지 확인
    for (let i = 0; i < rooms.length; i++) {
      if (book[0] - rooms[i] >= 0) {
        rooms[i] = endTime;
        needRoom = false;
        break;
      }
    }

    if (needRoom) {
      rooms.push(endTime);
    }
  }

  return rooms.length;
}
