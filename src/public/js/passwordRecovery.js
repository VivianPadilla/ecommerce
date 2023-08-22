const registerUser = document.querySelector('#form-password-recovery')
const login = document.querySelector('#login')

registerUser.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;

  const responseFindEmail = await fetch(
    `http://localhost:8080/api/sessions/${email}`,
    {
      method: "GET",
    }
  );

  const emailData = await responseFindEmail.json();

  if (emailData.status !== "success") {
    return alert("Error! El correo electrónico no existe")
  }

  const token = await fetch(
    `http://localhost:8080/api/tokens`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const tokenResponse = await token.json();

  const response = await fetch(
    `http://localhost:8080/api/mails/mail-reset-password/${email}/${tokenResponse.token}`,
    {
      method: "GET",
    }
  );

  const responseData = await response.json();
  if (responseData.status === "success") {
    window.location.replace("/login");
  }
});

login.addEventListener("click", () => {
  window.location.replace("/login");
});