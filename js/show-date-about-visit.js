let params;

function getUrlParams() {
  const params = {};
  const queryString = window.location.search.substring(1);
  const paramPairs = queryString.split("&");
  paramPairs.forEach((pair) => {
    const [key, value] = pair.split("=");
    params[decodeURIComponent(key)] = decodeURIComponent(value);
  });
  return params;
}

// Odczytanie parametrów URL po załadowaniu strony
document.addEventListener("DOMContentLoaded", () => {
  params = getUrlParams();
  const visitId = params["id"];

  if (visitId) {
    document.getElementById("setImiePacjenta").innerHTML = visitId;
  }
  console.log.apply(visitId);
});

document.addEventListener("DOMContentLoaded", function () {
  showdateaboutvisit();
});
async function showdateaboutvisit() {
  const visitId = params["id"];
  var rozpoznanie = document.getElementById("rozpoznanieLekarza").value;
  console.log("testtttttttttttt");
  try {
    // Wysłanie danych do serwera
    const dateaboutpatientResponse = await fetch(
      `http://localhost:3000/showdateaboutvisit/${visitId}`,
      {
        //mode: 'no-cors',
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    if (dateaboutpatientResponse.status == 200) {
      const data = await dateaboutpatientResponse.json();
      console.log(data);

      if (data.length > 0) {
        const patientData = data[0]; // Uzyskaj pierwszy obiekt z tablicy

        // Przypisanie danych do zmiennych
        const name = patientData.patient_name;
        const surname = patientData.patient_surname;
        const pesel = patientData.patient_pesel;
        const birth_date = patientData.birth_date;
        const gender = patientData.gender;
        const aboutVisit = patientData.about;

        console.log(name);

        // Wstawianie wartości do elementów HTML
        document.getElementById("setImiePacjenta").innerHTML = name;
        document.getElementById("setImiePacjenta").innerHTML = surname;
        document.getElementById("setImiePacjenta").innerHTML = pesel;
        document.getElementById("setImiePacjenta").innerHTML = birth_date;
        document.getElementById("setImiePacjenta").innerHTML = gender;
        document.getElementById("setImiePacjenta").innerHTML = aboutVisit;
      } else {
        console.warn("No patient data found.");
      }
    } else {
      alert(
        `Blad podczas zatwierdzania wizyty: ${await dateaboutpatientResponse.text()}`
      );
    }
  } catch (err) {
    console.error("Błąd podczas wysyłania danych:", err);
    alert(
      `Wystąpił błąd podczas zatwierdzania wizyty. Spróbuj ponownie. Błąd: ${err}`
    );
  }
}
