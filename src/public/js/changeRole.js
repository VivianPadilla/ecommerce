const btnChangeRole = document.querySelector("#btn-change-role");
const formChangeRol = document.querySelector("#form-change-role");

const userId = document.currentScript.getAttribute("data-user-id");
const userRole = document.currentScript.getAttribute("data-user-role");

btnChangeRole.addEventListener("click", async () => {
  const document = "";
  if (userRole === "User") {
    const formData = new FormData(formChangeRol);

    const files = await fetch(
      `http://localhost:8080/api/users/${userId}/documents`,
      {
        method: "POST",
        body: formData,
      }
    );

    console.log('files', files)

    document = await files.json();

    console.log('documents', document)

    if (document.status !== "success") {
      alert("Ups! no se pudieron cargar los archivos")
    }
  }

  const roleId = await fetch(
    `http://localhost:8080/api/users/premium/${userId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const responseRoleId = await roleId.json();

  if (responseRoleId.status !== "success") {
    alert("Ups! todos los archivos son obligatorios")
  }

  if (responseRoleId.status === "success" && documents.status === "success") {
    window.location.replace("/logout");
  }
});
