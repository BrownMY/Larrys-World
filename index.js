const express = require('express')
const expressEjsLayouts = require('express-ejs-layouts')
const db =require('../models')

const ejs = require('ejs')
const axios = require('axios')
const morgan = require('morgan')


const app = express()
//static files// allows app to easily find filders and files
app.use(express.static('public'))

//Templating engine
app.use(express.urlencoded({ extended: false}))

app.set('view engine', 'ejs')

//route
app.get('/', (req, res) => {
    const artUrl = 'https://www.rijksmuseum.nl/api/nl/collection/SK-C-5/tiles?key=JMAXiERl'
    //'/api/en/collection/4/tiles'
    
    axios.get(artUrl).then(function(apiResponse) {
        const art = apiResponse
        console.log("**********************************************")
        console.log(art.levels[0].tiles[0].url)
        res.render('index')
        d
    })
})

// app.get('/favorites', (req, res) => {
//         res.send('./favorites')
        
//     })



const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});





