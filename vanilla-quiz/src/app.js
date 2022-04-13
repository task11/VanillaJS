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
    const $conResult = get(".container-result");
    const $restartBtn = get(".btn-restart");
    const $quizForm = get(".quiz-form");
    const $progess = get("progress");


    const togglePlay = () => {
      $conQuiz.style.display = "block";
      $conStart.style.display = "none";
      isPlay = true;
    }

    const getQuiz = (stage) => {
      // API Fetch (Mock API로 대체)
      let template = `
          <div class="quiz-title">${data[stage].content}</div>
          
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

      if (stage === data.length) {
        return gameEnd();
      }

      e.target.style.backgroundColor = "#91C483"
      e.target.style.border = "1px solid #91C483"
      setTimeout(() => { getQuiz(stage) }, 1000);
    }

    const updateProgress = (stage) => {
      $progess.value = stage * (100 / data.length);
    }

    const gameEnd = () => {
      const $quizResult = get(".quiz-result");
      let comment = "";
      if (sol === data.length) {
        comment = "🎉 만점 🎉"
      } else {
        comment = "😭 까비 😭"
      }

      $quizResult.innerHTML = `
      <span class="result-comment">${comment}</span>
      <span class="result-score">${sol} / ${data.length}</span>
      `
      $conResult.style.display = "flex";
    }

    const restartGame = () => {
      window.location.reload();
    }


    const init = () => {

      window.addEventListener('DOMContentLoaded', () => {

        getQuiz(stage);
      })
      $quizForm.addEventListener('click', getAnswer)
      $playBtn.addEventListener('click', togglePlay);
      $restartBtn.addEventListener('click', restartGame);
    };

    init();
  })()