// Wywołanie funkcji z danymi pobranymi z serwera
fetch("http://localhost:3000/doctors", {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
})
  .then((response) => response.json())
  .then((data) => {
    addDoctorsToSelect(data); // Wywołanie funkcji z danymi pobranymi z serwera
    console.log(data);
    button.onclick = function () {
      registration(data);
    };
  })
  .catch((error) => {
    console.error("Błąd podczas pobierania danych o lekarzach:", error);
  });

function addDoctorsToSelect(doctorsData) {
  const selectElement = document.getElementById("chooseDoctor");

  // Czyszczenie listy przed dodaniem nowych elementów
  selectElement.innerHTML = "";

  // Dodawanie nowych elementów do listy
  doctorsData.forEach((doctor) => {
    const option = document.createElement("option");
    option.value = doctor.id; // Ustawienie wartości elementu option
    option.textContent = doctor.name + " " + doctor.surname; // Ustawienie tekstu wyświetlanego w opcji
    selectElement.appendChild(option); // Dodanie opcji do selecta
  });
}
