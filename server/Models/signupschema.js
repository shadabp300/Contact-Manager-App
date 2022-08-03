const mongoose=require('mongoose')

const addSchema= new mongoose.Schema({
    email:String,
    password:String
})

const Model=mongoose.model("users",addSchema)

module.exports=Model