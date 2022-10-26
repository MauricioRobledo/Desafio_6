const express = require('express')
const router = express.Router()

const productos = []
const mensajes = []

router.get('/', (req,res)=>{
    res.render('form',{productos})
})

router.get('/chat', (req,res)=>{
    res.render('chat',{mensajes})
})

module.exports = {
    router,
    productos,
    mensajes
}