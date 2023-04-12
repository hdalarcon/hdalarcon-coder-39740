import express from 'express';
import productRouter from './routes/productRouter.js';
import cartRouter from './routes/cartRouter.js';
import viewsRouter from './routes/viewsRouter.js';
import realTimeProductsRouter from './routes/realTimeProductsRouter.js';
import { engine } from 'express-handlebars';
import { resolve } from 'path';
import { Server } from 'socket.io';


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
        const socketServer = new Server(httpServer);

        socketServer.on('connection', socket =>{
            
            console.log('Nuevo cliente conectado');

        });

    } catch (error) {
        throw new Error(error);
    }
})();
