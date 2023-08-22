import { Server } from "socket.io";
import logger from "./helper/logger/index.js";

let socketServer;

export const createSocketServer = (httpServer) => {
	socketServer = new Server(httpServer);
	socketServer.on("connection", (socket) => {
		logger.info("Nuevo cliente conectado");
		socket.on("message", async (data) => {
			await fetch("http://http://localhost/:8080/api/chat", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});
			let messagesLogs = await fetch("http://http://localhost/:8080/api/chat", {
				method: "GET",
			});
			console.log('messagesLogs', messagesLogs)
			socketServer.emit("messagesLogs", await messagesLogs.json());
		});
	});
}

export default socketServer;