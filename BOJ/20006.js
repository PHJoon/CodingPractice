const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: fs.createReadStream('./예제.txt'),
  // input: process.stdin,
  output: process.stdout,
});

const input = [];

rl.on('line', (line) => {
  input.push(line);
})

rl.on('close', () => {
  solution();
  process.exit();
})

function solution() {
  const [p, m] = input[0].split(' ').map(el => Number(el));

  const waitingRoom = [];

  // roomInfo
  // {
  //   minLevel: number;
  //   maxLevel: number;
  //   numOfPlayers: number;
  //   players: [];
  //   isFull: boolean;
  // }

  // player
  // {
  //   level: Number;
  //   id: string;
  // }

  function findRoom(player) {
    for (let i = 0; i < waitingRoom.length; i++) {
      const room = waitingRoom[i];
      if (!room.isFull && player.level >= room.minLevel && player.level <= room.maxLevel && !room.isFull) {
        return { result: true, roomIdx: i };
      }
    }
    return { result: false, roomIdx: -1 };
  }

  function enterRoom(roomId, player) {
    waitingRoom[roomId].numOfPlayers = waitingRoom[roomId].numOfPlayers + 1;
    waitingRoom[roomId].players.push(player);

    if (waitingRoom[roomId].numOfPlayers === m) {
      waitingRoom[roomId].isFull = true;
    }
  }

  function makeRoom(player) {
    const newRoom = {
      minLevel: player.level - 10 > 0 ? player.level - 10 : 1,
      maxLevel: player.level + 10 < 501 ? player.level + 10 : 500,
      numOfPlayers: 1,
      players: [player],
      isFull: m === 1 ? true : false,
    };
    waitingRoom.push(newRoom);
  }

  function printRoom() {
    let result = '';
    for (let i = 0; i < waitingRoom.length; i++) {
      const room = waitingRoom[i];
      result += room.isFull ? 'Started!\n' : 'Waiting!\n';

      const sortedPlayers = room.players.sort((a, b) => {
        return a.id.localeCompare(b.id);
      })
      for (let i = 0; i < room.numOfPlayers; i++) {
        const player = sortedPlayers[i];
        result += `${player.level} ${player.id}`;
        result += i !== room.numOfPlayers - 1 ? '\n' : '';
      }
      result += i !== waitingRoom.length - 1 ? '\n' : '';
    }
    return result;
  }


  for (let i = 1; i <= p; i++) {
    const [pLevel, pId] = input[i].split(' ');
    const player = { level: Number(pLevel), id: pId };
    const findRoomResult = findRoom(player);
    const { result, roomIdx } = findRoomResult;
    if (result) {
      enterRoom(roomIdx, player);
    } else {
      makeRoom(player);
    }
  }

  const result = printRoom();
  console.log(result);
}