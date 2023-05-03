import cartSchema from '../models/cart.model.js'

class CartMongooseDao{

    async getOne(pid){
        const cartDocument = await cartSchema.findOne({_id: pid});

        return{
            id: cartDocument._id,
            products: cartDocument.products.map(product => {
                return {
                    id: product._id,
                    quantity: product.quantity
                 }
            })
        };
    }

    async create(data) {
        try {
            const cartDocument = await cartSchema.create(data);
            return {
                id: cartDocument._id,
                products: cartDocument.products.map(product => {
                    return {
                        id: product._id,
                        quantity: product.quantity
                    }
                })
            }
        } catch (error) {
            throw error;
        }
    };

    async updateOne(cid, pid) {
        try {
            const updateProducts = await cartSchema.findOneAndUpdate(
                { _id: cid, 'products._id': pid },
                { $inc: { 'products.$.quantity': 1 } },
                { new: true }
            );

            if (!updateProducts) {
                await cartSchema.updateOne(
                    { _id: cid },
                    { $push: { products: { _id: pid, quantity: 1 } } }
                );
            };

            const cartDocument = await cartSchema.findById(cid);

            return {
                id: cartDocument._id,
                products: cartDocument.products.map(product => {
                    return {
                        id: product._id,
                        quantity: product.quantity
                    }
                })
            }
        } catch (error) {
            throw error;
        }
    }
}

export default CartMongooseDao;