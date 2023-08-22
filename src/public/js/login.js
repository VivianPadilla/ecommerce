const formLogin = document.querySelector('#form-login')
const register = document.querySelector('#register')

const email = document.querySelector('#email')
const password = document.querySelector('#password')

formLogin.addEventListener('submit', async (e) => {
  e.preventDefault();

  const userLogin = {
    email: email.value,
    password: password.value,
  }

  const response = await fetch("http://localhost:8080/api/sessions/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userLogin),
  }
  );

  if (response.status === 200) {
    window.location.replace("/products");
  } else {
    alert("Ups! El usuario o la contraseña son incorrectos")
  }
})

register.addEventListener("click", () => {
  window.location.replace("/register");
});
