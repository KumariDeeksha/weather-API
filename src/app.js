const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast=require('./utils/forecast')
const geocode = require('./utils/geocode')


const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
         title: 'Weather',
        name: 'Deeksha'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Deeksha'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Deeksha'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error:'you must provide an address'
        })
    }
    geocode(req.query.address,(error,{lat,lon,location}={})=>{
        if(error){
           return res.send({
             error:'unable to connect,enter a valid location'
           })
        }
       
   
        forecast(lat,lon,(error,forecastdata)=>{
           if(error){
               return res.send({error})
           }
           
          res.send({
            forecast:forecastdata,
            location,
            address:req.query.address
          })
   
       })
    })
    })

app.get('*',(req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Deeksha',
        errormessage:'page not found'
    })
})

app.listen(3000,()=>{
    console.log('server up on 3000');
})