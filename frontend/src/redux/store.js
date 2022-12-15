import {configureStore} from "@reduxjs/toolkit"
import authReducer from "./slice/auth-slice"
import messageReducer from "./slice/message-slice"
const reducer = {
    auth: authReducer,
    message: messageReducer
  }
const store = configureStore({
    reducer
})

export default store