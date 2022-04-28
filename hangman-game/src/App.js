import {
  initializeState,
  initialState,
  startGame,
  decreaseTimer,
  selectCharacter,
  checkGameStatus,
  setWordLoading,
} from "./state.js";
import { render } from "./components.js";
import { GameStatus, fetchWord, isGameEnded } from "./utils/util.js";
import { fetchAllImages } from "./utils/image-util.js";

const App = () => {
  let state = { ...initialState };
  let imageSources = null;

  function changeState(callback) {
    // 상태를 변경하는 함수.
    // 상태를 변경한 후에 바로 render 함수를 호출한다.
    state = callback(state);
    render(state, onClickItem, onClickStart, imageSources);
  }

  function onClickItem(c) {
    changeState((state) => selectCharacter(state, c));
    changeState(state => checkGameStatus(state));
  }

  function onClickStart() {
    if (state.wordLoading) return;

    changeState(state => setWordLoading(state, true));

    fetchWord()
      .then(word => {
        const intervalId = setInterval(() => {
          if (isGameEnded(state.gameStatus)) {
            clearInterval(intervalId);
            return;
          }

          changeState(state => checkGameStatus(decreaseTimer(state)));
        }, 1000);

        changeState(state => setWordLoading(state, false));
        changeState(state => initializeState(state, word));
        changeState(state => startGame(state));
      });
  }

  fetchAllImages().then((images) => {
    imageSources = images;
    changeState((state) => state);
  });
};

export default App;
