import "./app.css";
import {
  initializeState,
  initialState,
  startGame,
  decreaseTimer,
  selectCharacter,
  checkGameStatus,
  setWordLoading,
} from "./state";
import { render } from "./components";
import { GameStatus, fetchWord, isGameEnded } from "./utils/utile";
import { fetchAllImages } from "./image-util";

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
    // 알파벳 하나를 선택하면 호출되는 함수.
    changeState((state) => selectCharacter(state, c));
  }


  fetchAllImages().then((images) => {
    imageSources = images;
    changeState((state) => state);
  });
};

export default App;
