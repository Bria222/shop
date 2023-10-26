import { configureStore } from '@reduxjs/toolkit'
import sidebarReducer from './sidebarSlice'
import categoryReducer from './categorySlice'
import productReducer from './productSlice'
import cartReducer from './cartSlice'
import searchReducer from './searchSlice'
import authReducer from '../features/auth/authSlice'
import { authApi } from './services/auth/authService'

const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    sidebar: sidebarReducer,
    category: categoryReducer,
    product: productReducer,
    cart: cartReducer,
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
})

export default store
