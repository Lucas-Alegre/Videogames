import React from "react";
import { Link } from "react-router-dom";
import styles from './LandingPage.module.css'

export default function LandingPage() {
    return (
        <div className={styles.body}>
            <h1 className={styles.h1_food}>Videogames!</h1>
            <nav className={styles.nav}><h1>Welcome to your Videogames</h1> </nav>
            <button> <Link to="/home" className={styles.a}> <h2 className={styles.animacion} >Comenzar</h2> </Link></button>
        </div>
    );
}
//Agregar debajo del nav
// 