import React from "react";
import styles from './Card.module.css'
import { Link } from "react-router-dom";

export default function Card({ name, image, genres,id }) {
    return (
        <div className={styles.card} >
            <div className={styles.div__image} >
                <img src={image} alt="Imagen Food!" className={styles.img} />
            </div>
            <h1>{name}</h1>
            <Link to={'/home/' + id}>Ver Detalles Videogames</Link>

            <div className={styles.div__ul} >
                <ul className={styles.listas} >
                    {genres.map(d => <li className={styles.lista} key={d}>{d.name}</li>)}</ul>
            </div>
        </div>
    )
}