import productSchema from '../models/product.model.js';

class ProductMongooseDao{
    async find(){
        const productDocument = await productSchema.find();
        return productDocument.map(prodcut => ({
            id: prodcut._id,
            title: prodcut.title,
            code: prodcut.code,
            price: prodcut.price,
            status: prodcut.status,
            stock: prodcut.stock,
            category: prodcut.category,
            thumbnail: prodcut.thumbnail
        }));
    }

    async getOne(pid){
        const productDocument = await productSchema.findOne({_id: pid});
        return {
            id: productDocument._id,
            title: productDocument.title,
            description: productDocument.description,
            code: productDocument.code,
            price: productDocument.price,
            status: productDocument.status,
            stock: productDocument.stock,
            category: productDocument.category,
            thumbnail: productDocument.thumbnail
        }
    }

    async create(data){
        const productDocument = await productSchema.create(data);
        return {
            id: productDocument._id,
            title: productDocument.title,
            description: productDocument.description,
            code: productDocument.code,
            price: productDocument.price,
            status: productDocument.status,
            stock: productDocument.stock,
            category: productDocument.category,
            thumbnail: productDocument.thumbnail
        }
    }

    async updateOne(pid, data){
        const productDocument = await productSchema.findOneAndUpdate({ _id: pid }, data, { new: true});

        return {
            id: productDocument._id,
            title: productDocument.title,
            description: productDocument.description,
            code: productDocument.code,
            price: productDocument.price,
            status: productDocument.status,
            stock: productDocument.stock,
            category: productDocument.category,
            thumbnail: productDocument.thumbnail
        }
    }

    async deleteOne(pid){
        return productSchema.deleteOne({ _id: pid });
    }
}




export default ProductMongooseDao;
