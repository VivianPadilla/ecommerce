const addUser = document.querySelector('#form-password-recovery')
const login = document.querySelector('#login')

addUser.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;

  const getEmail = await fetch(
    `/api/sessions/${email}`,
    {
      method: "GET",
    }
  );

  const emailData = await getEmail.json();

  if (emailData.status !== "success") {
    return alert("Ups! El correo electrónico no existe")
  }

  const token = await fetch(
    `/api/tokens`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const tokenResponse = await token.json();

  const response = await fetch(
    `/api/mails/mail-reset-password/${email}/${tokenResponse.token}`,
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