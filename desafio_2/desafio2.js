const fs = require('fs').promises;

class ProductManager {
    idAuto = 1;
    #products;

    constructor(file) {
        this.#products = [];
        this.path = `${file}`;
    }

    async getProducts (){
        try {
            const  allProducts = await fs.readFile(this.path, 'utf-8')
            return JSON.parse(allProducts);
        } catch (error) {
            await fs.writeFile(this.path,'[]');
            throw new Error (`El archivo ${this.path} no existía. Se creo con un array vacio.`);
        }
    }

    async getProductById(id){

        try {
            const productFile = await fs.readFile(this.path, "utf-8");
            let products = JSON.parse(productFile);

            const productById = products.find(e => e.id === id)
            if (productById === undefined){
            throw new Error("Not found.");
        } 
        return console.log(productById)
        } catch (error) {
            throw new Error(error);
        }

    }

    async addProduct(product){
        try {
            const productFile = await fs.readFile(this.path, "utf-8");
            let products = JSON.parse(productFile);


            if( !product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock ){
                throw new Error('No se pudo agregar el producto porque no se completaron todos los datos necesarios.')
            }

            if (products.find(e => e.code === product.code)){
                throw new Error(`El producto no puede ser agregado porque ya existe un producto con el mismo código.`)
            }
        
            if (products.length > 0) {
                const lastProduct = products[products.length - 1];
                this.idAuto = lastProduct.id + 1;
            }
            products.push({
                id: this.idAuto++,
                ...product
            })

            await fs.writeFile(this.path, JSON.stringify(products, null, 2))            
        } catch (error) {
            throw new Error(error);
        }

        
    }

    async updateProduct(id,product){
        try {
            const productFile = await fs.readFile(this.path, "utf-8");
            let products = JSON.parse(productFile);

            const productFind = products.find(e => e.id === id)

            if (productFind === undefined){
                throw new Error("No existe un producto con ese id, no se pudo actualizar.")
            } 

            if( !product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock ){
                throw new Error(`No se pudo actualizar el producto con id ${id} porque no se completaron todos los datos necesarios.`)
            }
        
            products.splice(productFind, 1, { id, ...product });

            await fs.writeFile(this.path, JSON.stringify(products, null, 2))
            return `El producto con id ${id} fue actualizado con éxito.`

        } catch (error) {
            throw new Error(error);
        }

    }

    async deleteProduct(id){
        try {
            const productFile = await fs.readFile(this.path, "utf-8");
            let products = JSON.parse(productFile);

            const productFind = products.find(e => e.id === id)
            if (productFind === undefined){
                return console.error ("No existe un producto con ese id, no se pudo eliminar.")
            } else {
            const productIndex = products.indexOf(productFind)
                products.splice(productIndex, 1)
                if(products.length === 0){
                    await fs.unlink(this.path, 'utf-8')
                } else{
                    await fs.writeFile(this.path, JSON.stringify(products, null, 2))
                }
                return console.log(`El producto "${productFind.title}" fue eliminado.`)
            }            
        } catch (error) {
            throw new Error(error);
        }
    }
}




const main = async () =>{

    try {
        const productManager = new ProductManager('products.json')

        const product1 = {
            title: 'Producto prueba', 
            description: 'Esto es un producto prueba', 
            price: 200, 
            thumbnail:'Sin imagen', 
            code:'abc123', 
            stock:25
        };
        
        const product2 = {
            title: 'Producto prueba1', 
            description: 'Esto es un producto prueba1', 
            price: 200, 
            thumbnail:'Sin imagen', 
            code:'abc12345', 
            stock:30
        };    
        await productManager.getProducts();
        //productManager.addProduct(product1);
        //productManager.addProduct(product2);
        //productManager.getProducts();
        //productManager.getProductById(1);
        //productManager.getProductById(99);
        //await productManager.updateProduct( 1, {...product1,title: 'Producto actualizado',description: 'Descripcion actualizada',stock:50} );
        //productManager.deleteProduct(2);
        
    } catch (error) {
        console.log(error);
    }

}

main();
