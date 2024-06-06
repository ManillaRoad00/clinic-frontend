var button = document.getElementById("buttonRegistrationVisit");

button.onclick = registration;

async function registration() {
  var doctor = document.getElementById("chooseDoctor").value;
  var description = document.getElementById("provideadescription").value;
  console.log("Test");
  // Sprawdzenie, czy pola nie są puste
  if (!doctor || !description) {
    alert("Proszę wypełnić wszystkie pola.");
    return;
  }

  try {
    const token = localStorage.getItem("token");
    // Wysłanie danych do serwera
    const registrationResponse = await fetch(
      "http://localhost:3000/reserve-visit",
      {
        //mode: 'no-cors',
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ doctor, description }),
      }
    );

    if (registrationResponse.status == 200) {
      alert("Zgłoszenie rejestracji wizyty zrobione pomyślnie!");
    } else {
      alert(
        `Blad podczas rejestracji wizyty: ${await registrationResponse.text()}`
      );
    }
  } catch (err) {
    console.error("Błąd podczas wysyłania danych:", err);
    alert(
      `Wystąpił błąd podczas rejestracji wizyty. Spróbuj ponownie. Błąd: ${err}`
    );
  }
}
