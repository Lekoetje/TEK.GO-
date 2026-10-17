const form = document.querySelector("#login-form");
const notice = document.querySelector("#demo-notice");
const password = document.querySelector("#password");
const reveal = document.querySelector("#reveal-password");

reveal.addEventListener("click", () => {
  const showing = password.type === "password";
  password.type = showing ? "text" : "password";
  reveal.setAttribute("aria-label", showing ? "Hide password" : "Show password");
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  notice.classList.add("visible");
});

