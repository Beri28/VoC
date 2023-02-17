const express=require('express');
const app=express();
const router=express.Router();
const {getAllProducts,insertProducts,getRating,calculator,getProductEssentials,specificProduct,productResults}=require('../controller/controller');
const {getAllServices,serviceEssentials,specificService,insertService,getServiceRating,calculator2,serviceResults}=require('../controller/constroller2');
const products = require('../model/products');
const { json } = require('express');
app.use(json())



router.get('/',(req,res)=>{
    res.render('home',{layout:'layout1.hbs'})
    //res.sendFile('home.html',{root:'./views'})
})
.get('/add',(req,res)=>{
    res.sendFile('add.html',{root:'./public'})
})
.get('/allProducts',getAllProducts,(req,res)=>{
    res.send(req.productRes)
})
.get('/productEssentials',getProductEssentials)
.get('/allServices',getAllServices,(req,res)=>{
    res.send(req.serviceRes)
})
.get('/serviceEssentials',serviceEssentials)
.get('/service/:name',specificService)
.get('/all',getAllProducts,getAllServices,(req,res)=>{res.send(`${req.productRes},\n\n{            }${req.serviceRes}`)})
.get('/services',(req,res)=>{
    res.render('allservices',{layout:'layout1'})
})
.get('/products',(req,res)=>{
    res.render('allproducts',{layout:'layout1'})
})
.get('/:name/:type',(req,res)=>{
    if(req.params.type=='service'){
        specificService(req,res)
    }
    else if(req.params.type=='product'){
        specificProduct(req,res)
    }
})
.get('/error',(req,res)=>{
    res.send("Big error")
})





router.post('/add',(req,res)=>{
    if(req.body.type=="product"){
    insertProducts(req,res)
    }
    else if(req.body.type=="service"){
        insertService(req,res)
    }
    else{
        res.send("Select item type")
    }
});
router.post('/rate',(req,res)=>{
    console.log(req.body.type)
    if(req.body.type=="product"){
     getRating(req,res)//,calculator(req,res)
    }
    else if(req.body.type=="service"){
        getServiceRating(req,res)//,calculator2(req,res)
    }
    else{
        res.send("Couldn't rate")
    }
     
})
.post('/searchResults',productResults)

module.exports=router;
