//const  {Genre}  = require("../db.js");
const { Router } = require("express");
const axios = require("axios");
const router = Router();
const { APIKEY, APIKEY2, APIKEY3 } = process.env;
const { Videogame, Genre } = require("../db");



router.get('/', async (req, res) => {

    const getGenre = await axios.get(`https://api.rawg.io/api/genres?key=${APIKEY3}`);
    const genre = await getGenre.data.results.map(e => e.name)

    genre.forEach(e => Genre.findOrCreate({
        where: { name: e } //
    }))

    const getAllGenre = await Genre.findAll()
    res.json(getAllGenre)
})





module.exports = router;
