import UserInterfaceReducer from "./reducer_user_interface";
import {CHANGE_UNITS} from "../actions/types";


it('handles actions of type CHANGE_UNITS', () => {
    const action = {
        type: CHANGE_UNITS,
        payload: 'metric'
    };

    const newState = UserInterfaceReducer([], action);

    expect(newState).toEqual('metric');
});

it('handles action with unknown type', () => {
    const newState = UserInterfaceReducer([], { type: 'LKAFDSJLKAFD' });

    expect(newState).toEqual([]);
});