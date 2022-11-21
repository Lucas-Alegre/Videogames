import React from "react";
import styles from './Paginado.module.css'

export default function Paginado({ recipeForPage, allRecipe, paginado }) {
    const pageNumber = [];
    //esto me va atraer la cantidad de paginas a crear
    for (let i = 0; i <= Math.ceil(allRecipe / recipeForPage) -1; i++) {
        pageNumber.push(i + 1);
    }

    return (
        <nav>
            <ul className={styles.paginado} >
                {/*Aca pregunta si hay array */
                    pageNumber &&
                    pageNumber.map((number) => (
                        <li className={styles.number} >
                            <a onClick={() => paginado(number)}> {number} </a>
                        </li>

                    ))
                }
                <li></li>
            </ul>
        </nav>
    )
}