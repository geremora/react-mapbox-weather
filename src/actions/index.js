import axios from "axios";
import {API_ERROR, CHANGE_UNITS, FETCH_WEATHER} from "./types";

const API_KEY = "96f7f4c93edafff42961299e6b8302e0";
const ROOT_URL = `http://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}`;



export const fetchWeather = (lat, long, unit) => async dispatch => {
    try {
        const url = `${ROOT_URL}&lat=${lat}&lon=${long}&units=${unit}`;
        const request = await axios.get(url);

        dispatch({ type: FETCH_WEATHER, payload: request.data });
    } catch (e) {
        dispatch({ type: API_ERROR, payload: 'Error calling weather API' });
    }
};

export function changeUnits(units) {

    return {
        type: CHANGE_UNITS,
        payload: {units:units}
    };
}