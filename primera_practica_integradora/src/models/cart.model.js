import mongoose, { Schema } from "mongoose";

const cartCollection = 'carts';

const cartSchema = new Schema({
    products: {
        type: [{
            _id: { type: Schema.Types.ObjectId, required: true },
            quantity: { type: Schema.Types.Number, required: true }
        }],
        required: true,
    }
})

export default mongoose.model(cartCollection, cartSchema);
