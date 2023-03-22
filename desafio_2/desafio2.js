const fs = require('fs')

class ProductManager {
    idAuto = 1;
    #products;

    constructor(file) {
        this.#products = [];
        this.path = `./${file}`
    }

    getProducts = () =>{
        try {
            const  content= fs.readFileSync(this.path, 'utf-8')
            const allProducts = JSON.parse(content);
             return allProducts;
            
        } catch (error) {
            console.log(`El archivo ${this.path} no existe, creando...`)
            fs.writeFileSync(this.path,'[]')
        }
    }

    getProductById = (id) =>{

        const productFile = fs.readFileSync(this.path, "utf-8");
        let idProduct = JSON.parse(productFile);

        const productById = idProduct.find(e => e.id === id)
        if (productById === undefined){
            return console.error ("Not found.")
        } 
        return console.log(productById)
    }

    addProduct = (product) => {
        const id = this.idAuto

        const productFile = fs.readFileSync(this.path, "utf-8");
        let products = JSON.parse(productFile);


        if( !product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock ){
            throw new Error('No se pudo agregar el producto porque no se completaron todos los datos necesarios.')
        }

        if (products.find(e => e.code === product.code)){
            throw new Error(`El producto "${product.title}" no puede ser agregado porque ya existe un producto con el mismo código.`)
        }

        products.push({         
            id,
            ...product
        })

        fs.writeFileSync(this.path, JSON.stringify(products, null, 2))
        this.idAuto++
    }

    updateProduct = (id,product) =>{

        const productFile = fs.readFileSync(this.path, "utf-8");
        let products = JSON.parse(productFile);

        const productFind = products.find(e => e.id === id)

        if (productFind === undefined){
            throw new Error("No existe un producto con ese id, no se pudo actualizar.")
        } 

        if( !product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock ){
            throw new Error(`No se pudo actualizar el producto con id ${id} porque no se completaron todos los datos necesarios.`)
        }
        
        products.splice(productFind, 1, { id, ...product });

        fs.writeFileSync(this.path, JSON.stringify(products, null, 2))
        console.log(`El producto con id ${id} fue actualizado con éxito.`)
    }

    deleteProduct = (id) =>{
        const productFile = fs.readFileSync(this.path, "utf-8");
        let products = JSON.parse(productFile);

        const productFind = products.find(e => e.id === id)
        if (productFind === undefined){
            return console.error ("No existe un producto con ese id, no se pudo eliminar.")
        } else {
            const productIndex = products.indexOf(productFind)
            products.splice(productIndex, 1)
            if(products.length === 0){
                fs.unlinkSync(this.path, 'utf-8')
            } else{
                fs.writeFileSync(this.path, JSON.stringify(products, null, 2))
            }
            return console.log(`El producto "${productFind.title}" fue eliminado.`)
        }
    }
}

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
    code:'abc1234', 
    stock:30
};    

productManager.getProducts();
//productManager.addProduct(product1);
//productManager.addProduct(product2);
//console.log(productManager.getProducts());
//productManager.getProductById(1);
//productManager.getProductById(99);
//productManager.updateProduct( 1, {...product1,title: 'Producto actualizado',description: 'Descripcion actualizada',stock:50} );
//productManager.deleteProduct(1);