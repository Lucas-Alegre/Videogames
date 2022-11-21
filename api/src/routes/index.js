const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

const videogameRouter= require('./videogames.js');
const genreRouter = require('./genre.js')
// Configurar los routers
router.use('/videogames', videogameRouter);
router.use('/genres', genreRouter);

module.exports = router;
