import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
import { composeWithDevTools } from '@redux-devtools/extension';


export const store = configureStore({
    reducer: {
        user: userReducer
    },
// other store enhancers if any can be added here
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
})