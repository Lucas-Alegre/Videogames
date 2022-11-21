import axios from 'axios';
/*export function getVideogames() {
    return async function (dispatch) {
        let json = await axios.get('http://localhost:3000/videogame');
        await dispatch({
            type: 'GET_VIDEOGAMES',
            payload: json.data
        })
    }
};*/

export const getAllVideogames = () => {
    return function (dispatch) {
        return fetch('http://localhost:3001/videogames')
            .then(respuesta => respuesta.json())
            .then(json => {
                dispatch({
                    type: 'GET_ALL_VIDEOGAMES',
                    payload: json
                })
            })
    }
}

export function getGenres() {
    return async function (dispatch) {
        let json = await axios.get('http://localhost:3001/genres');
        await dispatch({
            type: 'GET_GENRES',
            payload: json.data
        })
    }
};

export function getAllVideogamesByName(name) {
    return async function (dispatch) {
        var json = await axios.get('http://localhost:3001/videogames?name=' + name);
        return dispatch({
            type: 'GET_ALL_VIDEOGAMES_BY_NAME',
            payload: json.data
        })

    }
}
export function getDetail(id) {
    return async function (dispatch) {
        var json = await axios.get('http://localhost:3001/videogames/' + id);
        return dispatch({
            type: 'GET_DETAIL',
            payload: json.data
        })

    }
}
export function getDetail2(id) {
    return async function (dispatch) {
        var json = await axios.get(`https://api.rawg.io/api/games/${id}?key=72455178fc074729b4f03630dc0915f4`);
        return dispatch({
            type: 'GET_DETAIL2',
            payload: json.data
        })

    }
}

export function postVideogames(payload) {
    return async function (dispatch) {
        var json = await axios.post('http://localhost:3001/videogames', payload);
        return dispatch({
            type: 'POST_VIDEOGAMES',
            payload: json.data
        })

    }
}

export function OrderByName(payload) {
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
}
export function filterForGenres(payload) {
    return {
        type: 'FILTER_BY_VALUE',
        payload: payload
    }
}
export function filterRaiting(payload) {
    return {
        type: 'FILTER_BY_RAITING',
        payload
    }
}
export function filterCreated(payload) {
    return {
        type: 'FILTER_CREATED',
        payload
    }
}
