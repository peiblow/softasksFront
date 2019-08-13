import { combineReducers } from "redux";

import usuario from './usuario';
import board from './board';

export default combineReducers({
    usuario,
    board
})