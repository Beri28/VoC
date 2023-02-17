const mongoose=require('mongoose');
const reviewSvchema=new mongoose.Schema({
    customerName:String,
    review:String
})
const productSchema=new mongoose.Schema({
    type:{type:String,required:true},
    name:{type:String,required:true},
    owner:{type:String,required:true},
    contact:{type:String,required:true},
    pricelowest:String,
    pricemedium:String,
    pricehighest:String,
    rating:{type:Number,default:0},
    totalRatings:{type:Number,default:0},
    five:{type:Number,default:0},
    four:{type:Number,default:0},
    three:{type:Number,default:0},
    two:{type:Number,default:0},
    one:{type:Number,default:0},
    reviews:[Object]
    
})

module.exports=mongoose.model('product',productSchema);