const { Videogame, Genre } = require("../db");
const axios = require("axios");
const { APIKEY ,APIKEY2, APIKEY3 } = process.env;

//Obtengo los primeros 100 VideoJuegos.
//Cada page trae 20 => yo voy a pedir 40 por eso son 2 paginas, sino demora muchisimo.
const gamesApi = async () => {
  try {
    const getGames = [];
    let numberPage = 1;
    while (numberPage <= 5) {
      let getApi = await axios.get(
        `https://api.rawg.io/api/games?key=${APIKEY3}&page=${numberPage}`
      );
      getApi.data.results.map((e) => {
        getGames.push({
          id: e.id,
          name: e.name,
          description :"",
          image: e.background_image,
          genres: e.genres.map((e) => {
            return {
              name: e.name,
            };
          }),
          released: e.released,
          rating: e.rating,
          platforms: e.platforms
            .map((e) => e.platform.name)
            .join()
            .split(","),
        });
      });
      numberPage++;
    }

    return getGames;
  } catch (error) {
    console.log(error);
  }
};


//Obtengo los juegos que estan en la Base de Datos.
const gamesDb = async function () {
  return await Videogame.findAll({
    include: {
      model: Genre,
      attribute: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};


//Concateno la api + lo que contiene la Base de Datos.
const getAll = async () => {
  const apiGames = await gamesApi();
  const dbGames = await gamesDb();
  const all = apiGames.concat(dbGames);
  return all;
};

module.exports = {
  getAll
}
