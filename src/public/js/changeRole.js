const btnChangeRol = document.querySelector("#btn-change-rol")
const formChangeRol = document.querySelector("#form-change-rol")

const userId = document.currentScript.getAttribute("data-user-id")
const userRol = document.currentScript.getAttribute("data-user-rol")
const products = document.querySelector('#products')

btnChangeRol.addEventListener("click", async () => {
  let document = ""
  if (userRol === "user") {
    const formData = new FormData(formChangeRol)
    const files = await fetch(
      `/api/users/${userId}/documents`,
      {
        method: "POST",
        body: formData,
      }
    );

    document = await files.json()
    if (document.status !== "success") {
      alert("Ups! no se pudieron cargar los archivos")
    }
  }

  const rolId = await fetch(
    `/api/users/premium/${userId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const responseRolId = await rolId.json()
  if (responseRolId.status !== "success") {
    alert("Ups! todos los archivos son obligatorios")
  }

  if (responseRolId.status === "success" && document.status === "success") {
    window.location.replace("/logout");
  }
});

products.addEventListener("click", () => {
  window.location.replace("/products");
});
