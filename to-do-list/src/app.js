; (function () {
  'use strict'

  const get = (target) => {
    return document.querySelector(target)
  };

  const TODO_URL = 'http://localhost:3001/todos';

  const $todos = get('.todos');
  const $todoForm = get('.todo_form');
  const $todoInput = get('.todo_input');

  const createTodoElement = (item) => {
    const { id, content, completed } = item;
    const $todoItem = document.createElement('div');
    const isChecked = completed ? 'checked' : '';

    $todoItem.classList.add('item');
    $todoItem.dataset.id = id;
    $todoItem.innerHTML = `
            <div class="content">
              <input
                type="checkbox"
                class='todo_checkbox'
                ${isChecked}
              />
              <label>${content}</label>
              <input type="text" value="${content}" />
            </div>
            <div class="item_buttons content_buttons">
              <button class="todo_edit_button">
                <i class="far fa-edit"></i>
              </button>
              <button class="todo_remove_button">
                <i class="far fa-trash-alt"></i>
              </button>
            </div>
            <div class="item_buttons edit_buttons">
              <button class="todo_edit_confirm_button">
                <i class="fas fa-check"></i>
              </button>
              <button class="todo_edit_cancel_button">
                <i class="fas fa-times"></i>
              </button>
            </div>
      `;
    return $todoItem;
  };

  const renderAllTodos = (todos) => {
    $todos.innerHTML = '';
    todos.forEach(items => {
      const todoElement = createTodoElement(items);
      $todos.appendChild(todoElement);
    })
  };

  const getTodos = () => {
    fetch(TODO_URL)
      .then((res) => res.json())
      .then((todos) => renderAllTodos(todos))
      .catch((error) => console.error(error));
  };

  const setTodo = (e) => {
    e.preventDefault();

    const todo = {
      content: $todoInput.value,
      completed: false,
    }

    fetch(TODO_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(todo)
    }).then(getTodos)
      .then(() => {
        $todoInput.value = '';
        $todoInput.focus();
      })
      .catch((e) => {
        console.error(e);
      })
  };

  const toggleTodo = (e) => {

    if (!e.target.classList.contains('todo_checkbox')) return

    const $item = e.target.closest('.item');
    const id = $item.dataset.id;
    const completed = e.target.checked;


    fetch(`${TODO_URL}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        completed
      })
    })
      .then(getTodos)
      .catch((e) => {
        console.error(e);
      })

  };

  const changeEditMode = (e) => {
    const $item = e.target.closest('.item');
    const $label = $item.querySelector('label');
    const $editInput = $item.querySelector('input[type="text"]');
    const $contentButtons = $item.querySelector('.content_buttons');
    const $editButtons = $item.querySelector('.edit_buttons');

    const value = $label.innerText;

    if (e.target.classList.contains('todo_edit_button')) {
      $label.style.display = 'none';
      $editButtons.style.display = 'block';
      $contentButtons.style.display = 'none';
      $editInput.style.display = 'block';

      $editInput.focus();
      $editInput.value = '';
      $editInput.value = value;
    }

    if (e.target.classList.contains('todo_edit_cancel_button')) {
      $label.style.display = 'block';
      $editButtons.style.display = 'none';
      $contentButtons.style.display = 'block';
      $editInput.style.display = 'none';

      $editInput.value = value;

    }
  }

  const editTodo = (e) => {
    if (!e.target.classList.contains('todo_edit_confirm_button')) return

    const $item = e.target.closest('.item');
    const $editInput = $item.querySelector('input[type="text"]');
    const id = $item.dataset.id;


    fetch(`${TODO_URL}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content: $editInput.value
      })
    })
      .then(getTodos)
      .catch((e) => {
        console.error(e);
      })
  }


  const init = () => {

    window.addEventListener('DOMContentLoaded', () => {
      getTodos();
    })

    $todoForm.addEventListener('submit', setTodo);
    $todos.addEventListener('click', toggleTodo);
    $todos.addEventListener('click', changeEditMode);
    $todos.addEventListener('click', editTodo);
    $todos.addEventListener('click', deleteTodo);
  };

  init();
})()
