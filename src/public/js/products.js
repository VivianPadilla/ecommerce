const page = document.currentScript.getAttribute("data-page");
let hasNextPage = document.currentScript.getAttribute("data-has-next-page");
let hasPrevPage = document.currentScript.getAttribute("data-has-prev-page");
const cartId = document.currentScript.getAttribute("data-user-cart-id");
const userId = document.currentScript.getAttribute("data-user-id");
const prevPageButton = document.getElementById("prev-page-btn");
const nextPageButton = document.getElementById("next-page-btn");
const addToCartButton = document.querySelectorAll(".add-to-cart");
const userRole = document.currentScript.getAttribute("data-user-rol");
const createProducts = document.querySelector("#create-products");


userRole === "user" ? createProducts.style.display = "none" : createProducts.style.display = "block"

hasPrevPage = hasPrevPage === "true";
hasNextPage = hasNextPage === "true";

prevPageButton.disabled = !hasPrevPage;
nextPageButton.disabled = !hasNextPage;

prevPageButton.addEventListener("click", () => {
  window.location.href = `/products?page=${parseInt(page) - 1
    }`;
});

nextPageButton.addEventListener("click", () => {
  window.location.href = `/products?page=${parseInt(page) + 1
    }`;
});

addToCartButton.forEach((button) => {
  button.addEventListener("click", async () => {
    const productId = button.parentNode.getAttribute("data-id");
    const response = await fetch(
      `/api/carts/${cartId}/product/${productId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      alert("Agregado al carrito");
    } else {
      alert("Error al agregar al carrito");
    }
  });
});

document.getElementById("buy-now").addEventListener("click", async () => {
  const response = await fetch(`/api/carts/${cartId}/purchase`, {
    method: "POST",
  });
  if (response.status === 200) {
    alert("Compra realizada");
  } else {
    alert("Error al realizar la compra");
  }

  const responseTicket = await fetch(`/api/tickets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (responseTicket.status === 200) {
    alert("Ticket creado");
  } else {
    alert("Error al crear el ticket");
  }
});
