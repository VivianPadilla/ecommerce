const socket = io();

let user = null;
const message = document.querySelector("#message");
const sendMessage = document.querySelector('#sendMessage')
const formChat = document.querySelector("#formChat")
const products = document.querySelector('#products')

Swal.fire({
  title: 'Ingresa tu nombre',
  input: 'text',
  text: "Ingresa tu nombre de usuario",
  showCancelButton: false,
  confirmButtonText: 'Ingresar',
  inputValidator: (value) => {
    if (!value) {
      return "El usuario es requerido"
    }
  },
  allowOutsideClick: false,
}).then((result) => {
  user = result.value;
});

// formChat.addEventListener("submit", async (event) => {
sendMessage.addEventListener('click', (event) => {
  event.preventDefault();
  socket.emit("message", {
    user: user,
    message: message.value
  });
  // message.value = ''
  formChat.reset();
});

socket.on("messagesLogs", (data) => {
  let log = document.getElementById("messageLogs");
  let messages = "";
  data.forEach((message) => {
    messages =
      messages + `
      <div class="d-flex justify-content-between">
				<p class="small mb-1">${message.user}</p>
			</div>
      <div class="d-flex flex-row justify-content-start">
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp"
            alt="avatar 1" style="width: 45px; height: 100%;">
        <div>
            <p class="small p-2 ms-3 mb-1 rounded-3" style="background-color: #f5f6f7;">${message.message}</p>          
            <p class="small ms-3 mb-3 rounded-3 text-muted">23:58</p>
        </div>
      </div>`;
  });
  log.innerHTML = messages;
});

products.addEventListener("click", () => {
  window.location.replace("/products");
});
