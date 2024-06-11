function solution(bandage, health, attacks) {
  let time = 0;
  let curHealth = health;
  let attackIdx = 0;
  let bandageCount = 0;
  const [bTime, bHeal, bPlus] = bandage;

  while (time < attacks[attacks.length - 1][0]) {
    time++;
    if (time === attacks[attackIdx][0]) {
      curHealth -= attacks[attackIdx][1];
      if (curHealth <= 0) {
        break;
      }
      bandageCount = 0;
      attackIdx++;
      continue;
    }

    curHealth = curHealth + bHeal > health ? health : curHealth + bHeal;
    bandageCount++;
    if (bandageCount === bTime) {
      curHealth = curHealth + bPlus > health ? health : curHealth + bPlus;
      bandageCount = 0;
    }
  }

  return curHealth <= 0 ? -1 : curHealth;
}
