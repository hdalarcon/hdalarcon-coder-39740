import { Router } from "express";
import ProductManager from "../controllers/productManager.js";


const viewsRouter = Router();
const productManager = new ProductManager();

viewsRouter.get('/', async(req,res)=>{
    const listProducts = await productManager.getProducts();
    res.render('home',{title: 'Lista de productos:',listProducts});
});

export default viewsRouter;