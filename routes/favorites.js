//const { Router } = require('express')
const express = require('express')
const expressEjsLayouts = require('express-ejs-layouts')
const router = express.Router()


router.get('/', async(req, res) => {
    try {
        await res.send('ahhh')
    }
})

module.exports = router