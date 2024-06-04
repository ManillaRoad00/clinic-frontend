document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const username = document.getElementById("username");
  const password = document.getElementById("password");
  var button = document.getElementById("buttonLogin");

  button.onclick = validationLogin;

  // Walidacja formularza przy próbie wysłania
  function validationLogin() {
    let isValid = true;

    if (!isValid) {
      event.preventDefault(); // Zatrzymanie domyślnego wysyłania formularza
    } else {
      //jesli walidacja sie powiedzie
      logged();
      event.preventDefault(); // Zatrzymanie domyślnego wysyłania formularza, ponieważ logowanie jest obsługiwane asynchronicznie
    }
  }
});
