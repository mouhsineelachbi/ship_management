const initialState = {
    loading: false,
    ships: [],
    error: ''
}

export const shipReducer = (state = initialState, action) => {
    switch(action.type){
        case 'FETCH_SHIPS_REQUEST':
            return {
                ...state,
                loading: true
            }
        case 'FETCH_SHIPS_SUCCESS' :
            return {
                loading: false,
                ships: action.payload,
                error: ''
            }
        case 'FETCH_SHIPS_FAILURE' :
            return {
                loading: false,
                ships: [],
                error: action.payload
            }
        default:
            return state
    }
}