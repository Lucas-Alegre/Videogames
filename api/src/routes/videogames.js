const { Router } = require('express');
const router = Router();
const { Videogame, Genre } = require("../db");
const model = require("../controller/getAll")


//  EJEMPLOS DE RUTAS GET
//  http://localhost:3001/videogames?name=Auto
//  http://localhost:3001/videogames
router.get('/', async (req, res) => {

    const name = req.query.name
    let allGames = await model.getAll();

    try {

        if (name) {
            let filterForName = await allGames.filter(e => e.name.toLowerCase().includes(name.toLowerCase()));
            if (filterForName.length) {
                let videoGamesPrimeros15 = [];

                for (let i = 0; i < filterForName.length; i++) {

                    if (i == 15) {
                        break;
                    }

                    videoGamesPrimeros15.push(filterForName[i]);
                }

                res.status(200).send(videoGamesPrimeros15)
            } else
                res.status(200).send('No se encontro VideoJuegos con ese nombre');
        } else {
            res.status(200).send(allGames)
        }

    } catch (error) {
        res.status(404).send(error);
    }
})



//  EJEMPLOS DE RUTAS POST
//  http://localhost:3001/videogames y por body pasarle OBJETO:
/*  EJEMPLO {
    "name": "LUCAS in Conconrdia",
    "description": "Esto es un simple juego de aventura en Concordia",
    "released": "2022-11-08",
    "rating": 5.0,
    "platforms": [
        "PC",
        "PlayStation 5"
    ],
    "image": "https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg",
    "genres": [
        "Action",
        "Adventure"
    ]
}*/
//Primero actualizar dos veces la ruta generos y videogames, luego si puedo crear videos.
router.post("/", async (req, res) => {

    const { name, description, released, rating, platforms, image, genres } = req.body;

    try {

        if (!name || !description || !genres) {
            return res.status(400).send("Name, description y genre es requerido");
        }

        const videoGamesDB = await Videogame.findAll({ where: { name: name } });

        if (videoGamesDB.length) {
            return res.send("El Name ya existe");
        }

        const newVideoGame = await Videogame.create({
            name, description, rating, released, image, platforms: platforms, createdInDb: true
        })

        const genreDB = await Genre.findAll({
            where: { name: genres }
        })

        newVideoGame.addGenre(genreDB)
        res.status(200).send("VideoJuego creado con exito!")

    } catch (error) {
        console.log(error)
        res.status(400).send("Ocurrio un error por lo que no logramos crear el juego")
    }
})




//  EJEMPLOS DE RUTAS GET Y BUSCAR POR ID
//  http://localhost:3001/videogames/3498
//  http://localhost:3001/videogames/e557b356-9669-48ad-9f2c-299d9d2e7508
router.get('/:id', async (req, res) => {

    const { id } = req.params;

    try {

        const allVideosGames = await model.getAll()
        const encontrated = allVideosGames.filter(e => e.id == id)

        if (encontrated.length) {
            return res.send(encontrated);
        }

        return res.send('No se encontro el id')
    } catch (error) {
        return res.status(404).send(error)
    }
})


module.exports = router;