async function logged() {
  var email = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  // Sprawdzenie, czy pola nie są puste
  if (!email || !password) {
    alert("Proszę wypełnić wszystkie pola.");
    return;
  }

  try {
    // Wysłanie danych do serwera
    const loginResponse = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (loginResponse.status === 200) {
      const data = await loginResponse.json();
      const token = data.token;
      localStorage.setItem("token", token); // Zapisanie tokena w localStorage
      localStorage.setItem("email", email); // Zapisanie emaila w localStorage
      handleToken(token); // Przetwarzanie tokena
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

function handleToken(token) {
  const payload = decodeToken(token);
  console.log("Decoded Payload:", payload);

  // Przekierowanie na podstawie roli użytkownika
  if (payload.type === "doctor") {
    window.location.href = "./uiDoctor/myaccountdoctor.html";
  } else if (payload.type === "receptionist") {
    window.location.href = "./uiWorker/myaccountreception.html ";
  } else if (payload.type === "patient") {
    window.location.href = "./uiPatient/myaccountdata.html ";
  } else {
    alert("Nieznana rola użytkownika");
  }
}

function decodeToken(token) {
  const payloadBase64 = token.split(".")[1];
  const payload = JSON.parse(atob(payloadBase64));
  return payload;
}
