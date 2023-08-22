import productsController from "../../controllers/products.controller.js";
import { Router } from "express";
var router = Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: Obtener productos
 *     description: Trae todos los productos, con un limite de 10 productos por seccion y tambien tiene paginacion.
 *     responses:
 *        200: 
 *          description: Productos obtenidos correctamente
 *          schema:
 *          type: array
 *   post:
 *     summary: crear un nuevo producto
 *     description: Crea un nuevo producto
 *     responses:
 *        200: 
 *          description: Producto agregado correctamente
 *          schema:
 *          type: array
 *   put:
 *     summary: Actualiza un producto
 *     description: Actualiza un producto por el id
 *     parameters:
 *       - in: path
 *         name: pid
 *         required: true
 *         description: Id del producto a actualizar.
 *         schema:
 *           type: integer
 *     responses:
 *        200: 
 *          description: Producto actualizado correctamente
 *          schema:
 *          type: array
 */
router.get('/', productsController.getProducts);
router.post('/', productsController.addProduct);
router.put('/:pid', productsController.updateProduct);
router.delete('/:pid', productsController.deleteProduct);

export default router;
