
import {CHANGE_UNITS} from "../actions/types";

const INITIAL_STATE = {
    units: 'imperial',
};

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case CHANGE_UNITS:
            return action.payload;
        default:
            return state;
    }
}