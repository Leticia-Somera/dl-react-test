import { configureStore } from '@reduxjs/toolkit'
import pokeReducer from './pokesSlice'

export const store = configureStore({
    reducer: {
        pokemon: pokeReducer,
    },
}) 
