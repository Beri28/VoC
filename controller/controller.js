const productSchema=require('../model/products');
const serviceSchema=require('../model/service');
const express=require('express');
const { json } = require('express');
const app=express();
app.use(express.urlencoded({extended:false}));
app.use(json());


const getAllProducts=async (req,res,next)=>{
   
    try {
        let products=await productSchema.find({},{__v:0,_id:0});
        req.productRes=products;
        next();
    } catch (error) {
        console.log(error)
        next(error)
        //res.send(error)
    }
}
const getProductEssentials=async (req,res)=>{
    try {
        const essentials=await productSchema.find({},{name:1,owner:1,distributionAreas:1,rating:1,totalRatings:1,_id:0})
        res.send(essentials)
    } catch (error) {
        console.error(error)
        res.send(error)
    }
}
const insertProducts= async (req,res)=>{
    console.log(req.body);
    try {
        const item= new productSchema(req.body);
        await item.save();
        res.send("Saved ")
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

const getRating=async (req,res)=>{
    try {
        let {name,number,customerName,review}=req.body;
        console.log(req.body)
        let obj={
            customerName:customerName,
            review:review
        }
        switch(number){
            case '5':{await productSchema.updateOne({name:name},{$inc:{five:1}});    await productSchema.updateOne({name:name},{$inc:{totalRatings:1}});};
            break;
            case '4':{await productSchema.updateOne({name:name},{$inc:{four:1}});   await productSchema.updateOne({name:name},{$inc:{totalRatings:1}});};
            break;
            case '3':{await productSchema.updateOne({name:name},{$inc:{three:1}});  await productSchema.updateOne({name:name},{$inc:{totalRatings:1}});};
            break;
            case '2':{await productSchema.updateOne({name:name},{$inc:{two:1}});    await productSchema.updateOne({name:name},{$inc:{totalRatings:1}});};
            break;
            default: console.log("Enter valid rating")
        }
        if(review !=''){
        let array=await productSchema.findOne({name:name})//,{reviews:1,_id:0})
        array=array.reviews;
        array.push(obj)
        await productSchema.updateOne({name:name},{$set:{reviews:array}})
        }
        calculator(req,res);
    } catch (error) {
        console.log(error);
        res.send(error)
        
    }
}

const calculator=async (req,res)=>{
    try {
        let {name}=req.body;
        if(req.body.number){
        console.log(name)
        let data=await productSchema.findOne({name:name})
        let {five,four,three,two}=data;
        let rating=((five*5)+(four*4)+(three*3)+(two*2))/(five+four+three+two);
        console.log(rating)
        rating=Math.round(rating);
        console.log(rating)
        await productSchema.updateOne({name:name},{$set:{rating:rating}})
        res.send("Product:thanks");
        }
    } catch (error) {
        console.log(error)
        res.send("Fatal Error")
    }
}
const specificProduct=async (req,res,next)=>{
    try {
        let results=await productSchema.findOne({name:req.params.name},{_id:0,__v:0})
        res.specificProduct=results
        res.render('product',{layout:'layout1',name:results.name, owner:results.owner})
        //res.send(`${res.specificProduct}`)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}


const  productResults= async (req,res)=>{
    try {
        console.log(req.body)
        let input=req.body.name
        console.log(input)
        let results=await productSchema.find({name:{$regex:input,$options:'i'}},{__v:0,_id:0})
        let html=results.map(item=>{
            return `
        <div class=" col-12 col-lg-4 beri">
        <div class="card">
        <img class="card-img-top" src="../images/logo1.png">
        <div class="card-header bg-dark1 text-light " >
         <span>Name: </span><span class="name1">${item.name}</span>
        </div>   
        <div class="card-body card-info1">
        <span class="type1">${item.type}</span>
         <span>Rating:  </span>${item.rating}
        </div> 
        <div class="card-footer card-info1">
        Contact info :- +237 ${item.contact}
        </div>
        <div class="container1">
            <button type="button" class=" btn btn-primary button" data-bs-toggle="modal" data-bs-target="#exampleModalLong">
            Rate
            </button>
            <button class="btn  btn-outline-secondary  "><a href="/${item.name}/${item.type}">More</a></button>
        </div>
        </div>
        </div>
            `
        }).join('')
        res.render('search',{layout:'layout1',data:html})
        
    } catch (error) {
        console.log(error)
    }
}

exports.getAllProducts=getAllProducts;
exports.insertProducts=insertProducts;
exports.getRating=getRating;
exports.calculator=calculator;
exports.getProductEssentials=getProductEssentials;
exports.specificProduct=specificProduct;
exports.productResults=productResults
