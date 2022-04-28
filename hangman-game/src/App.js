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

  function onClickStart() {
    // 단어 로딩 시작시, wordLoading을 설정한다.
    //
    // 단어를 서버로부터 가져온다.
    // 단어를 가져온 후에 인터벌을 등록한다.
    // 인터벌은 1초마다 작동하며 게임이 끝나면 인터벌을 제거한다.
    // 1초마다 timer를 감소하며 게임 상태를 체크한다.
    //
    // 타이머를 등록하고 게임을 시작한다.
  }

  fetchAllImages().then((images) => {
    imageSources = images;
    changeState((state) => state);
  });
};

export default App;
