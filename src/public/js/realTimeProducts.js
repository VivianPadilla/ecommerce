const socket = io();

socket.on("productAdded", (product) => {
  const container = document.getElementById("container");
  const div = document.createElement("div");
  div.className = "col-lg-4 col-md-12 mb-4";
  const productLabels = [
    "",
    "",
    "",
    "Categoria:",
    "",
    "Código:",
    "Existencias:",
    "Dueño del producto:",
    "Id del producto:",
  ];
  const productValues = [
    product.images,
    product.title,
    product.description,
    product.category,
    product.price,
    product.code,
    product.stock,
    product.owner,
    product._id,
  ];

  productLabels.forEach((label, index) => {
    let html;
    if (index === 0) {
      html = document.createElement("img");
      html.src = productValues[index];
      html.className = "w-100";
    } else {
      html = document.createElement("p");
      const strong = document.createElement("strong");
      strong.textContent = label;
      const texto = document.createTextNode(productValues[index]);
      productLabels[index] ? html.appendChild(strong) : null;
      html.appendChild(texto);
    }
    div.appendChild(html);
  });
  container.appendChild(div);
});

socket.on("productDeleted", (productIdDeleted) => {
  const container = document.getElementById("container");
  const productsList = container.getElementsByClassName("col-lg-4");

  for (let i = 0; i < productsList.length; i++) {
    const product = productsList[i];
    const productId = product.getAttribute("data-id");
    if (productId === productIdDeleted.toString()) {
      product.remove();
      break;
    }
  }
});

document
  .getElementById("formAddProduct")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    const code = document.getElementById("code").value;
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const price = document.getElementById("price").value;
    const stock = document.getElementById("stock").value;
    const category = document.getElementById("category").value;
    const status = document.getElementById("status").value;
    const images = document.getElementById("images").value;

    const product = {
      code: parseInt(code),
      title,
      description,
      price: parseInt(price),
      stock: parseInt(stock),
      category,
      status,
      images: [images],
    };

    const response = await fetch("http://http://localhost/:8080/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    if (response.status === 200) {
      alert("Producto creado");
      // document.getElementById("formAddProduct").reset();
    } else {
      alert("Error al agregar el producto");
    }
  });

document
  .getElementById("formDeleteProduct")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    const productId = document.getElementById("productId").value;
    const response = await fetch(
      `http://http://localhost/:8080/api/products/${productId}`,
      {
        method: "DELETE",
      }
    );
    if (response.status === 200) {
      alert("Producto eliminado");
      document.getElementById("formDeleteProduct").reset();
    } else {
      alert("Error al eliminar el producto");
    }
  });

const page = document.currentScript.getAttribute("data-page");
let hasNextPage = document.currentScript.getAttribute("data-has-next-page");
let hasPrevPage = document.currentScript.getAttribute("data-has-prev-page");
const prevPageButton = document.getElementById("prev-page-btn");
const nextPageButton = document.getElementById("next-page-btn");

hasPrevPage = hasPrevPage === "true";
hasNextPage = hasNextPage === "true";

prevPageButton.disabled = !hasPrevPage;
nextPageButton.disabled = !hasNextPage;

prevPageButton.addEventListener("click", () => {
  window.location.href = `/realtimeproducts?page=${parseInt(page) - 1
    }`;
});

nextPageButton.addEventListener("click", () => {
  window.location.href = `/realtimeproducts?page=${parseInt(page) + 1
    }`;
});
