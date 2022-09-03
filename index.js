//Tarea 3: Servidor con Express
//index.j es nuestro script principal
//

const express = require ('express');                                        //Importamos el modulo express
const fs = require ('fs');                                                  //Importamos el modulo fileSystem

const PORT = process.env.PORT || 8080;                                      //Definimos el puerto

const app = express();

const connectedServer = app.listen(PORT, () => {
    console.log (`Servidor en marcha por el puerto ${PORT}`);
});

connectedServer.on('error', (error) => {
    console.log(error.message);
});



//Clase contenedor del desafio anterior
class Contenedor {
    constructor(fileName)                   //El constructor recibe el nombre del archivo con el que trabajaremos
    {
        this.fileName = fileName;
    }
    //Funciones de la clase   
    
    //getAll(Object[])  Devuelve un array con todos los objetos presentes en el archivo
    async getAll()
    {
        console.log("\nFuncion getAll:\n");

        try{
            const contenidoArchivo = await fs.promises.readFile(`./${this.fileName}`,'utf-8');
            //let contenidoArchivoJSON = JSON.parse(contenidoArchivo); 

        return contenidoArchivo;                                          //Retorna todo el contenido en el arreglo de objetos
        }
        catch(error)
        {
            console.log(error)
        }
    }
    
    //seleccionAzar
    async seleccionAzar()
    {
        console.log("\nFuncion seleccionAzar: \n");
        try{
            const contenidoArchivo = await fs.promises.readFile(`./${this.fileName}`,'utf-8');
            let contenidoArchivoJSON = JSON.parse(contenidoArchivo);                                                //Convertimos a formato de objeto el contenido del archivo y lo asignamos a otra variable
            
            function getRandomIntInclusive(min, max) {                                                              //Funcion que genera un número al azar, entre 0 y el maximo de nuestro arreglo de objetos
                min = Math.ceil(min);
                max = Math.floor(max);
                return Math.floor(Math.random() * (max - min + 1) + min);
              }
            
              let idRandom = getRandomIntInclusive(0,contenidoArchivoJSON.length-1)                                   //Generamos un id de producto al azar
            
            return contenidoArchivoJSON[idRandom];
        }
        catch(error)
        {
            console.log(error)
        }
    }
}


let contenedor = new Contenedor("productos.json");      //Nueva instancia de la clase Contenedor, le pasamos el nombre de nuestro archivo



//---------------------------------------------------------------------------------
app.get('/', (req, res) => {
    res.send('Esta es la página de inicio, este es el servidor de Enrique')
})

app.get('/login', (req,res) => {
    res.send('Hola, soy la página de login')
})

//-----------------------------------------------------------------------------------
//Aquí empieza lo que es el desafio 3 en sí
let productos;
contenedor.getAll().then(result => {
    //console.log(result)
    productos = result;
})

//Ruta /productos
app.get('/productos', (req,res) => {
    res.send( productos )
})

let productoAlAzar;
contenedor.seleccionAzar().then(result => {
    productoAlAzar = result;
})


//Ruta /productosRandom
app.get('/productosRandom', (req,res) => {
    res.send(productoAlAzar)
})


//----------------------------------------------------------------------------------
app.get('*', (req, res) => {
    res.status(404).send('Esta pagina ni siquiera existe')
})

//-----------------------------------------------------------------------------------



