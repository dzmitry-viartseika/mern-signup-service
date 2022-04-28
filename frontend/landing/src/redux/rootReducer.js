import { combineReducers } from "redux";
import { userReducers } from "./reducers/UserReducers";


export const rootReducer = combineReducers({
    user: userReducers,

})
