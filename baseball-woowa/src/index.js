export default class BaseballGame {

  constructor() {
    this.CORRECT = `🎉정답을 맞추셨습니다.🎉 \n 게임을 새로 시작하시겠습니까?`;
    this.getRandomNumber();
    this.getSelector('.game-form').addEventListener('submit', (e) => this.clickSubmit(e, this._computerInput));
    console.log(this._computerInput);
  }

  play(computerInputNumbers, userInputNumbers) {
    this._computerInput = computerInputNumbers;
    const result = this.compareNumber(String(this._computerInput), String(userInputNumbers));
    return result;
  }

  getRandomNumber() {
    let computerNumber = new Set();
    for (let i = 0; computerNumber.size < 3; i++) {
      let num = MissionUtils.Random.pickNumberInRange(1, 9)
      computerNumber.add(num);
    }
    this._computerInput = Array.from(computerNumber).join('');
  }

  getSelector(target) {
    return document.querySelector(target);
  }

  clickSubmit(e, computerInput) {
    e.preventDefault();
    const userInput = e.target.querySelector('#user-input');
    const errorFlag = this.catchInputError(userInput.value);

    if (!errorFlag) {
      const result = this.play(computerInput, userInput.value);
      this.renderResult(result);
    } else {
      this.renderResult('');
    }
    userInput.value = "";

  }

  compareNumber(answer, input) {
    let strike = 0;
    let ball = 0;
    for (let i = 0; i < answer.length; i++) {
      if (answer[i] == input[i]) {
        strike++;
      } else if (answer.includes(input[i])) {
        ball++;
      }
    }
    return this.makeResult(strike, ball);
  }

  makeResult(strike, ball) {
    let CORRECT = this.CORRECT;
    let result = '';
    if (strike === 3) result = CORRECT;
    else if (strike > 0 && ball > 0) result = `${ball}볼 ${strike}스트라이크`;
    else if (ball > 0 && strike === 0) result = `${ball}볼`;
    else if (strike > 0 && ball === 0) result = `${strike}스트라이크`;
    else result = '낫싱';
    return result;
  }

  renderResult(result) {
    let CORRET = this.CORRECT;
    const $result = this.getSelector('#result');
    const $restart = this.getSelector('#game-restart-button');
    $result.innerText = result;
    if (result === CORRET) {
      $restart.style.display = 'block';
    }
  }

  catchInputError(userInput) {
    let errorFlag = false;
    const inputLength = userInput.length;
    const inputSet = new Set(userInput);
    const inputSetLength = inputSet.size;

    if (userInput === "" || userInput.length > 3) {
      alert('숫자를 1개 이상 3개 이하로 입력해주세요.');
      errorFlag = true;
    }
    else if (inputLength !== inputSetLength) {
      alert('중복된 숫자를 입력할 수 없습니다.');
      errorFlag = true;
    }
    return errorFlag;
  }
}

new BaseballGame();

// const game = new BaseballGame();
// // 예시
// game.play(123, 326); // '낫싱'
