const initialState = {
    videogames: [],
    allVideogames: [],
    genres: [],
    allGenres: [],
    detail: [],
    detail2: []
}

function imprimeObj(ArrayObjeto) {
    const arrayValores = [];

    for (let i = 0; i < ArrayObjeto.length; i++) {
        arrayValores.push(ArrayObjeto[i].name)
    }

    return arrayValores;
}

function estaIncluido(arrayJuegos, valor) {
    const arrTodos = []
    for (let i = 0; i < arrayJuegos.length; i++) {
        let arrAux = imprimeObj(arrayJuegos[i].genres)

        if (arrAux.includes(valor)) {
            arrTodos.push(arrayJuegos[i])
        }

    }
    return arrTodos;
}


const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ALL_VIDEOGAMES':
            return {
                ...state,
                videogames: action.payload,
                allVideogames: action.payload
            }
        case 'GET_GENRES':
            return {
                ...state,
                genres: action.payload,
                allGenres: action.payload
            }

        case 'GET_DETAIL':
            return {
                ...state,
                detail: action.payload,
            }
        case 'GET_DETAIL2':
            return {
                ...state,
                detail2: action.payload,
            }
        case 'ORDER_BY_NAME':
            let allGames = state.videogames;
            if (action.payload === 'asc') {
                allGames = allGames.sort((a, b) => {
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (b.name > a.name) {
                        return -1;
                    }
                    return 0;
                })
            } else {
                if (action.payload === 'desc') {
                    allGames = allGames.sort((a, b) => {
                        if (a.name > b.name) {
                            return -1;
                        }
                        if (b.name > a.name) {
                            return 1;
                        }
                        return 0;
                    });
                } else {
                    allGames = state.allVideogames
                }
            }

            return {
                ...state,
                videogames: allGames
            }

        case 'FILTER_BY_RAITING':
            let videogamesByRaiting = state.videogames;
            if (action.payload === 'Default') {
                videogamesByRaiting = state.allVideogames
            }
            if (action.payload === 'asc') {
                videogamesByRaiting = videogamesByRaiting.sort((a, b) => {
                    if (a.rating > b.rating) return 1;
                    if (b.rating > a.rating) return -1;
                    return 0;
                })
            } else {
                if (action.payload === 'desc') {
                    videogamesByRaiting = videogamesByRaiting.sort((a, b) => {
                        if (a.rating > b.rating) return -1;
                        if (b.rating > a.rating) return 1;
                        return 0;
                    })
                }
            }
            return {
                ...state,
                videogames: videogamesByRaiting
            }

        case 'GET_ALL_VIDEOGAMES_BY_NAME':
            return {
                ...state,
                videogames: action.payload
            }

        case 'FILTER_BY_VALUE':
            const juegos = state.allVideogames
            var juegosByGenres = action.payload === 'all' ? juegos :

                juegosByGenres = estaIncluido(state.allVideogames, action.payload)

            return {
                ...state,
                videogames: juegosByGenres
            }

        case 'FILTER_CREATED':
            const LosJuegos = state.allVideogames
            var juegosByCreated = action.payload === 'created' ?
                LosJuegos.filter(e => e.createdInDb) :
                LosJuegos.filter(e => !e.createdInDb)

            return {
                ...state,
                videogames: action.payload === "all" ? LosJuegos : juegosByCreated
            }

        case 'POST_VIDEOGAMES':
            return {
                ...state,
            }

        default:
            return state;
    }
}

export default rootReducer;