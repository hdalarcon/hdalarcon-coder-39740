import CartManager from "../manager/cartManager.js";

export const getOne = async (req,res)=>{
    try {
        const { pid } = req.params;
        const manager = new CartManager();
        const cart = await manager.getOne(pid);

        res.send({ status: 'success', cart });
    } catch (error) {
        res.status(400).send({error: error.message});
    }
};

export const save = async (req,res)=>{
    try {
        const manager =  new CartManager();
        const cart = await manager.create(req.body);
        res.send({ status: 'success', cart, message: 'Cart created.' })
    } catch (error) {
        res.status(400).send(error.message);
    }
};

export const update = async(req,res)=>{
    try {
        const { cid, pid } = req.params;
        const manager = new CartManager();
        const cart = await manager.updateOne(cid, pid);
        res.send({ status: 'success', cart, message: 'Cart updated.' });
    } catch (error) {
        res.status(404).send({error: error});
    }
};

export const deleteOne = async(req,res)=>{
    try {
        const { id } = req.params;
        const manager = new CartManager();
        const cart = await manager.deleteOne(id);
        res.send({ status: 'success', cart, message: 'Product deleted.' })
    } catch (error) {
        res.status(404).send({error: error});
    }
};