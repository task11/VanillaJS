export default class BaseballGame {

  constructor() {
    this.getComputerNumber();
    this.getSelector('.game-form').addEventListener('submit', (e) => this.clickSubmit(e, this._computerInput));
  }

  play(computerInputNumbers, userInputNumbers) {
    this._computerInput = computerInputNumbers;
    const result = this.compareNumber(String(this._computerInput), String(userInputNumbers));
    console.log(result);
    return result;
  }

  getComputerNumber() {
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
    const result = this.play(computerInput, userInput.value);

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
    let result = '';
    if (strike > 0 && ball > 0) {
      result = `${ball}볼 ${strike}스트라이크`;
    } else if (ball > 0 && strike === 0) {
      result = `${ball}볼`;
    } else if (strike > 0 && ball === 0) {
      result = `${strike}스트라이크`
    } else {
      result = '낫싱';
    }
    return result;
  }
}

new BaseballGame();

// const game = new BaseballGame();
// // 예시
// game.play(123, 326); // '낫싱'
