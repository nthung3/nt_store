import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import thunk from 'redux-thunk';

const reducer = combineReducers({});

export const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
