function register() {
  const username = document.getElementById("usernameR").value.trim();
  const password = document.getElementById("passwordR").value.trim();
  const passwordagain = document.getElementById("passwordagainR").value.trim();
  const checkboxAccept = document.getElementById("checkboxaccept").checked;

  if (username === "" || password === "" || passwordagain === "") {
    alert("Uzupełnij Dane!");
  } else if (!checkboxAccept) {
    alert("Zaakcpetuj regulamin aby się zarejestrować!");
  } else {
    window.location.href = "login.html";
  }
}

async function register() {
  var email = document.getElementById('usernameR').value;
  var password = document.getElementById('passwordR').value;

  // Sprawdzenie, czy pola nie są puste
  if (!email || !password) {
      alert('Proszę wypełnić wszystkie pola.');
      return;
  }

try {
  // Wysłanie danych do serwera
  const registerResponse = await fetch('http://localhost:3000/register', {
       //mode: 'no-cors',
      method: 'POST',
      headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
  },
body: JSON.stringify({ email, password }),
  })

  if(registerResponse. status == 200) {
    alert('Użytkownik zarejestrowany pomyślnie!');
    window.location.href = "login.html";
  } else {
    alert(`Blad podczas rejestracji: ${await registerResponse.text()}`)
  }
} catch (err) {
    console.error('Błąd podczas wysyłania danych:', err);
    alert(`Wystąpił błąd podczas rejestracji. Spróbuj ponownie. Błąd: ${err}`);
}
}
