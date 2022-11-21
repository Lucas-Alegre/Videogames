import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { getDetail2, getDetail } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import styles from './Detail.module.css'

export default function Detail(props) {
    /*return (
        <div>
            {
                myVideogames2.length > 0 && !myVideogames2[0].createdInDb ?

                    <div className={styles.card}>
                        <div className={styles.card-header} >
                            <div className={styles.card-title-group} >
                                <h1 className={styles.card-title} > {myVideogames.name} </h1>

                            </div>

                        </div>

                        <div>

                        </div>

                        <div>

                        </div>

                        <h1> {myVideogames.name} </h1>
                        <img src={myVideogames.background_image} alt="Una imagen" />
                        <h3>Generos: {myVideogames2[0].genres.map(e => e.name + (' '))} </h3>
                        <h5> {myVideogames.description_raw} </h5>
                        <h4> {myVideogames2[0].released} </h4>
                        <h4> {myVideogames2[0].rating} </h4>
                        <h3>Plataformas: {myVideogames2[0].platforms.map(e => e + (' '))} </h3>
                    </div> :
                    myVideogames2.length < 1 ?
                        <div>
                            <h1>Loading</h1>
                        </div> :
                        <div>
                            <h1>Estoy en base de datos</h1>
                            <h1> {myVideogames2[0].name} </h1>
                            <img src={myVideogames2[0].image} alt="Una imagen" />
                            <h4>Generos: {myVideogames2[0].genres.map(e => e.name + (' '))} </h4>
                            <h5>  {myVideogames2[0].description}</h5>
                            <h4> {myVideogames2[0].released} </h4>
                            <h4> {myVideogames2[0].rating} </h4>
                            <h3>Plataformas: {myVideogames2[0].platforms.map(e => e + (' '))} </h3>
                        </div>

            }
            <Link to="/home"><button>Volver</button></Link>
        </div>
    )*/
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getDetail2(props.match.params.id))
    })
    useEffect(() => {
        dispatch(getDetail(props.match.params.id))
    })
    const myVideogames = useSelector((state) => state.detail2)
    const myVideogames2 = useSelector((state) => state.detail)
    const miId = props.match.params.id;
    //let myVideogames = await axios.get(`https://api.rawg.io/api/games/${id}?key=4f028c5361584b569171f0c1da755109`)

    return (
        <div >
            {
                myVideogames2.length > 0 && !myVideogames2[0].createdInDb ?
                    <div >
                        <div className={styles.card}>
                            <div className={styles.card_header} >
                                <div className={styles.card_title_group} >
                                    <h1 className={styles.card_title} > {myVideogames.name} </h1>
                                </div>
                                <div className={styles.card_points}> {myVideogames2[0].rating} </div>
                            </div>

                            <div className={styles.imageContainer} >
                                <img src={myVideogames.background_image} alt="Una imagen" className={styles.image} />
                            </div>

                            <div className={styles.card_text_container}>
                                <div className={styles.hide_element} >
                                    <h5> {myVideogames.description_raw} </h5>
                                </div>
                            </div>
                            <div>

                                <h4> {myVideogames2[0].released} </h4>
                                <h3>Generos: {myVideogames2[0].genres.map(e => e.name + (' '))} </h3>
                                <h3>Plataformas: {myVideogames2[0].platforms.map(e => e + (' '))} </h3>
                            </div>

                        </div>
                    </div> :
                    myVideogames2.length < 1 ?
                        <div>
                            <h1>Loading</h1>
                        </div> :


                        <div>
                            <div className={styles.card}>
                                <div className={styles.card_header} >
                                    <div className={styles.card_title_group} >
                                        <h1 className={styles.card_title} > {myVideogames2[0].name} </h1>
                                    </div>
                                    <div className={styles.card_points}> {myVideogames2[0].rating}  </div>
                                </div>

                                <div className={styles.imageContainer} >
                                    <img src={myVideogames2[0].image} alt="Una imagen" className={styles.image} />
                                </div>

                                <div className={styles.card_text_container}>
                                    <div className={styles.hide_element} >
                                        <h5> {myVideogames2[0].description} </h5>
                                    </div>
                                </div>
                                <div>
                                    <h4> {myVideogames2[0].released} </h4>
                                    <h4>Generos: {myVideogames2[0].genres.map(e => e.name + (' '))} </h4>
                                    <h3>Plataformas: {myVideogames2[0].platforms.map(e => e + (' '))} </h3>
                                </div>
                            </div>
                        </div>

                /*myVideogames.length > 0 ?

            <div>
                <h1> {myVideogames[0].name} </h1>
                <img src={myVideogames[0].image} alt="Una imagen" />
                <h4>Generos: {myVideogames[0].genres.map(e => e.name + (' '))} </h4>
                <h5>  {myVideogames[0].description}</h5>
            </div>
            :
            <div>
                <h1>Loading</h1>
            </div>*/
            }
            <Link to="/home"><button>Volver</button></Link>
        </div>
    )
}