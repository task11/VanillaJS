export default class BaseballGame {
  play(computerInputNumbers, userInputNumbers) {
    console.log(computerInputNumbers);
    return "결과 값 String";
  }

  getComputerNumber() {
    let computerNumber = ""
    for (let i = 0; i < 3; i++) {
      computerNumber += MissionUtils.Random.pickNumberInRange(1, 9);
    }
    return computerNumber;
  }


}



const game = new BaseballGame();
const answer = game.getComputerNumber();
// 예시
game.play(answer, 456); // '낫싱'
