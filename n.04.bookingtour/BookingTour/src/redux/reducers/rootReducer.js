// ** Redux Imports
import { combineReducers } from "redux"
import user from "../../pages/user/store/reducer"
// ** Reducers Imports
import authReducer from "./auth"
import tour from "../../pages/tour/store/reducer"
import payment from "../../pages/payment/store/reducer"
const rootReducer = combineReducers({
    authReducer,
    user,
    tour,
    payment
})

export default rootReducer
