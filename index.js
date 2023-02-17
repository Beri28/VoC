const  express  =   require('express');
const  app      =   express();
const  mongoose =   require('mongoose');
const  router   =   require('./routes/routes');
const  hbs      =   require('express-handlebars');
const  dotenv   =   require('dotenv').config();


mongoose.connect(process.env.URI,(error)=>{
    if(error){
        console.log('////',error)
        console.log("Couldn't connect");
    }
    else{
        console.log("Connecting to db was a success")
    }

})
/*.then(()=>{console.log("Connected succesfully")})
.catch(()=>{console.log("Couldn't connect")});
*/
app.use(express.static('public'));
app.use(express.urlencoded());


app.engine('hbs',hbs.engine({
    extname:'hbs',
    partialsDir:'./views/partials',
    layoutsDir:'./views/layouts'
}))
app.set('view engine','hbs')

app.use('/',router);
app.get('/default',(req,res)=>{
    res.send("WElcome");
})

app.listen(5000,()=>{console.log("Just hit port 5000")})