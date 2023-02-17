const express=require('express');
const app=express();
const serviceSchema=require('../model/service');
const { json } = require('express');
app.use(json());
app.use(express.urlencoded({extended:false}));



const getAllServices=async (req,res,next)=>{
    try {
        const services=await serviceSchema.find({},{__v:0,_id:0})
        //let result=products+services;
        req.serviceRes=services;
        next()
    } catch (error) {
        console.error(error)
        next(error)
    }
}

const serviceEssentials= async(req,res)=>{
    try {
        const essentials=await serviceSchema.find({},{name:1,owner:1,distributionAreas:1,rating:1,totalRatings:1,_id:0});
        res.send(essentials)
    } catch (error) {
        console.log(error);
        res.send("Server error")
    }
}

const specificService= async (req,res,next)=>{
    try {
        console.log(req.params)
        let result=await serviceSchema.findOne({name:req.params.name},{__v:0,_id:0})
        res.specificService=result;
        res.render('product',{layout:'layout1',name:result.name, owner:result.owner})
        //res.send(`${res.specificService.type}`)
    } catch (error) {
        console.log(error)
        res.send("Encountered error")
    }
}

const insertService=async (req,res)=>{
    try {
        let input=new serviceSchema(req.body)
        await input.save()
        res.send("Saved")
    } catch (error) {
        console.log(error)
        res.send("Encountered error")
    }
}

const getServiceRating=async (req,res)=>{
    try {
        let {name,number,customerName,review}=req.body;
        console.log(req.body,'/////',number)
        let obj={
            customerName:customerName,
            review:review
        }
        switch(number){
            case '5':{await serviceSchema.updateOne({name:name},{$inc:{five:1}});   await serviceSchema.updateOne({name:name},{$inc:{totalRatings:1}});};
            break;
            case '4':{await serviceSchema.updateOne({name:name},{$inc:{four:1}});   await serviceSchema.updateOne({name:name},{$inc:{totalRatings:1}});};
            break;
            case '3':{await serviceSchema.updateOne({name:name},{$inc:{three:1}});  await serviceSchema.updateOne({name:name},{$inc:{totalRatings:1}});};
            break;
            case '2':{await serviceSchema.updateOne({name:name},{$inc:{two:1}});    await serviceSchema.updateOne({name:name},{$inc:{totalRatings:1}});};
            break;
            default:console.log("Enter valid rating")
        }
        if(review !=''){
        let array=await serviceSchema.findOne({name:name})//,{reviews:1,_id:0})
        array=array.reviews;
        array.push(obj)
        await serviceSchema.updateOne({name:name},{$set:{reviews:array}})
        }
        calculator2(req,res);                
    } catch (error) {
        console.log(error);
        next(error)
    }
}

const calculator2=async (req,res)=>{
    try {
        let {name}=req.body;
        console.log(name)
        let data=await serviceSchema.findOne({name:name})
        let {five,four,three,two}=data;
        let rating=((five*5)+(four*4)+(three*3)+(two*2))/(five+four+three+two);
        rating=Math.round(rating);
        console.log(rating)
        await serviceSchema.updateOne({name:name},{$set:{rating:rating}})
        res.send("Service:thanks");
    } catch (error) {
        console.log(error)
    }
}

const serviceResults= async (req,res)=>{
    try {
        let input1=req.body
        console.log(input1)
    } catch (error) {
        console.log(error)
    }
}


exports.getAllServices=getAllServices;
exports.serviceEssentials=serviceEssentials;
exports.specificService=specificService;
exports.insertService=insertService;
exports.getServiceRating=getServiceRating;
exports.calculator2=calculator2;
exports.serviceResults=serviceResults;