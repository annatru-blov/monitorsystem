
import { legacy_createStore as createStore } from "redux";
import profileReducer from './profile-reducer';
import {  combineReducers } from "redux";


let reducers = combineReducers({

    profilePage: profileReducer,
   
});

let store = createStore(reducers);
window.store = store;

export default store;