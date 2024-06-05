document.addEventListener("DOMContentLoaded", function () {
  const email = localStorage.getItem("email");
  if (email) {
    console.log("Logged in as:", email);
    // Możesz teraz użyć tego emaila do dalszych operacji, np. wysłania do serwera
  } else {
    console.warn("No email found in localStorage.");
  }
});

async function loadPatientDataToPage() {
  const email = localStorage.getItem("email");

  try {
    // Wysłanie danych do serwera
    const loginResponse = await fetch(
      `http://localhost:3000/loadPatientDataToPage?email=${encodeURIComponent(
        email
      )}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (loginResponse.status === 200) {
      const data = await loginResponse.json();
      console.log(data);

      if (data.length > 0) {
        const patientData = data[0]; // Uzyskaj pierwszy obiekt z tablicy

        // Przypisanie danych do zmiennych
        const name = patientData.name;
        const surname = patientData.surname;
        const gender = patientData.gender;
        const birth_date = patientData.birth_date;
        const pesel = patientData.pesel;
        const phone = patientData.phone;
        console.log(name);

        // Wstawianie wartości do elementów HTML
        document.getElementById("firstNamePatient").value = name;
        document.getElementById("lastNamePatient").value = surname;
        document.getElementById("genderPatient").value = gender;
        document.getElementById("birthdatePatient").value = birth_date;
        document.getElementById("peselPatient").value = pesel;
        document.getElementById("phonePatient").value = phone;
      } else {
        console.warn("No patient data found.");
      }
    } else {
      alert(
        `Błąd podczas logowania. Niepoprawny email lub hasło. Błąd: ${await loginResponse.text()}`
      );
    }
  } catch (err) {
    console.error("Błąd podczas wysyłania danych:", err);
    alert(`Wystąpił błąd podczas logowania. Spróbuj ponownie. Błąd: ${err}`);
  }
}

// Wywołaj funkcję po załadowaniu strony
//document.addEventListener("DOMContentLoaded", loadPatientDataToPage);
