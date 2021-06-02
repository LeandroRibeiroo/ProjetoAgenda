import validator from "validator";

export default class Valida_Login {
  constructor() {
    this.form = document.querySelector(".form-login");
  }

  init() {
    this.events();
  }

  events() {
    if (!this.form) return;
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.validate(e);
    });
  }

  validate(e) {
    const el = e.target;
    let error = false;

    for (let errorText of this.form.querySelectorAll(".error-text")) {
      errorText.remove();
    }
    for (let campo of this.form.querySelectorAll(".form-control-login")) {
      const label = campo.previousElementSibling.innerText;
      if (!campo.value) {
        this.showError(campo, `"${label}" deve ser preenchido.`);
        error = true;
      }
    }
    if (!error) el.submit();
  }

  showError(campo, msg) {
    const errorMsg = document.createElement("div");
    errorMsg.innerHTML = msg;
    errorMsg.style.color = "red";
    errorMsg.classList.add("error-text");
    campo.insertAdjacentElement("afterend", errorMsg);
  }
}
