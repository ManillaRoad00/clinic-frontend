var button = document.getElementById("buttonRegistrationVisit");
button.onclick = registration;

async function registration(doctorsData) {
  var doctor = document.getElementById("chooseDoctor").value;
  //var doctor = doctorsData.find((doctor) => doctor.id === selectedDoctorId);
  var description = document.getElementById("provideadescription").value;

  // Sprawdzenie, czy pola nie są puste
  if (!description) {
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
      showNotification();
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

function showNotification() {
  var notification = document.getElementById("notification");
  notification.style.display = "block"; // Pokaż powiadomienie

  // Ukryj powiadomienie po 3 sekundach
  setTimeout(function () {
    notification.style.display = "none";
  }, 4000);
}
