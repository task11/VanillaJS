import {
  GameStatus,
  isGameEnded,
  generateGameMessage,
} from "./utils/util.js";
import { calculateImageSize } from './utils/image-util.js';
import { h, id } from "./utils/dom.js";

export const HangmanImage = (chancesLeft, images) => {
  const container = id("hangman-image");
  const context = container.getContext("2d");
  context.clearRect(0, 0, container.width, container.height);

  images.slice(chancesLeft).map((item, idx) => {
    context.drawImage(
      item.image,
      item.dx,
      item.dy,
      ...calculateImageSize(item.image.width, item.image.height, 70)
    );
  });
};

export const Word = (gameStatus, wordArr) => {
  const container = id("word");
  container.innerHTML = "";

  const wordText = h("div");
  wordText.classList.add("word-text");

  if (isGameEnded(gameStatus)) {
    const message = h('p');
    message.innerText = generateGameMessage(GameStatus);
    wordText.appendChild(message);
  }

  const spans = wordArr.map(ch => {
    const span = h("span");
    if (ch !== " ") {
      span.classList.add("character");
    }
    span.innerText = ch;
    return span;
  });

  wordText.append(...spans);
  container.appendChild(wordText);
};

export const KeyboardLayout = () => {
  const container = id("keyboard-layout");
  container.innerHTML = "";

  const ul = h("ul");
  ul.classList.add("keyboard-layout");

  "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    .split("")
    .map((c) => {
      const li = h("li");
      const button = h("button");

      // 버튼을 누를 때, 선택한 문자를 함수로 전달한다.
      // 게임이 종료되었거나, 이미 누른 문자라면 해당 버튼을 누르지 못하게 한다.
      button.classList.add("keyboard-button");
      button.innerText = c;

      li.appendChild(button);
      return li;
    })
    .forEach((node) => ul.appendChild(node));

  container.appendChild(ul);
};

export const ButtonBox = (wordLoading, gameStatus, onClickStart, chancesLeft, timer) => {
  const container = id("button-box");
  container.innerHTML = "";

  const chances = h("div");
  chances.classList.add("chances-text");
  chances.innerText = `Chances: ${chancesLeft}`;

  const timerText = h("div");
  timerText.classList.add("timer-text");
  timerText.innerText = timer;

  const button = h("button");
  button.classList.add("start-button");
  button.innerText = "START";
  button.addEventListener('click', onClickStart);
  button.disabled = wordLoading || !isGameEnded(gameStatus);
  container.append(chances, timerText, button);
};

export function render(state, onClickItem, onClickStart, imageSources) {
  KeyboardLayout();
  Word(state.gameStatus, state.wordArr);
  ButtonBox(state.wordLoading, state.gameStatus, onClickStart, state.chancesLeft, state.timer);
  HangmanImage(state.chancesLeft, imageSources);
}


