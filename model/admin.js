const mongoose=require('mongoose');
const adminSchema=new mongoose.Schema({
    adminName:{type:String,required:[true,"admin name must be provided"]},
    email:{type:String,required:[true,"admin email must be provided"]},
    password:{type:String,required:[true,"admin password must be provided"]}
})


module.exports=mongoose.model('admin',adminSchema)