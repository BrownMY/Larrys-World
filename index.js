require('dotenv').config()
const express = require('express')
const expressEjsLayouts = require('express-ejs-layouts')
const db =require('./models')
const axios = require('axios')
const morgan = require('morgan')



const app = express()
//static files// allows app to easily find filders and files
app.use(express.static('public'))

//Templating engine
app.use(express.urlencoded({ extended: false}))
//not sure what this even does

app.set('view engine', 'ejs')

//route
app.get('/', (req, res) => {
    const API_key = process.env.API_key
    //const artUrl = `https://www.rijksmuseum.nl/api/en/collection/SK-C-5?key=${API_key}&f.dating.period=21`
    const artUrl = `https://www.rijksmuseum.nl/api/en/collection/?key=${API_key}`
    //'/api/en/collection/4/tiles' having trouble accessing photos
    axios.get(artUrl).then(function(apiResponse) {
        const artData = apiResponse.data.artObjects
        const artImage = apiResponse.data.artObject[0].webImage.url
        console.log("**********************************************")
        console.log(artData)
        console.log(artImage)
        res.render('index', { image })
       //db.painting.create ??
    })
    .catch(error => {
        console.log(`Uh-oh. There's an error here.`)
        console.log(error)
    })
})

// app.get('/favorites', (req, res) => {
//         res.send('./favorites')
        
//     })



const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});





