class ProductManager{

    products = [];
    idAuto = 1;


    getProducts()
    {
      return this.products;
    }


    getProductById = ( id ) =>{
        const productById = this.products.find(e => e.id === id)
        if (productById === undefined){
            return console.error ("Not found.")
        } 
        return console.log(productById)
    }

    addProduct(product)
    {
        
        if( !product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock ){
            console.error('No se pudo agregar el producto porque no se completaron todos los datos necesarios.')
            return
        }

        if (this.products.find(e => e.code === product.code)){
            console.error(`El producto ${product.title} no puede ser agregado porque ya existe un producto con el mismo código.`)
            return
        }

        this.products.push({
            id: this.idAuto,
            title: product.title,
            description: product.description,
            price: product.price,
            thumbnail: product.thumbnail,
            code: product.code,
            stock: product.stock
        })
        this.idAuto ++;
    }

}

const productManager = new ProductManager()

console.log(productManager.getProducts()) 

productManager.addProduct({title: 'Producto prueba', description: 'Esto es un producto prueba', price: 200, thumbnail:'Sin imagen', code:'abc123', stock:25})

productManager.addProduct({title: 'Producto prueba', description: 'Esto es un producto prueba1', price: 200, thumbnail:'Sin imagen', code:'abc1234', stock:25})

console.log(productManager.getProducts())

productManager.addProduct({title: 'Producto prueba', description: 'Esto es un producto prueba', price: 200, thumbnail:'Sin imagen', code:'abc123', stock:25})

productManager.getProductById(1)

productManager.getProductById(5)