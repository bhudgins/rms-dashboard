import * as actionTypes from './actions';
//import ApiClientService from '../api-client-service';

//let client = new ApiClientService();

const initialState = {
    userToken: '',
    loginToggle: false //client.loggedIn()
};

// TODO - adding our actions for udpating the token in our state.
export const reducer = (state = initialState, action:any) => {
    switch(action.type) {
        case actionTypes.TOGGLE_LOGIN:
            return {
                ...state,
                loginToggle: action.payload
            };
        case actionTypes.CHANGE_TOKEN:
            return {
                ...state,
                userToken: action.payload
            }
    }
    return state;
};



