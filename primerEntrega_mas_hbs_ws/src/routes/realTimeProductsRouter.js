import { Router } from "express";
import ProductManager from "../controllers/productManager.js";

const realTimeProductsRouter = Router();
const productManager = new ProductManager();

realTimeProductsRouter.get('/',async(req,res)=>{
    const listProducts = await productManager.getProducts();
    res.render('realTimeProducts',{title: 'Real Time Products:',listProducts});
});

export default realTimeProductsRouter