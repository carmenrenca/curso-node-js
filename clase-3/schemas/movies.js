const  z = require('zod');
const movieShema = z.object({
    title:z.string({
        invalid_type_error:'Movie title must be a string',
        required_error:'Movie title is required'
    }),
    year: z.number().int().min(1900).max(2024),
    director:z.string(),
    duration:z.number().int().positive(),
    rate:z.number().min(0).max(10),
    poster:z.string().url({
        message:'Url invalida'
    }),
    genre:z.array(z.enum('Action','Drama','Comedia','Romance'))

})

function validateMovie(object){
    return movieShema.safeParse(object)
}

module.exports ={
    validateMovie
}