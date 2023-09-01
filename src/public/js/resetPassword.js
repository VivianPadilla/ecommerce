const token = document.currentScript.getAttribute("data-token");
const email = document.currentScript.getAttribute("data-email");

document.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch(`/api/tokens/${token}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const responseData = await response.json();

  if (responseData.status !== "success") {
    window.location.replace("/password-recovery");
  }
});

document
  .getElementById("reset-password-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    const inputPassword = document.getElementById("new-password").value;

    const newData = {
      password: inputPassword,
    };

    const responseFindByEmail = await fetch(
      `/api/sessions/${email}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      }
    );

    const responseFindByEmailData = await responseFindByEmail.json();
    if (responseFindByEmailData.status === "success") {
      window.location.replace("/login");
    } else {
      return (document.getElementById("status").textContent =
        "No puedes poner la misma contraseña anterior");
    }
  });
