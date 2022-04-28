import { GameStatus } from "./utils/util.js";

export function checkGameStatus(status, charsLeft, chancesLeft, timer) {
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

export function initializeState(state, word) {

  return state;
}

export function selectCharacter(state, enteredCharacter) {
  // 입력한 알파벳은 enteredCharacters에 저장된다.
  // 입력한 알파벳이 charMap에 없다면,
  // 기회가 한번 사라지게 된다. gameStatus 를 체크한다.
  //
  // 입력한 알파벳이 charMap에 존재하면,
  // wordArr의 특정 알파벳이 "*"가 아닌 해당 알파벳으로 바뀐다.
  // charMap을 이용한다.
  // charsLeft는 줄어든다.
  // gameStatus를 체크한다.
  return state;
}
