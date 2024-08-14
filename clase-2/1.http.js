const http = require('node:http'); //protocolo http

const {PORT = 0} = process.env
const fs = require('node:fs')
 
const server = http.createServer((req,res)=> {
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    if(req.url==='/'){ 
        res.statusCode=200; 
        res.end('<h1>Bienvenido a mi página de Inicio</h1>');
    }else if(req.url === '/image'){
      
        fs.readFile('./asturias.jpg',(err,data)=> {
            if(err){
                res.statusCode=500;
                res.end('<h1>Se ha producido un error al tratar la imagen</h1>')
            }else{
                res.setHeader('Content-Type', 'image/png');
                res.end(data)
            }
        })
    } else if(req.url==='/contact') { 
        res.statusCode=200; 
        res.end('<h1>Bienvenido a mi página de contactos</h1>');
    }else{
        res.statusCode=404; 
        res.end('<h1>Página no encontrada</h1>');
    }

 
    

})

server.listen(PORT,()=>{
    console.log(`servidor escuchando en puerto ${server.address().port}`)
})