const mongoose = require('mongoose')
const { configMongodb } = require('../connections/config')

await mongoose.connect(configMongodb.connectionString);

class ContenedorMensaje{
    
    constructor(nombreColeccion , esquema){
        const schema = mongoose.Schema(esquema)
        this.coleccion = mongoose.model(nombreColeccion, schema)
    }

    async get(id){
        try {
            const coleccion = await this.coleccion.findOne({"_id": id});
            return coleccion
        } catch (error) {
            return error
        }
       
    }

    async getAll(){
        try {
            const colleciones = await this.coleccion.find({})   
            return colleciones
        } catch (error) {
            return error
        }
    }
    
    async save(data){
        try {
            const result = await this.coleccion.create(data)
            return result._id
          
        } catch (error) {
            console.log(error);
            if(error) return false
        }
      
    }

    async update(data, id){
        try {
            const result = await this.coleccion.findOneAndUpdate({_id: id}, data, {new: true})
            return result._id;
        } catch (error) {
            return error
        }
    }

    async delete(id){
        try {
            const result = await this.coleccion.deleteOne({'_id': id})
            return result
        } catch (error) {
            return error
        }
    }
}