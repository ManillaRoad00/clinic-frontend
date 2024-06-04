document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const username = document.getElementById("usernameR");
  const password = document.getElementById("passwordR");
  const passwordagain = document.getElementById("passwordagainR");
  var button = document.getElementById("buttonRegister");

  button.onclick = validationRegister;

  // Walidacja formularza przy próbie wysłania
  function validationRegister() {
    let isValid = true;

    if (!isValid) {
      event.preventDefault(); // Zatrzymanie domyślnego wysyłania formularza
    } else {
      //jesli walidacja sie powiedzie
      register();
      event.preventDefault(); // Zatrzymanie domyślnego wysyłania formularza, ponieważ logowanie jest obsługiwane asynchronicznie
    }
  }
});

//wyswietlanie komunikatow na stronie przydatne dla użytkownikow.............................................................................................

//pierwsze pole hasła:
var passwordInput = document.getElementById("passwordR");
var messageElement1 = document.getElementById("passwordMessage1");

//nasłuchiwacz zdarzeń na pole hasła
passwordInput.addEventListener("input", function () {
  var password = passwordInput.value;
  var passwordRegex = /^(?=.*\d)(?=.*[!@#$%&])[A-Za-z\d!@#$%&]{8,50}$/;

  if (!passwordRegex.test(password)) {
    // Jeśli hasło nie spełnia wymagań
    passwordInput.style.borderColor = "red";
    messageElement1.style.display = "block";
  } else {
    // Jeśli hasło spełnia wszystkie wymagania
    passwordInput.style.borderColor = "";
    messageElement1.style.display = "none";
  }
});

//drugie pole hasła:
var passwordInput = document.getElementById("passwordR");
var confirmPasswordInput = document.getElementById("passwordagainR");
var messageElement = document.getElementById("passwordMessage2");

//nasłuchiwacz zdarzeń na pole hasła powtórz
confirmPasswordInput.addEventListener("input", function () {
  var password = passwordInput.value;
  var confirmPassword = confirmPasswordInput.value;

  if (password !== confirmPassword) {
    // Jeśli hasła nie są takie same
    confirmPasswordInput.style.borderColor = "red";
    //confirmPasswordInput.style.backgroundColor = '#FF00004A';
    messageElement.style.display = "block";
  } else {
    // Jeśli hasła są takie same
    confirmPasswordInput.style.borderColor = "";
    confirmPasswordInput.style.backgroundColor = "";
    messageElement.style.display = "none";
  }
});
