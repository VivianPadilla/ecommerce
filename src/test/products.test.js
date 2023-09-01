import supertest from "supertest";
import chai from "chai";
import express from "express";
import mongoose from "mongoose";
import config from "../config/config.js";
import products from "../routes/backend/products.router.js";
import productManager from "../dao/dataBaseManager/productManager.js";
// import { getProducts } from "../controllers/products.controller.js";

const expect = chai.expect;
const URL = config.mongoUrl;
mongoose.connect(URL);

describe('Products', () => {
	// it("returns the correct product when a valid ID is provided", async () => {
	// 	// Crea un producto de ejemplo en la base de datos
	// 	const productManager = new productManager();
	// 	const newProduct = {
	// 		title: "Producto de prueba",
	// 		description: "Descripción del producto de prueba",
	// 		category: "Categoría de prueba",
	// 		price: 10,
	// 		stock: 100,
	// 	};
	// 	const createdProduct = await productManager.addProduct(newProduct);
	// 	expect(response.status).to.equal(200);
	// 	expect(response.body.result).to.equal("success");
	// });

	// it('should retrieve products and respond with proper links', async () => {
	// 	const req = {
	// 		query: {
	// 			limit: 10,
	// 			page: 1,
	// 			sort: 'some-sort',
	// 			query: 'some-query',
	// 		},
	// 	};
	// 	const products = {
	// 		docs: ['product1', 'product2'],
	// 		totalPages: 2,
	// 		prevPage: 1,
	// 		nextPage: 2,
	// 		page: 1,
	// 		hasPrevPage: true,
	// 		hasNextPage: true,
	// 	};
	// 	const res = {
	// 		status: (statusCode) => ({
	// 			send: (data) => {
	// 				statusCode.should.equal(200);
	// 				data.should.deep.equal({
	// 					status: 'success',
	// 					payload: products.docs,
	// 					totalPages: products.totalPages,
	// 					prevPage: products.prevPage,
	// 					nextPage: products.nextPage,
	// 					page: products.page,
	// 					hasPrevPage: products.hasPrevPage,
	// 					hasNextPage: products.hasNextPage,
	// 					prevLink: '/api/products?page=0',
	// 					nextLink: '/api/products?page=2',
	// 				});
	// 			},
	// 		}),
	// 	};
	// 	await getProducts(req, res);
	// });

	// it('debería manejar errores y responder con un estado 500', async () => {
	// 	const req = {
	// 		query: {},
	// 	};

	// 	const errorMessage = 'Algún mensaje de error';

	// 	const res = {
	// 		status: (statusCode) => ({
	// 			send: (data) => {
	// 				statusCode.should.equal(500);
	// 				data.should.deep.equal({
	// 					status: 'error',
	// 					error: errorMessage,
	// 				});
	// 			},
	// 		}),
	// 	};

	// 	await getProducts(req, res);
	// });
});
