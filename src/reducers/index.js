import { combineReducers } from "redux";
import WeatherReducer from "./reducer_weather";
import UserInterfaceReducer from "./reducer_user_interface";

const rootReducer = combineReducers({
    weather: WeatherReducer,
    userInterface: UserInterfaceReducer
});

export default rootReducer;