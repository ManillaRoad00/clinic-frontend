// function register() {
//   const username = document.getElementById("usernameR").value.trim();
//   const password = document.getElementById("passwordR").value.trim();
//   const passwordagain = document.getElementById("passwordagainR").value.trim();
//   const checkboxAccept = document.getElementById("checkboxaccept").checked;

//   if (username === "" || password === "" || passwordagain === "") {
//     alert("Uzupełnij Dane!");
//   } else if (!checkboxAccept) {
//     alert("Zaakcpetuj regulamin aby się zarejestrować!");
//   } else {
//     window.location.href = "login.html";
//   }
// }


function register() {
  var username = document.getElementById('usernameR').value;
  var password = document.getElementById('passwordR').value;

  // Sprawdzenie, czy pola nie są puste
  if (!username || !password) {
      alert('Proszę wypełnić wszystkie pola.');
      return;
  }


  // Wysłanie danych do serwera
  fetch('http://localhost:3000/register', {
      // mode: 'no-cors',
      method: 'POST',
headers: {
"Content-Type": "application/json",
// 'Content-Type': 'application/x-www-form-urlencoded',
},
body: JSON.stringify({ username, password }),
  })
  .then(response => response.json())
  .then(data => {
      if (data.success) {
          alert('Użytkownik zarejestrowany pomyślnie!');
          window.location.href = "login.html";
      } else {
          alert('Błąd podczas rejestracji. Spróbuj ponownie.');
      }
  })
  .catch(error => {
      console.error('Błąd podczas wysyłania danych:', error);
      alert('Wystąpił błąd podczas rejestracji. Spróbuj ponownie.');
  });
}
