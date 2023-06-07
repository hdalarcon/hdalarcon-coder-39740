import dotenv from "dotenv";
dotenv.config();

import express from 'express';
import productRouter from './routes/productRouter.js';
import cartRouter from './routes/cartRouter.js';
import sessionRouter from './routes/sessionRouter.js'
import session from "express-session";
import mongoose from "mongoose";
import mongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRouter.js";
import roleRouter from "./routes/roleRouter.js";
import errorHandler from "./middlewares/errorHandler.js";

void(async()=>{
    try {

        await mongoose.connect(process.env.MONGO_DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true

        });

        const app  = express();

        app.use(express.json());
        app.use(express.urlencoded({extended : true}));
        app.use(express.static('./public'))
        app.use(cookieParser());
        app.use(session({
            store: mongoStore.create({
              mongoUrl: process.env.MONGO_DB_URI,
              ttl: 50
            }),
            secret: 'CoderS3cR3tC0D3',
            resave: false,
            saveUninitialized: false
        }));


        app.use('/api/sessions', sessionRouter);  
        app.use('/api/users', userRouter);
        app.use('/api/roles', roleRouter);
        app.use("/api/products", productRouter);
        app.use("/api/carts", cartRouter);
        app.use(errorHandler);

        const port = process.env.PORT || 8080;
        
        app.listen(port, ()=>{
        console.log(`Servidor escuchando en puerto ${port}`)
        })

    } catch (error) {
        throw new Error(error);
    }
})();
