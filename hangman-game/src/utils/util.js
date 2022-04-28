export const GameStatus = {
  READY: "READY",
  START: "START",
  LOSE: "LOSE",
  WIN: "WIN",
};

export function isGameEnded(gameStatus) {
  return gameStatus !== GameStatus.START;
}

export function fetchWord() {
  return fetch("https://puzzle.mead.io/puzzle?wordCount=2")
    .then((r) => r.json())
    .then((data) => data.puzzle);
}

export function generateGameMessage(gameStatus) {
  if (gameStatus === GameStatus.LOSE) {
    return "게임에서 졌습니다. 다시 시작하세요.";
  } else if (gameStatus === GameStatus.WIN) {
    return "이겼습니다!!";
  } else if (gameStatus === GameStatus.READY) {
    return "게임을 시작하세요.";
  }

  return "Loding..";
}

export function wordToMap(word) {
  return word
    .toUpperCase()
    .split("")
    .reduce((map, ch, idx) => {
      if (!map[ch]) map[ch] = [];
      map[ch].push(idx);
      return map;
    }, {});
}