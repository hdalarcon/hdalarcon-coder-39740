import ProductMongooseDao from "../daos/productMongooseDao.js";

class ProductManager{
    constructor(){
        this.productDao = new ProductMongooseDao();
    }

    async find(){
        return this.productDao.find();
    }

    async create(data){
        const product = await this.productDao.create(data);
        return product; 
    }

    async getOne(pid){
        return this.productDao.getOne(pid);
    }

    async updateOne(pid, data){
        return this.productDao.updateOne(pid, data);
    }

    async deleteOne(pid){
        return this.productDao.deleteOne(pid);
    }
}

export default ProductManager;