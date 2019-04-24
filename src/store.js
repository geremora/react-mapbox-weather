import { applyMiddleware, compose, createStore } from "redux";
import reducers from "./reducers";
import reduxThunk from 'redux-thunk';

const middlewares = [reduxThunk];

export const store = createStore(
    reducers,
    compose(applyMiddleware(...middlewares)),
);

export default store;