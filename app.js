const title = document.querySelector("div.hello:first-child h1");

function handleTitleClick() {
  title.style.color = "blue"
}

function handleMouseEnter() {
  title.style.color = "blue"
}
function handleMouseLeave() {
  title.style.color = "red"
}

function handleWindowResize() {
  document.body.style.backgroundColor = "tomato";
}

function handleWindowCopy() {
  alert("Copy 하지마")
}

function handleWindowOffline() {
  alert("NO WIFI~!!!")
}

function handleWindowOnline() {
  alert("WIFI GOOD")
}

title.addEventListener("click", handleTitleClick);
title.addEventListener("mouseenter", handleMouseEnter);
title.addEventListener("mouseleave", handleMouseLeave);


window.addEventListener("resize", handleWindowResize);
window.addEventListener("copy", handleWindowCopy);

window.addEventListener("offline", handleWindowOffline);
window.addEventListener("online", handleWindowOnline);