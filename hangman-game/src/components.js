import {
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

export const Word = (gameStatus, wordArr, chancesLeft) => {
  const container = id("word");
  container.innerHTML = "";

  const wordText = h("div");
  wordText.classList.add("word-text");

  if (isGameEnded(gameStatus)) {
    const message = h('p');
    message.innerText = generateGameMessage(gameStatus, chancesLeft);
    container.appendChild(message);
    return;
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

export const KeyboardLayout = (onClickItem, gameStatus, enteredCharacters) => {
  const KEY_STRING = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const container = id("keyboard-layout");
  container.innerHTML = "";

  const ul = h("ul");
  ul.classList.add("keyboard-layout");

  KEY_STRING
    .split("")
    .map((c) => {
      const li = h("li");
      const button = h("button");

      button.classList.add("keyboard-button");
      button.innerText = c;
      button.addEventListener('click', () => onClickItem(c));
      button.disabled = isGameEnded(gameStatus) || enteredCharacters[c];

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
  KeyboardLayout(onClickItem, state.gameStatus, state.enteredCharacters);
  Word(state.gameStatus, state.wordArr, state.chancesLeft);
  ButtonBox(state.wordLoading,
    state.gameStatus,
    onClickStart,
    state.chancesLeft,
    state.timer
  );
  HangmanImage(state.chancesLeft, imageSources);
}


