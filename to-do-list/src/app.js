; (function () {
  'use strict'

  const get = (target) => {
    return document.querySelector(target)
  };

  const TODO_URL = 'http://localhost:3001/todos';

  const $todos = get('.todos');
  const $todoForm = get('.todo_form');
  const $todoInput = get('.todo_input');
  const $pagination = get('.pagination');

  const totalDataCount = 53;
  const pageCount = 5;
  const limit = 5;
  let currentPage = 1;

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

  const pagination = (item) => {
    let totalPage = Math.ceil(totalDataCount / limit);
    let pageGroup = Math.ceil(currentPage / pageCount);

    let lastPage = pageGroup * pageCount;
    if (lastPage > totalPage) {
      lastPage = totalPage;
    }
    let firstPage = lastPage - (pageCount - 1);

    const next = lastPage + 1;
    const prev = firstPage - 1;

    let html = '';

    if (prev > 0) {
      html += `<button class="prev" data-fn="prev">이전</button>`;
    }

    for (let i = firstPage; i <= lastPage; i++) {
      html += `<button class="pageNumber" id="page_${i}">${i}</button>`;
    }

    if (lastPage < totalPage) {
      html += `<button class="next" data-fn="next">다음</button>`;
    }

    $pagination.innerHTML = html;

    const $currentPageNumber = get(`.pageNumber#page_${currentPage}`);
    $currentPageNumber.style.color = '#9dc0e9'

    const $currentPageNumbers = document.querySelectorAll('.pagination button');
    $currentPageNumbers.forEach(button => {
      button.addEventListener('click', () => {
        if (button.dataset.fn === 'prev') {
          currentPage = prev;
        } else if (button.dataset.fn === 'next') {
          currentPage = next;
        } else {
          currentPage = button.innerText
        }
        pagination();
        getTodos();
      })
    })


  };

  const renderAllTodos = (todos) => {
    $todos.innerHTML = '';
    todos.forEach(items => {
      const todoElement = createTodoElement(items);
      $todos.appendChild(todoElement);
    })
  };

  const getTodos = () => {
    fetch(`${TODO_URL}/?_page=${currentPage}&_limit=${limit}`)
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

  const deleteTodo = (e) => {
    if (!e.target.classList.contains('todo_remove_button')) return

    const $item = e.target.closest('.item');
    const id = $item.dataset.id;
    const confirm = window.confirm('Are you sure you want to delete?');

    if (confirm) {
      fetch(`${TODO_URL}/${id}`, {
        method: 'DELETE',
      })
        .then(getTodos)
        .catch((e) => {
          console.error(e);
        })
    } else return;
  }


  const init = () => {

    window.addEventListener('DOMContentLoaded', () => {
      getTodos();
      pagination();
    })

    $todoForm.addEventListener('submit', setTodo);
    $todos.addEventListener('click', toggleTodo);
    $todos.addEventListener('click', changeEditMode);
    $todos.addEventListener('click', editTodo);
    $todos.addEventListener('click', deleteTodo);
  };

  init();
})()
