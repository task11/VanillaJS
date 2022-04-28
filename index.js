; (function () {
  'use strict';

  const $form = document.querySelector(".edit-form");
  const $formBtns = document.querySelector(".form_btn");
  const $titleInput = document.querySelector(".title");
  const $pathInput = document.querySelector(".path");
  const $editBtn = document.querySelector(".container-edit");

  const editToggleOn = (e) => {
    let id = e.target.dataset.toggleId;
    if (!id) return;
    let elem = document.getElementById(id);
    elem.hidden = !elem.hidden;
  };

  const submitForm = (e) => {
    e.preventDefault();
    console.log($titleInput.value);
    console.log($pathInput.value);
  };

  const init = () => {

    window.addEventListener('DOMContentLoaded', () => {
    });

    $editBtn.addEventListener('click', editToggleOn);
    $form.addEventListener('submit', submitForm);
  };

  init();
})();