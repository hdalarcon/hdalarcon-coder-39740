import express from 'express';
import ProductManager from './productManager.js';
 
const productManager = new ProductManager();

const products = await productManager.getProducts();

const app = express();

app.use(express.urlencoded({extended:true}));

app.get('/products',(req,res)=>{
    let limit = req.query.limit
    if (!limit){
        res.send({Products : products}) 
    } else if (isNaN(limit) || limit > 10){
        res.send({ error: 'Para realizar una búsqueda con límite debe ingresar un número del 1 al 10.' })
    } else {
        let productsFilter = products.slice(0, limit)
        res.send({ Products : productsFilter })
    }
})

app.get('/products/:pid',(req,res)=>{

    const pid = +req.params.pid;
    const product = products.find(p => p.id === pid);

    if(!product){
        res.send({error: `Producto con id ${pid} no existe.`})
    }
    res.send(product);

})


const PORT = 8080;
app.listen(PORT, ()=>{
    console.log(`Servidor escuchando en puerto ${PORT}`)
})