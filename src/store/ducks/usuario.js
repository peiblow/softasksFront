import { createActions, createReducer } from 'reduxsauce';

export const { Types, Creators } = createActions({
    setLogado: [ 'payload' ],
    setLogout: [ 'payload' ]
});

const INITIAL_STATE = {
    logado: false,
    user: []
};

export const setLogado = (state = INITIAL_STATE, action) => {
    const payload = action.payload;
    let logSuccess = payload.resultado ? true : false;

    return {
        ...state,
        user: payload.user,
        logado: logSuccess
    }
};

export const setLogout = (state = INITIAL_STATE, action) => ({
    ...state,
    logado: false,
    user: []
});

export const HANDLERS = {
    [Types.SET_LOGADO]: setLogado,
    [Types.SET_LOGOUT]: setLogout
}

export default createReducer(INITIAL_STATE, HANDLERS)