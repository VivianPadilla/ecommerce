const cartId = document.currentScript.getAttribute("data-user-cart-id");

document.getElementById("buy-now").addEventListener("click", async () => {
	const response = await fetch(`http://http://localhost/:8080/api/carts/${cartId}/purchase`, {
		method: "POST",
	});
	if (response.status === 200) {
		alert("Compra realizada");
	} else {
		alert("Error al realizar la compra");
	}

	const responseTicket = await fetch(`http://http://localhost/:8080/api/tickets`, {
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