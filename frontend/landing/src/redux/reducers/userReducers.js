import {
    GET_USER,
    SET_USER,
} from '../../constants/types';



const initialState = {
    user: {}
};

export const userReducers = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.payload
            }
        case GET_USER:
            return {
                ...state,
                user: action.payload
            }
    }
    return state;
}
