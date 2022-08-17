const knex = require('knex');
const createTables = require('./createTables');

class Contenedor{

    constructor(config, tablename){
        this.tablename = tablename;
        this.database = knex(config);   
        
        if(tablename==='Mensaje'){
            createTables.createTableMensajes(this.database)
        }else if(tablename === 'Producto'){
            createTables.createTableProductos(this.database)
        }
    }

    async saveObject(obj){
        try {
            await this.database(this.tablename).insert(obj);
            console.log("objeto almacenado");
        }
        catch (err){
            return err;
        }finally{
            //this.database.destroy();
        }

    }

    async getById(id){
        try {
            const objects = await this.database.from(this.tablename).where('id', id).select('*');
            return {objects};
        } catch (error) {
            return error
        } finally{
            this.database.destroy();
        }
    }

    async getAll(){
        try {
            let objects;
            if(this.tablename === 'Producto'){
                objects = await this.database.from(this.tablename).select("id", "title", "price", "thumbnail");
            }else if(this.tablename === 'Mensaje'){
                objects = await this.database.from(this.tablename).select("id", "username", "date", "message")
            }                       
           // this.database.destroy()
            return objects;
        } catch (err) {
            //this.database.destroy()
            return err;
        }
    }

    async deleteById(id){
        try {
            await this.database.from(this.tablename).where('id', id).del();
            return { message : `elemento id: ${id} eliminado`};
        } catch (error) {
            console.log("error al borrar producto", error);
        } finally{
            this.database.destroy();
        }
    }

    async deleteAll(){
        try {
            await this.database.from(this.tablename).del();
            return { message : 'elementos eliminados'};
        } catch (error) {
            console.log("error al borrar producto", error);
        } finally{
            this.database.destroy();
        }
    }
}


module.exports = Contenedor;