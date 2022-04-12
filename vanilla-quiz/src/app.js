; (function () {
  'use strict'

  const get = (target) => {
    return document.querySelector(target);
  }

  const $playBtn = get(".btn-play");
  const $conStart = get(".container-start");
  const $conQuiz = get(".container-quiz");
  const $restartBtn = get(".btn-restart");
  let isPlay = false;


  const togglePlay = () => {
    if (!isPlay) {
      $conQuiz.style.display = "block";
      $conStart.style.display = "none";
      isPlay = true;
    } else {
      $conQuiz.style.display = "none";
      $conStart.style.display = "flex";
      isPlay = false;
    }
  }

  const init = () => {

    // window.addEventListener('DOMContentLoaded', () => {

    // })

    $playBtn.addEventListener('click', togglePlay);
    $restartBtn.addEventListener('click', togglePlay);
  };

  init();
})()