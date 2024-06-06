fetch("http://localhost:3000/patient/visit", {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
})
  .then((response) => response.json())
  .then((data) => {
    const tabelaWizyt = document.getElementById("tabela-wizyt-pacjenta");
    tabelaWizyt.innerHTML = ""; // Czyszczenie tabeli przed wstawieniem nowych danych

    // Połączenie obu tablic wizyt
    const allVisits = [...data.visitsR, ...data.visitsA];

    allVisits.forEach((wizyta) => {
      const row = document.createElement("tr");
      tabelaWizyt.appendChild(row);
      // Sprawdzenie czy wizyta.data istnieje i jest prawidłowe
      const formattedDate = wizyta.data
        ? wizyta.data.split("T")[0]
        : "Brak daty";

      const formattedDateHour =
        wizyta.date_hour !== undefined ? wizyta.date_hour : "";
      row.innerHTML = `
                <td>${formattedDate} ${formattedDateHour}</td>
                <td>${wizyta.doctor_name} ${wizyta.doctor_surname}</td>
                <td>${wizyta.about_visit || wizyta.about}</td>
                <td>${wizyta.status}</td>
              `;
      // Ustalenie klasy na podstawie statusu wizyty

      if (wizyta.status === "Niezatwierdzona") {
        row.classList.add("table-danger");
      } else if (wizyta.status === "Zatwierdzona") {
        row.classList.add("table-success");
      }
    });
    console.log(data);
  })
  .catch((error) => {
    console.error("Błąd podczas pobierania danych o wizytach:", error);
  });
