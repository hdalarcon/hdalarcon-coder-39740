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

    getProductById = ( id ) =>{
        const productById = this.#products.find(e => e.id === id)
        if (productById === undefined){
            return console.error ("Not found.")
        } 
        return console.log(productById)
    }

    addProduct = ( title, description, price, thumbnail, code, stock ) => {
        const id = this.idAuto

        if( !title || !description || !price || !thumbnail || !code || !stock ){
            console.error('No se pudo agregar el producto porque no se completaron todos los datos necesarios.')
            return
        }

        if (this.#products.find(e => e.code === code)){
            console.error(`El producto "${title}" no puede ser agregado porque ya existe un producto con el mismo código.`)
            return
        }

        this.#products.push({         
            id,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        })

        fs.writeFileSync(this.path, JSON.stringify(this.#products, null, 2))
        this.idAuto++
    }

    updateProduct = ( id, title, description, price, thumbnail, code, stock ) =>{
        const product = this.#products.find(e => e.id === id)
        if (product === undefined){
            console.error ("No existe un producto con ese id, no se pudo actualizar.")
            return
        } 

        if( !title || !description || !price || !thumbnail || !code || !stock ){
            console.error('No se pudo actualizar el producto porque no se completaron todos los datos necesarios.')
            return
        }
        
        product.id = id
        product.title = title
        product.description = description
        product.price = price
        product.thumbnail = thumbnail
        product.code = code
        product.stock = stock
        fs.writeFileSync(this.path, JSON.stringify(this.#products, null, 2))
        console.log('El producto fue actualizado con éxito.')
    }

    deleteProduct = ( id ) =>{
        const product = this.#products.find(e => e.id === id)
        if (product === undefined){
            return console.error ("No existe un producto con ese id, no se pudo eliminar.")
        } else {
            const productIndex = this.#products.indexOf(product)
            this.#products.splice(productIndex, 1)
            if(this.#products.length === 0){
                fs.unlinkSync(this.path, 'utf-8')
            } else{
                fs.writeFileSync(this.path, JSON.stringify(this.#products, null, 2))
            }
            return console.log(`El producto "${product.title}" fue eliminado.`)
        }
    }
}

const productManager = new ProductManager('products.json')

productManager.getProducts()
productManager.addProduct('Producto prueba', 'Esto es un producto prueba', 200, 'Sin imagen', 'abc123', 25)
console.log(productManager.getProducts())
productManager.getProductById(1)
productManager.getProductById(99)
productManager.updateProduct( 1, 'Producto actualizado', 'Descripcion actualizada', 333, 'Sin imagen', 'codigoActualizado', 55)
productManager.deleteProduct(1)