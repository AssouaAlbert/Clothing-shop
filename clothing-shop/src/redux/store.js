import {createStore, applyMiddleware} from 'redux';
import rootReducer from './redux-reducer';
//Createstore  is used to create store
//Middlewares are used to listen for information
import logger from 'redux-logger'; //Logger contains methods for the middleware
const middleWares = [logger]; //Loggers tell the state of redux after every action is fired
const store = createStore(rootReducer,applyMiddleware(...middleWares)); //There is only one reducer in the create store
export default store;