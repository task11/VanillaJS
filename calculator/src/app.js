; (function () {

  const get = (target) => {
    return document.querySelector(target);
  };
  const $clacForm = get(".calc-form");
  const $userInput = get(".user-input");
  const $calcHistory = get(".calc-history");
  let historyStack = "";
  let tmpOperand;
  let tmpOperation;
  let calcMod = false;

  const round = (number) => {
    return Math.round((number + Number.EPSILON) * 100) / 100;
  }



  const operation = (userInput) => {
    const firstNum = parseFloat(tmpOperand);
    const lastNum = parseFloat(userInput);
    switch (tmpOperation) {
      case '+':
        $userInput.value = firstNum + lastNum;
        break;
      case '-':
        $userInput.value = firstNum - lastNum;
        break;
      case '*':
        $userInput.value = firstNum * lastNum;
        break;
      case '/':
        $userInput.value = round(firstNum / lastNum);
        break;
    }
  }

  const clickCalculation = (e) => {
    e.preventDefault();
    const item = e.target.innerText;
    const numberFlag = e.target.classList.contains('number');

    if (e.target.classList.contains('user-input')) return;

    if (item === 'c') {
      $userInput.value = '';
      return;
    }

    if (calcMod) {
      $userInput.value = '';
      calcMod = false;
    }

    if (!numberFlag) {
      operation($userInput.value);
      tmpOperand = $userInput.value;

      if (item === '=') {
        tmpOperation = '';
        calcMod = false;
      } else {
        tmpOperation = item;
        calcMod = true;
      }
      console.log(historyStack);
    } else $userInput.value += item;

  }

  const init = () => {
    // $userInput.addEventListener('change', setInput);
    $clacForm.addEventListener('click', clickCalculation);
  }

  init();
})()