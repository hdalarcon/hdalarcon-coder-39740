import CartMongooseDao from "../daos/cartMongooseDao.js";

class CartManager{
    constructor(){
        this.cartDao = new CartMongooseDao();
    }

    async getOne(pid){
        const cart = await this.cartDao.getOne(pid);
        return cart;
    }

    async create(data){
        const cart = await this.cartDao.create(data);
        return cart;
    }

    async updateOne(cid, pid){
        return this.cartDao.updateOne(cid, pid);
    }
}

export default CartManager;