const express = require('express')
const expressEjsLayouts = require('express-ejs-layouts')
const app = express()
const ejs = require('ejs')
const axios = require('axios')
const morgan = require('morgan')

//static files// allows app to easily find filders and files
app.use(express.static('public'))

//Templating engine
app.use(express.urlencoded({ extended: false}))

app.set('view engine', 'ejs')

//route
app.get('/', (req, res) => {
    const artUrl = 'https://collectionapi.metmuseum.org/public/collection/v1/objects'
    axios.get(artUrl).then(function(apiResponse) {
        const art = apiResponse.data.results;
        res.render('index', { art: art })
        
    })
})

app.get('/favorites', async(req, res) => {
        res.send('./favorites')
        
    })



const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});





