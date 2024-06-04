async function updatePatientData() {
  var firstName = document.getElementById("firstNamePatient").value;
  var lastName = document.getElementById("lastNamePatient").value;
  var gender = document.getElementById("genderPatient").value;
  var birthdate = document.getElementById("birthdatePatient").value;
  var pesel = document.getElementById("peselPatient").value;
  var phone = document.getElementById("phonePatient").value;

  // Sprawdzenie, czy pola nie są puste
  if (!firstName || !lastName || !gender || !birthdate || !pesel || !phone) {
    alert("Proszę wypełnić wszystkie pola.");
    return;
  }

  try {
    // Pobranie tokena JWT z lokalnego stanu aplikacji (np. localStorage)
    const token = localStorage.getItem('token'); // Załóżmy, że token jest przechowywany w localStorage

    // Wysłanie danych do serwera wraz z tokenem JWT
    const upadateResponse = await fetch(
      "http://localhost:3000/updateDataPatient",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` // Dodanie tokena JWT do nagłówka Authorization
        },
        body: JSON.stringify({
          firstName,
          lastName,
          gender,
          birthdate,
          pesel,
          phone,
        }),
      }
    );

    if (upadateResponse.status == 200) {
      alert("Dane Zapisane pomyślnie!");
    } else {
      alert(`Błąd!: ${await upadateResponse.text()}`);
    }
  } catch (err) {
    console.error("Błąd podczas wysyłania danych:", err);
    alert(
      `Wystąpił błąd podczas zapisu danych. Spróbuj ponownie. Błąd: ${err}`
    );
  }
}
