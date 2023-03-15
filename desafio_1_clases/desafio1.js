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

    addProduct(title, description, price, thumbnail, code, stock)
    {
        
        if( !title || !description || !price || !thumbnail || !code || !stock ){
            console.error('No se pudo agregar el producto porque no se completaron todos los datos necesarios.')
            return
        }

        if (this.products.find(e => e.code === code)){
            console.error(`El producto ${title} no puede ser agregado porque ya existe un producto con el mismo código.`)
            return
        }

        this.products.push({
            id: this.idAuto,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        })
        this.idAuto ++;
    }

}

const productManager = new ProductManager()

console.log(productManager.getProducts()) 

productManager.addProduct('Producto prueba', 'Esto es un producto prueba', 200, 'Sin imagen', 'abc123', 25)

console.log(productManager.getProducts())

productManager.addProduct('Producto prueba', 'Esto es un producto prueba', 200, 'Sin imagen', 'abc123', 25)

productManager.getProductById(1)

productManager.getProductById(5)