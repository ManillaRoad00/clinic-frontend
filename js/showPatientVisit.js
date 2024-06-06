fetch("http://localhost:3000/patient/visit", {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const tabelaWizyt = document.getElementById("tabela-wizyt-pacjenta");
      tabelaWizyt.innerHTML = ""; // Czyszczenie tabeli przed wstawieniem nowych danych
      data.forEach((wizyta) => {
        const row = document.createElement("tr");
        row.classList.add("table-success");
        row.innerHTML = `
            <td>${wizyta.data}</td>
            <td>${wizyta.doctor_name} ${wizyta.doctor_surname}</td>
            <td>${wizyta.about_visit}</td>
            <td>${wizyta.status}</td>
          `;
        tabelaWizyt.appendChild(row);
      });
    })
    .catch((error) => {
      console.error("Błąd podczas pobierania danych o wizytach:", error);
    });
  