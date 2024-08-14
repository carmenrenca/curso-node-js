const http = require('node:http');
const {PORT = 0} = process.env
const json =  require('./ditto.json')


const server = http.createServer((req,res)=> {
    const  {method, url} = req;
    switch(method){
        case 'GET':
            switch(url){
                case '/pokemon/ditto':
                    res.statusCode=200; 
                    res.setHeader('Content-Type', 'application/json; charset=utf-8')
                 return   res.end(JSON.stringify(json));
                case '/contact':
                    res.statusCode=200; 
                    return  res.end('<h1>Bienvenido a mi página de contactos</h1>');
                    default:
                        res.statusCode = 404
                        res.setHeader('Content-Type', 'application/json; charset=utf-8')
                        return  res.end('<h1>Recurso no encontrado 404</h1>');
            }
            case 'POST': 
            switch(url){
                case '/pokemon':
                    let body='';
                    // escuchar el evento data
                    req.on('data', chunk=> body+=chunk.toString())
                    req.on('end',()=>{
                        console.log(body)
                        const data = JSON.parse(body);
                        // aquí ya se ha llamado a la base de datos
                        res.writeHead(201, {'Content-Type':'application/json; charset=utf-8'});
                        res.end(JSON.stringify(data));

                    })
                    break;
                    default:
                        res.statusCode = 404
                        res.setHeader('Content-Type', 'text/plain; charset=utf-8')
                        return  res.end('<h1>Recurso no procesado 404</h1>');
            }
    }
    })
    server.listen(PORT,()=> {
        console.log(`servidor escuchando en puerto ${server.address().port}`)
    }) 
     