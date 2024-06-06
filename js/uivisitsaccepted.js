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
          <td>${wizyta.data} ${wizyta.date_hour}</td>
          <td>${wizyta.doctor_surname}</td>
          <td>${wizyta.patient_name} ${wizyta.patient_surname}</td>
          <td>${wizyta.patient_pesel}</td>
          <td>${wizyta.status}</td>
          <td><button class="btn btn-primary">Anuluj wizyte</button></td>
          <td style="display: none;">${wizyta.patient_id}</td>
          <td style="display: none;">${wizyta.doctor_id}</td>
          <td style="display: none;">${wizyta.about_visit}</td>
          
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
function handleErrorButtonClick(visitId) {
  fetch(`http://localhost:3000/reception/reportedvisits/${visitId}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Wystąpił problem podczas usuwania wizyty.");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Wizyta została anulowana:", data);
    })
    .catch((error) => {
      console.error("Błąd podczas usuwania wizyty:", error);
    });
}
