import React from "react";
import { useState} from "react";
import { useDispatch } from "react-redux";
import { getAllVideogamesByName } from '../../redux/actions/index'
import styles from './Searchbar.module.css'


export default function SearchBar() {
    const [name, setName] = useState('');
    const dispatch = useDispatch();

    function handleSubmit(e) {
        e.preventDefault()
        setName(e.target.value);
    }
    function handele(e) {
        e.preventDefault();
        dispatch(getAllVideogamesByName(name))
        setName("");
    }
    return (
        <div className={styles.contain} >
            <input type="text" placeholder="Buscar..." onChange={(e) => handleSubmit(e)} />
            <button className={styles.but} type="submit" onClick={(e) => handele(e)}>BUSCAR</button>
        </div>
    )
}