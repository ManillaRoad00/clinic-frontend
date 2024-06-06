// Odczytanie parametrów URL po załadowaniu strony
document.addEventListener("DOMContentLoaded", () => {
  params = getUrlParams();
  const visitId = params["id"];

  if (visitId) {
    document.getElementById("visitid").innerHTML = visitId;
  }

  // Wywołanie funkcji showdateaboutvisit z parametrem visitId
  showdateaboutvisit(visitId);
});
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

async function showdateaboutvisit(visitId) {
  var rozpoznanie = document.getElementById("note").value;
  try {
    // Wysłanie danych do serwera
    const dateaboutpatientResponse = await fetch(
      `http://localhost:3000/showdateaboutvisit/${visitId}`,
      {
        //mode: 'no-cors',
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
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

        // Wstawianie wartości do elementów HTML
        document.getElementById("name").innerHTML = name;
        console.log(`name=${name}`)
        document.getElementById("last_name").innerHTML = surname;
        console.log(`surname=${surname}`)
        document.getElementById("pesel").innerHTML = pesel;
        document.getElementById("age").innerHTML = birth_date;
        document.getElementById("sex").innerHTML = gender;
        document.getElementById("reason").innerHTML = aboutVisit;
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
    alert(``
      `Wystąpił błąd podczas zatwierdzania wizyty. Spróbuj ponownie. Błąd: ${err}`
    );
  }
}
