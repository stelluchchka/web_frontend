import { combineReducers, configureStore } from "@reduxjs/toolkit"
import mainDataReducer from "./slices/mainSlice"
import detailedDataReducer from './slices/detailedSlice'
import authDataReducer from "./slices/authSlice"
import ordersDataReducer from './slices/orderSlice'


export default configureStore({
    reducer: combineReducers({
        mainData: mainDataReducer,
        detailedData: detailedDataReducer,
        authData: authDataReducer,
        ordersData: ordersDataReducer
    })
})