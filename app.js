const h1 = document.querySelector("div.hello:first-child h1");

function handleTitleClick() {
  const activeClass = "active";
  h1.classList.toggle(activeClass);
}

h1.addEventListener("click", handleTitleClick);
