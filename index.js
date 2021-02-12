require('dotenv').config()
const express = require('express')
const ejsLayouts = require('express-ejs-layouts')
const db = require('./models')
const axios = require('axios')
const morgan = require('morgan')



const app = express()
//static files// allows app to easily find filders and files
app.use(express.static('public'))

//Templating engine
app.use(express.urlencoded({ extended: false }))
//not sure what this even does
app.use(ejsLayouts)

app.set('view engine', 'ejs')

//route
app.get('/', (req, res) => {
    const API_key = process.env.API_key
    const artUrl = `https://www.rijksmuseum.nl/api/en/collection/?key=${API_key}`
  
    axios.get(artUrl).then(function (apiResponse) {
        const artData = apiResponse.data.artObjects
        //const artImage = apiResponse.data.artObjects[0].webImage.url
        console.log("**********************************************")
        res.render('index', { artData })
        //db.painting.create ??
    })
        .catch(error => {
            console.log(`Uh-oh. There's an error here.`)
            console.log(error)
        })
})

app.get('/favorites', (req, res) => {
        db.artFave.findAll().then(function(artFaveResponse) {
        console.log(db.artFave)
        res.render('favorites', { artFaveResponse })
        })

    })

app.post('/favorites', (req, res) => {
    db.artFave.create({
        title: req.body.title,
        url: req.body.url
    }).then(function(title) {
        res.redirect('/favorites')
    })
})



const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});





