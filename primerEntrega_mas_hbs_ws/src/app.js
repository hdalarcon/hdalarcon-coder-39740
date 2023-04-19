import express from 'express';
import productRouter from './routes/productRouter.js';
import cartRouter from './routes/cartRouter.js';
import viewsRouter from './routes/viewsRouter.js';
import realTimeProductsRouter from './routes/realTimeProductsRouter.js';
import { engine } from 'express-handlebars';
import { resolve } from 'path';
import { Server } from 'socket.io';
import ProductManager from "./controllers/productManager.js";

const productManager = new ProductManager();

const listProducts = await productManager.getProducts();

const products = listProducts;

void(async()=>{
    try {
        const app  = express();

        app.use(express.json());
        app.use(express.urlencoded({extended : true}));
        app.use(express.static('./public'))

        const viewsPath = resolve('src/views');

        app.engine('handlebars', engine({
            layoutsDir: `${viewsPath}/layouts`,
            defaultLayout: `${viewsPath}/layouts/main.handlebars`,
        }));
        app.set('view engine', 'handlebars');
        app.set('views', viewsPath);

        app.use("/",viewsRouter);
        app.use("/api/products", productRouter);
        app.use("/api/carts", cartRouter);
        app.use("/realtimeproducts", realTimeProductsRouter);

        const PORT = 8080;
        const httpServer = app.listen(PORT, ()=>{
        console.log(`Servidor escuchando en puerto ${PORT}`)
        })

        const io = new Server(httpServer);
        io.on('connection',socket =>{

            socket.emit('products', products);

            socket.on('message', (data) => {
                console.log(data);
            });

            socket.on('addProduct', (data) => {
                let id = products.length+1;
                products.push({
                    id: id,
                    ...data
                });
                productManager.addProduct(data);
                io.sockets.emit('products', products);
            })

            socket.on('deleteProduct',(data)=>{
                productManager.deleteProduct(data);
                const result = products.filter(product => product.id !== data);          
                io.sockets.emit('products', result);
            })
        })


    } catch (error) {
        throw new Error(error);
    }
})();
