fetch("http://localhost:3000/reception/acceptedvisits", {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
})
  .then((response) => response.json())
  .then((data) => {
    const tabelaWizyt = document.getElementById("tabela-wizyt");
    tabelaWizyt.innerHTML = ""; // Czyszczenie tabeli przed wstawieniem nowych danych
    data.forEach((wizyta) => {
      const row = document.createElement("tr");
      row.classList.add("table-success");
      row.innerHTML = `
            <td>${wizyta.id}</td>
            <td>${wizyta.date_hour}</td>
            <td>${wizyta.patient_name} ${wizyta.patient_surname}</td>
            <td><button class="btn btn-primary">Przyjmij</button></td>
          `;
      tabelaWizyt.appendChild(row);
      const button = row.querySelector("button");
      button.addEventListener("click", () => {
        handleErrorButtonClick(wizyta.id);
      });
    });
  })
  .catch((error) => {
    console.error("Błąd podczas pobierania danych o wizytach:", error);
  });

function handleErrorButtonClick(visitId, doctorId, patientId, aboutVisit) {
  window.open(
    `./editvisit.html?id=${visitId}&doctorId=${doctorId}&patientId=${patientId}&aboutVisit=${aboutVisit}`,
    "_blank"
  );
}
