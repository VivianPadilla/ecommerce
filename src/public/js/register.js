const registerUser = document.querySelector('#form-register')
const login = document.querySelector('#login')

const firstName = document.querySelector('#first-name')
const lastName = document.querySelector('#last-name')
const email = document.querySelector('#email')
const age = document.querySelector('#age')
const password = document.querySelector('#password')

registerUser.addEventListener('submit', async (event) => {
  event.preventDefault();

  // cart
  const cartId = await fetch("http://http://localhost/:8080/api/carts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const cart = await cartId.json();

  // regiser
  const userRegister = {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    age: age.value,
    password: password.value,
    cart: cart.message._id,
  }
  console.log('userRegister', userRegister)

  const response = await fetch("http://http://localhost/:8080/api/sessions/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userRegister),
  }
  );

  console.log('response', response)

  const responseData = await response.json();
  if (responseData.status === "success") {
    window.location.replace("/login");
  }
})

login.addEventListener("click", () => {
  window.location.replace("/login");
});
