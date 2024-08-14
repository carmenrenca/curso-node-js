const express = require('express');
const app =  express()
const PORT = process.env.PORT ?? 1234;

app.disable('x-powered-by');
app.use(express.json());

const ditto =  require('./ditto.json')
app.get('/',(req,res)=>{
    res.status(200).send('<h1>Mi página</h1>')
})
app.get('/pokemon/ditto',(req,res)=>{ 
    res.status(200).json(ditto); 
})
app.post('/pokemon',(req,res)=> { 
    res.status(201).json(req.body)
})
//la última a la que va a llegar
app.use((req,res)=>{
    res.status(404).send('<h1>Recurso no encontrado</h1>')
})
app.listen(PORT,()=> console.log(`Servidor escuchando en el puerto ${PORT}`));