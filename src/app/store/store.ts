import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import thunk from 'redux-thunk';
import { AuthReducer } from './reducers/auth';
import { ProductDetailReducer, ProductReducer } from './reducers/product';

const reducer = combineReducers({ auth: AuthReducer, product: ProductReducer, productDetail: ProductDetailReducer });

export const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
export type RootState = ReturnType<typeof reducer>;
