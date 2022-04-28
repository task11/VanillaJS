import { GameStatus } from "./utils/utile";

function checkGameStatus(status, charsLeft, chancesLeft, timer) {
  if (charsLeft === 0) {
    return GameStatus.WIN;
  } else if (chancesLeft === 0 || timer === 0) {
    return GameStatus.LOSE;
  }
  return status;
}

export const initialState = {
  enteredCharacters: {},
  charMap: {},
  wordArr: [],
  charsLeft: 0,
  chancesLeft: 7,
  timer: 60,
  gameStatus: GameStatus.READY,
  wordLoading: false,
};

export function startGame(state) {
  return { ...state, gameStatus: GameStatus.START };
}

export function decreaseTimer(state) {
  return { ...state, timer: state.timer - 1 };
}

export function setWordLoading(state, wordLoading) {
  return { ...state, wordLoading };
}