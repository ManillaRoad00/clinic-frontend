// Funkcja do odczytania parametrów URL
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
  const doctorId = params["doctorId"];
  const patientId = params["patientId"];
  const aboutVisit = params["aboutVisit"];

  if (visitId) {
    document.getElementById("numberVisits").value = visitId;
  }
});

async function setdatevisit() {
  var date = document.getElementById("set_date_visit").value;
  var hour = document.getElementById("set_time_visit").value;
  var doctorId = params["doctorId"];
  var patientId = params["patientId"];
  var aboutVisit = params["aboutVisit"];
  var visitId = params["id"];
  // Sprawdzenie, czy pola nie są puste
  if (!date || !hour) {
    alert("Proszę Ustawić Date!");
    return;
  }

  try {
    // Wysłanie danych do serwera
    const addVisitResponse = await fetch("http://localhost:3000/acceptVisit", {
      //mode: 'no-cors',
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        doctorId,
        patientId,
        aboutVisit,
        date,
        hour,
        visitId,
      }),
    });
    if (addVisitResponse.status == 200) {
      //alert("Wizyta zatwierdzona!");
      //deleteVisitReported();
      window.close();
    } else {
      alert(
        `Blad podczas zatwierdzania wizyty: ${await addVisitResponse.text()}`
      );
    }
  } catch (err) {
    console.error("Błąd podczas wysyłania danych:", err);
    alert(
      `Wystąpił błąd podczas zatwierdzania wizyty. Spróbuj ponownie. Błąd: ${err}`
    );
  }
}
