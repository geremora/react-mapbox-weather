import {API_ERROR, FETCH_WEATHER} from "../actions/index";


const INITIAL_STATE = {
    weatherData: null,
    errorMessage: ''
};

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_WEATHER:
            return { ...state, weatherData: action.payload.data };
        case API_ERROR:
            return { ...state, errorMessage: action.payload };
        default:
            return state;
    }
}