import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postVideogames, getGenres } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import styles from './Videogames.module.css'

function validate(input) {
    let error = {};
    const simbolo1 = "-";
    const simbolo2 = "_";
    const simbolo3 = ".";
    const simbolo4 = "!";
    const simbolo5 = "¡";
    const simbolo6 = "¿";
    const simbolo7 = "?";
    const simbolo8 = "#";
    const simbolo9 = "@";
    if (!input.name) {
        error.name = "Falta el Nombre";
    }
    if (input.name.includes(simbolo1) || input.name.includes(simbolo2) || input.name.includes(simbolo3) ||
        input.name.includes(simbolo4) || input.name.includes(simbolo5) || input.name.includes(simbolo6) ||
        input.name.includes(simbolo7) || input.name.includes(simbolo8) || input.name.includes(simbolo9)) {
        error.name = "Estos simbolos No son validos( .  -  !  ¡  ¿  ?  #  @ )";
    }

    if (!input.description) {
        error.description = "La Descripción no puede ser vacía";
    }
    if (input.description.length > 30) {
        error.description = "La Descripción debe ser menor a 30 carácteres";
    }

    if (!input.released) {
        error.released = "El Released no puede ser vacío";
    }

    if (!input.rating) {
        error.rating = "El Rating no puede ser vacío";
    }
    if (input.rating % 1 !== 0) {
        error.rating = "El Rating no puede ser un decimál";
    }
    if (input.rating < 1 || input.rating > 5) {
        error.rating = "El Rating debe ser entre (1 Y 5)";
    }

    if (!input.image) {
        error.image = "La Imagen no puede ser vacía";
    }
    return error;
}
export default function VideogamesCreated() {
    const dispatch = useDispatch();
    const histori = useHistory()
    const genres = useSelector(state => state.genres)
    const [error, setErros] = useState({});
    const [input, setInput] = useState({
        name: "",
        description: "",
        released: "",
        rating: 0,
        platforms: [],
        image: "",
        genres: []
    })

    const plataformas = [
        "PC",
        "Android",
        "iOS",
        "PS Vita",
        "Linux",
        "macOS",
        "Wii U",
        "Nintendo 3DS",
        "PlayStation 5",
        "PlayStation 4",
        "PlayStation 3",
        "Xbox Series S/X",
        "Xbox 360",
        "Xbox One",
        "Nintendo Switch",
    ]
    useEffect(() => {
        dispatch(getGenres())
    }, [])
    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErros(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }
    function handleSelect(e) {
        setInput({
            ...input,
            genres: [...input.genres, e.target.value]
        })
    }

    function handleDelete(e) {
        setInput({
            ...input,
            genres: input.genres.filter(oc => oc != e)
        })
    }

    function handleSelectPlataformas(e) {
        setInput({
            ...input,
            platforms: [...input.platforms, e.target.value]
        })
    }
    function handleDeletePlataformas(e) {
        setInput({
            ...input,
            platforms: input.platforms.filter(oc => oc != e)
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        dispatch(postVideogames(input));
        alert("Videogame Created")
        console.log(input)
        setInput({
            name: "",
            description: "",
            released: "",
            rating: 0,
            platforms: [],
            image: "",
            genres: []
        })
        histori.push('/home')
    }
    return (
        <div className={styles.container}>
            <h1>Crea tu Videogames</h1>
            <h2> <Link to="/home"><button className={styles.soyh2}>Volver Al Inicio</button></Link></h2>
            <div className={styles.inputsContainer}>

                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className={styles.inputContainer}>
                        <label>Name</label>
                        <input
                            type="text"
                            placeholder="Ecribe el Nombre"
                            required
                            value={input.name}
                            name="name"
                            onChange={handleChange} />
                        {
                            error.name && (
                                <p>{error.name}</p>
                            )
                        }
                    </div>

                    <div className={styles.inputContainer}>
                        <label>Descriptión</label>
                        <input
                            type="text"
                            placeholder="Ecribe una Descripción"
                            required
                            value={input.description}
                            name="description"
                            onChange={handleChange} />
                        {
                            error.description && (
                                <p>{error.description}</p>
                            )
                        }
                    </div>
                    <div className={styles.inputContainer}>
                        <label>Released</label>
                        <input
                            type="date"
                            placeholder="Ecribe el Released"
                            required
                            value={input.released}
                            name="released"
                            onChange={handleChange} />
                        {
                            error.released && (
                                <p>{error.released}</p>
                            )
                        }
                    </div>
                    <div className={styles.inputContainer}>
                        <label>Rating</label>
                        <input
                            type="number"
                            placeholder="Ecribe el Rating"
                            required
                            value={input.rating}
                            name="rating"
                            onChange={handleChange} />
                        {
                            error.rating && (
                                <p>{error.rating}</p>
                            )
                        }
                    </div>
                    <div className={styles.inputContainer}>
                        <label>Image</label>
                        <input
                            type="text"
                            placeholder="Ecribe la url de la Image"
                            required
                            value={input.image}
                            name="image"
                            onChange={handleChange} />
                        {
                            error.image && (
                                <p>{error.image}</p>
                            )
                        }
                    </div>
                    <div className={styles.inputContainer}>
                        <select onChange={handleSelect} className={styles.inputSelet}>
                            {genres.map((gen) => (
                                <option value={gen.name} >{gen.name}</option>
                            ))
                            }
                            <ul><li>{input.platforms.map(e => e + ", ")} </li></ul>

                        </select>

                        <select onChange={handleSelectPlataformas} className={styles.inputSelet}>
                            {plataformas.map((gen) => (
                                <option value={gen} >{gen}</option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.inputSelet2}>
                        <div className={styles.inputCol}>
                            <h3>Generos</h3>
                            {
                                input.genres.map(el =>
                                    <div className={styles.inp}>

                                        <button className={styles.botonx} onClick={() => handleDelete(el)} >X</button>

                                        <p> {el} </p></div>
                                )
                            }
                        </div>
                        <div className={styles.inputCol}>
                            <h3>Plataformas</h3>
                            {
                                input.platforms.map(el =>
                                    <div className={styles.inp}>

                                        <button className={styles.botonx} onClick={() => handleDeletePlataformas(el)} >X</button>

                                        <p> {el} </p>   </div>
                                )
                            }</div>
                    </div>

                    <button className={styles.boton2} type="submit">Crear Videogames</button>
                </form>

            </div>
        </div>
    )

}