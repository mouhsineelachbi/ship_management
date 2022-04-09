export const fetchShipsRequest = () => {
    return {
        type: 'FETCH_SHIPS_REQUEST'
    }
}

export const fetchShipsSucess = ships => {
    return {
        type: 'FETCH_SHIPS_SUCCESS',
        payload: ships
    }
}

export const fetchShipsFailure = error => {
    return {
        type: 'FETCH_SHIPS_FAILURE',
        payload: error
    }
}