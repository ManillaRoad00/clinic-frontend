fetch("http://localhost:3000/reception/reportedvisits", {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
})
  .then((response) => response.json())
  .then((data) => {
    const tabelaWizyt = document.getElementById("tabela-wizyt-zgloszonych");
    tabelaWizyt.innerHTML = ""; // Czyszczenie tabeli przed wstawieniem nowych danych
    data.forEach((wizyta) => {
      const row = document.createElement("tr");
      row.classList.add("table-success");
      row.innerHTML = `
          <td>${wizyta.id}</td>
          <td>${wizyta.doctor_surname}</td>
          <td>${wizyta.patient_name} ${wizyta.patient_surname}</td>
          <td>${wizyta.patient_pesel}</td>
          <td style="display: none;">${wizyta.patient_id}</td>
          <td style="display: none;">${wizyta.doctor_id}</td>
          <td style="display: none;">${wizyta.about_visit}</td>
          <td><button class="btn btn-primary">Ustaw date</button></td>
        `;
      tabelaWizyt.appendChild(row);
      const button = row.querySelector("button");
      button.addEventListener("click", () => {
        // Tutaj możesz wywołać swoją funkcję w przypadku błędu
        handleErrorButtonClick(wizyta.id, wizyta.doctor_id, wizyta.patient_id, wizyta.about_visit);
      });
    });
  })
  .catch((error) => {
    console.error("Błąd podczas pobierania danych o wizytach:", error);
  });

function handleErrorButtonClick(visitId, doctorId, patientId, aboutVisit) {
  window.open(`../setdatevisitpage.html?id=${visitId}&doctorId=${doctorId}&patientId=${patientId}&aboutVisit=${aboutVisit}`, "_blank");
  // Dodaj tutaj dowolną logikę, którą chcesz uruchomić po kliknięciu przycisku w przypadku błędu
}
