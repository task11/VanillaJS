; (function () {

  const get = (target) => {
    return document.querySelector(target);
  };
  const $clacForm = get(".calc-form");
  const $userInput = get(".user-input");
  let tmpOperand;
  let tmpOperation;
  let calcMod = false;



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
        $userInput.value = firstNum / lastNum;
        break;
    }
  }

  const calculation = (e) => {
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

    if ($userInput.value.includes('.') && item === '.') return;

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
    } else $userInput.value += item;

  }

  const init = () => {

    // $userInput.addEventListener('change', setInput);
    $clacForm.addEventListener('click', calculation);

  }

  init();
})()