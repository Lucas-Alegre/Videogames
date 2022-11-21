import React from "react";
import { Link } from "react-router-dom";
import styles from './Home.module.css'
import Card from "../Card/Card";
import Paginado from "../Paginado/Paginado";
import SearchBar from "../SearchBar/SearchBar";
//import axios from 'axios'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllVideogames, OrderByName, filterForGenres, filterRaiting, filterCreated } from '../../redux/actions'


function Home() {
    const dispatch = useDispatch();
    const allVideogames = useSelector((state) => state.videogames)
    const [estadoParaSort, setEstadoParaSort] = useState('');
    const [estadoParaSortHealscore, setEstadoParaSortHealscore] = useState('');
    const [tomas, setTomas] = useState(true)
    //Un estado con la pagina actual y set para cambiarlo
    const [currentPage, setCurrenPage] = useState(1);
    //Country por paginas, aqui se agregaran el conjunto 9 por pagina
    const [recipeForPage, setCountryForPage] = useState(15);
    //Aca multimplicamos la pagina actual x cantidad De paginado y ese es el ultimo indice
    const indexUltimoRecipe = currentPage * recipeForPage;
    //aca restamos el ultimo indice - cantidad de paginado para que sea el primer indice
    const indexPrimerRecipe = indexUltimoRecipe - recipeForPage;
    //Aca voy a contener el grupo de country actuales, trayendo el array de DB;
    const currentCountry = allVideogames.slice(indexPrimerRecipe, indexUltimoRecipe);

    const paginado = (pageNumber) => {
        setCurrenPage(pageNumber);
    }


    useEffect(() => {
        dispatch(getAllVideogames())
    }, [dispatch])

    function handleSubmit(e) {
        e.preventDefault()
        dispatch(OrderByName(e.target.value))
        setCurrenPage(1);
        setEstadoParaSort(`ordenado ${e.target.value}`);
    }

    function handleType(e) {
        dispatch(filterForGenres(e.target.value))
    }

    function handleRaiting(e) {
        dispatch(filterRaiting(e.target.value))
        setEstadoParaSortHealscore(`ordenado ${e.target.value}`)
        tomas ? setTomas(false) : setTomas(true)
    }
    function handleCreated(e) {
        dispatch(filterCreated(e.target.value))
       /* setEstadoParaSortHealscore(`ordenado ${e.target.value}`)
        tomas ? setTomas(false) : setTomas(true)
    */}



    return (
        <div>

            <div className={styles.body} >
                <h1>Videogames!</h1>
                <h2>Volver hacia la  <Link to="/">Presentación</Link></h2>
                <Link to="/createVideogames"><h3>Crear un nuevo VideoJuego</h3></Link>

                <select onChange={(e) => handleSubmit(e)}>
                    <option value="Default">Order Alfabetic</option>
                    <option value="asc">Ascendente</option>
                    <option value="desc">Descendente</option>
                </select>

                <select onChange={(e) => handleType(e)}>
                    <option value="Adventure">Adventure</option>
                    <option value="Strategy">Strategy</option>
                    <option value="Action">Action</option>
                    <option value="RPG">RPG</option>
                    <option value="Indie">Indie</option>
                    <option value="Shooter">Shooter</option>
                    <option value="Casual">Casual</option>
                    <option value="Simulation">Simulation</option>
                    <option value="Puzzle">Puzzle</option>
                    <option value="Arcade">Arcade</option>
                    <option value="Racing">Racing</option>
                    <option value="Massively Multiplayer">Massively Multiplayer</option>
                    <option value="Platformer">Platformer</option>
                    <option value="Sports">Sports</option>
                    <option value="Fighting">Fighting</option>
                    <option value="Family">Family</option>
                    <option value="Educational">Educational</option>
                    <option value="Card">Card</option>
                    <option value="Board Games">Board Games</option>
                </select>

                <select onChange={(e) => handleRaiting(e)}>
                    <option value="Default">Order By Rating</option>
                    <option value="desc">HIGHER</option>
                    <option value="asc">LOWER</option>
                </select>

                <select onChange={(e) => handleCreated(e)}>
                    <option value="all">Order By Created</option>
                    <option value="created">Created</option>
                    <option value="api">Existente</option>
                </select>


                <Paginado recipeForPage={recipeForPage} allRecipe={allVideogames.length}
                    paginado={paginado} />
                <SearchBar />
                <div className={styles.container}>
                    {
                        currentCountry.length > 0 ?
                            currentCountry.map((e) => {
                                return (

                                    <Card name={e.name} image={e.image} genres={e.genres} id={e.id} />
                                )
                            }) :

                            <div>
                                <h1>Loading</h1>
                            </div>
                    }
                </div>

            </div>
        </div >
    )
}

export default Home;