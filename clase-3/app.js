const express = require('express');
const app = express();
const { validateMovie } = require('./schemas/movies')
 
const movies = require('./movies.json')
const cryto = require('node:crypto')


app.disable('x-powered-by');
app.use(express.json())

// Todos os recursos que sean MOVIES se indentifican con /movies

app.get('/movies', (req, res) => {
    const { genre } = req.query;

    if (genre) {
        const filteredMovies = movies.filter(movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase()))
        return res.json(filteredMovies)
    }

    res.json(movies)
})
app.get('/movies/:id', (req, res) => {

    const { id } = req.params;

    const movie = movies.find(movie => movie.id === id);
    if (movie) {
        res.json(movie)
    } else {
        res.status(404).json({ message: 'No se ha podido encontrar la película' })
    }

})

app.post('/movies', (req, res) => {
    const { title, year, director, poster, genre, rate } = req.body;
 const result = validateMovie(req.body)

 if(result.error){
    return res.status(400).json( {message:result.error.message})
 } 
 
    const newMovie = {
        id: cryto.randomUUID(),
        title, year, director, poster, genre, rate
    }
    movies.push(newMovie)

    res.status(201).json({ message: 'Pelicula creada correctamente', movie: newMovie })
})


const PORT = process.env.PORT ?? 1234
app.listen(PORT, () => console.log('Servidor levantado', PORT));