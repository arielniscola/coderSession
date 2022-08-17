const database = require('../connections/config');

const createTableProductos = async(database) => {
   try{
     await database.schema.dropTableIfExists('Producto');
   
       await database.schema.createTable('Producto', table => {
            table.increments('id').primary()
            table.string('title', 50)
            table.string('thumbnail', 200)
            table.integer('price')
        })
            console.log('Tabla de producto creada');
           // database.destroy()

    }catch(err){
        console.log(err);
        database.destroy()
    }
  
}
const createTableMensajes = async(database) => {
    try {
        await database.schema.dropTableIfExists('Mensaje');

       await database.schema.createTable('Mensaje', table => {
            table.increments('id').primary()
            table.string('date')
            table.string('message', 200)
            table.string('username')
        })
            console.log('Tabla de mensaje creada');
           // database.destroy();

    } catch (error) {
        console.log(error);
        database.destroy()
    }
}

module.exports = {
    createTableMensajes,
    createTableProductos
}