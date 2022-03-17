; (function () {

  const get = (target) => {
    return document.querySelector(target);
  };
  const $clacForm = get(".calc-form");
  const $userInput = get(".user-input");

  const setInput = (e) => {

    console.log(e.target.value);
  }

  const calculation = (e) => {
    e.preventDefault();
    console.log(e.target);
    console.log($userInput.value);
  }

  const init = () => {

    // $userInput.addEventListener('change', setInput);
    $clacForm.addEventListener('submit', calculation);

  }

  init();
})()