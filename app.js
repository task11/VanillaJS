const loginInput = document.querySelector("#login-form input");
const loginButton = document.querySelector("#login-form button");

function onLoginBtnClick() {
  const username = loginInput.value;

  if (username === "") {
    alert("Please enter your name")
  } else if (username.length > 15) {
    alert("Your name is too long")
  }

}

loginButton.addEventListener("click", onLoginBtnClick)

