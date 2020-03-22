const path = require('path');
const express= require('express');
const hbs= require('hbs');
const request = require('request');
const geoCode= require('./utils/geocode');
const forecast= require('./utils/forecast');
const app= express();
//The paths to be used in express configurations
const publicPathDirectory= path.join(__dirname,'../public');
const viewsTemplatesDirectory= path.join(__dirname, '../templates/views');
const partialsPath= path.join(__dirname, '../templates/partials');

//The template engine configurations
app.set('view engine', 'hbs');
app.set('views', viewsTemplatesDirectory);
hbs.registerPartials(partialsPath);

const port = process.env.PORT || 3000 

//The static files configuration
app.use(express.static(publicPathDirectory));

app.get('',(req, res)=>{
    res.render('index',{
        title:'Weather App',
        creator:'Mostafa'
    });
});
app.get('/help', (req, res)=>{
    res.render('help',{title:'Help',helpText: 'please check the documentations', creator:'Mostafa'});
})
app.get('/about',(req, res)=>{
    res.render('about',{title:'About ',name:'Division bell', year:1994, creator:'Mostafa'});
})
app.get('/weather', (req,res)=>{
   if (!req.query.address){
       return res.send({
           error:'No Address was provided'
       });
    }
    geoCode(req.query.address, (error, {longitude,latitude,location}={})=>{
        //
        if(error){
            return res.send({error});
         }
        forecast(longitude, latitude, (forcastError, forecastData)=>{
           if(forcastError){
            return res.send({error:forcastError})
           }else{
           
            const forecastString= `Currently it is ${forecastData.temperature} degrees, and there is a ${forecastData.rainingChance} % chance of rain`;
            res.send({
                    location,
                    forecast:forecastString,
                    address: req.query.address
                }
            );
           }
        });
     });
   })
app.get('/help/*', (req, res)=>{
    res.render('General404', {
        title:'404 Page Not found', 
        error:'There is no Help documentation for this', 
        creator:'Mostafa'}
        );
})

app.get('/products', (req, res)=>{
    if(!req.query.search){
        return res.send({
            error:'no query was provided'
        });
        }
        console.log(req.query.search);
        res.send({
            products:[]
        })

})
app.get('*',(req, res)=>{
    res.render('General404', {
        title:'404 Page Not found', 
        error:'There is no such resource', 
        creator:'Mostafa'});
})
app.listen(port, ()=>{
    console.log(`started listening on port ${port}`);
}) 