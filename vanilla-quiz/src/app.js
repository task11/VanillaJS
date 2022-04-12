const data = [
  {
    id: 1,
    content: "What is 1 + 1 ?",
    answer: [
      {
        id: 1,
        solution: "1",
      }
      ,
      {
        id: 2,
        solution: "2",
      }
      ,
      {
        id: 3,
        solution: "3",
      }
      ,
      {
        id: 4,
        solution: "4",
      }
      ,
      {
        id: 5,
        solution: "5",
      }
    ],
    result: 2
  },
  {
    id: 2,
    content: "What is 2 * 10 ?",
    answer: [
      {
        id: 1,
        solution: "10",
      }
      ,
      {
        id: 2,
        solution: "20",
      }
      ,
      {
        id: 3,
        solution: "30",
      }
      ,
      {
        id: 4,
        solution: "40",
      }
      ,
      {
        id: 5,
        solution: "50",
      }
    ],
    result: 2
  },
  {
    id: 3,
    content: "What is 10 * 10 ?",
    answer: [
      {
        id: 1,
        solution: "100",
      }
      ,
      {
        id: 2,
        solution: "200",
      }
      ,
      {
        id: 3,
        solution: "300",
      }
      ,
      {
        id: 4,
        solution: "400",
      }
      ,
      {
        id: 5,
        solution: "500",
      }
    ],
    result: 1
  },
]

  ; (function () {
    'use strict'

    let stage = 0;
    let sol = 0;

    const get = (target) => {
      return document.querySelector(target);
    }

    const $playBtn = get(".btn-play");
    const $conStart = get(".container-start");
    const $conQuiz = get(".container-quiz");
    const $restartBtn = get(".btn-restart");
    const $quizForm = get(".quiz-form");
    const $progess = get("progress");
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

    const getQuiz = (stage) => {
      // API Fetch (Mock API로 대체)
      let template = `
      <div class="quiz-title">${data[stage].content}</div>
      <div class="quiz-count">${sol} / ${data.length}</div>
  `
      for (let i = 0; i < data[stage].answer.length; i++) {
        template += `<button type="submit" class="quiz-answer stage-${stage}" id=${data[stage].answer[i].id}>${data[stage].answer[i].solution}</button>`
      }

      $quizForm.innerHTML = template;
    }

    const getAnswer = (e) => {
      // API Fetch (Mock API로 대체)
      e.preventDefault();
      const seletAnswer = parseInt(e.target.id);
      const correctAnswer = data[stage].result;



      if (seletAnswer === correctAnswer) {
        sol++;
      }
      stage++;
      updateProgress(stage);
      getQuiz(stage);
    }

    const updateProgress = (stage) => {
      $progess.value = stage * (100 / data.length);
    }


    const init = () => {

      window.addEventListener('DOMContentLoaded', () => {

        getQuiz(stage);
      })
      $quizForm.addEventListener('click', getAnswer)
      $playBtn.addEventListener('click', togglePlay);
      $restartBtn.addEventListener('click', togglePlay);
    };

    init();
  })()