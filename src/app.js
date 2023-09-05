import express from "express"
import ProductManager from "./components/ProductManager.js"

const app = express();
app.use(express.urlencoded({extended : true})); 

const productos = new ProductManager()

const readProducts = productos.readProducts()

//console.log(await readProducts) //funciona con el await porque va a esperar, en este caso funciona y no tengo que hacer la función asincronica, sin el await me imprime pending 

//LLAMADAS

//este llamado trae todos los productos que tenemos en nuestro productos.txt
app.get("/products", async (req, res) => {
    let limit = parseInt(req.query.limit); //esta variable grardarpa en limit lo que se escriba después de products
    if(!limit) return res.send(await readProducts);
    let allProducts = await readProducts; //acá se espera a la promesa y luego se ejecuará productlimit
    let productlimit = allProducts.slice(0, limit);
    res.send(productlimit);
});

app.get("/products/:id", async (req, res) => {
    let id = parseInt(req.params.id);
    let allProducts = await readProducts;
    let productById = allProducts.find(product => product.id === id);
    res.send(productById)
    
});

 //CREACIÓN DEL PUERTO 8080
const PORT = 8080;
const server = app.listen(PORT,() =>{ //hacemos una función para poder generar un mensaje a través de consola que nos indique si el puerto se abrió o no
    console.log(`express por el local host ${server.address().port}`) //usamos los vactis para usar los escapes /address es un método, nos devuelve muchos datos de un servidor, se usa para consultar datos  
})

server.on("error", (error) => console.log(`error en el servidor ${error}`))

//cuando ingreso localhost:8080/products me muestra los productos por la terminal, hermoso. Aún así no es lo que debería paras, por lo tantp se deberá reemplazar console.log(await readProducts) por response.send(await readProducts)