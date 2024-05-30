function logged() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (username === "" && password === "") {
    alert("Uzupełnij e-mail/PESEL i hasło!");
  } else if (username === "pacjent" && password === "123") {
    window.location.href = "./uiPatient/myaccountdata.html";
  } else if (username === "lekarz" && password === "123") {
    window.location.href = "./uiDoctor/myaccountdoctor.html";
  } else if (username === "recepcja" && password === "123") {
    window.location.href = "./uiWorker/myaccountreceptionregistration.html";
  } else {
    alert("Nieprawidłowy e-mail/PESEL lub hasło");
  }
}

// function logged() {
//   var username = document.getElementById("username").value;
//   var password = document.getElementById("password").value;

//   // Sprawdzenie, czy pola nie są puste
//   if (!username || !password) {
//     alert("Proszę wypełnić wszystkie pola.");
//     return;
//   }

//   // Wysłanie danych do serwera
//   fetch("http://localhost:3000/login", {
//     // mode: 'no-cors',
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       // 'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     body: JSON.stringify({ username, password }),
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       if (data.success || data.type_user == doctor) {
//         window.location.href = "myaccountdoctor.html";
//       } else if (data.success || data.type_user == worker) {
//         window.location.href = "myaccountreceptionregistration.html";
//       } else if (data.success || data.type_user == patient) {
//         window.location.href = "myaccountdata.html";
//       } else {
//         alert("Błąd logowania. Niepoprawny login lub hasło!");
//       }
//     })
//     .catch((error) => {
//       console.error("Błąd podczas wysyłania danych:", error);
//       alert("Wystąpił błąd podczas rejestracji. Spróbuj ponownie.");
//     });
// }
