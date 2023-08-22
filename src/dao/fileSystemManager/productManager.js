import fs from "fs";
import { nanoid } from 'nanoid'

export class ProductManager {
  fs = fs;
  path = "./src/files/products.json"

  constructor() { }

  addProduct = async (product) => {
    const products = await this.getProducts()
    product.id = nanoid()

    if (!product.title || !product.description || !product.price || !product.category || !product.code || !product.stock || !product.status
    ) {
      console.log("Ups! Todos son obligatorios")
    }

    if (products.find((code) => code.code === code.code)) {
      console.log('El codigo ya existe');
    }
    product.status = true
    const productAll = [...products, product]
    await fs.writeFile(this.path, JSON.stringify(productAll))
    return [`Producto agregado correctamente`, product]
  }

  getProducts = async () => {
    try {
      const content = await fs.readFile(this.path, "utf-8");
      return JSON.parse(content)
    } catch (error) {
      console.log("Error")
      console.log(e.message)
    }
  }

  getProductById = async (productId) => {
    const content = await this.getProducts()
    const id = content.find(
      (product) => product.id === productId
    );
    if (!id) return "Producto no encontrado"
    return id
  }

  async updateProduct(productId, fieldsUpdate) {
    const products = await this.getProducts()
    const indexProductUpdate = products.findIndex(
      (element) => element.id === Number(productId)
    );

    if ("id" in fieldsUpdate) {
      console.log("Ups! el id no se puede actualizar");
    }
    products[indexProductUpdate] = {
      ...products[indexProductUpdate],
      ...fieldsUpdate,
    };
    await this.fs.promises.writeFile(this.path, JSON.stringify(products));
    return "Producto actualizado";
  }

  async deleteProduct(productId) {
    const products = await this.getProducts();
    const indexProductDelete = products.findIndex(
      (element) => element.id === Number(productId)
    );
    products.splice(indexProductDelete, 1);
    await this.fs.promises.writeFile(this.path, JSON.stringify(products));
    return ['Producto eliminado', productId];

  }
}
