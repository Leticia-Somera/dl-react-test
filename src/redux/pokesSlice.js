import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    name: '',
    url: '',
    id: '',
    abilities: [],
    height: '',
    order: '',
    image: ''
}

export const pokesSlice = createSlice({
    name: 'pokemon',
    initialState,
    reducers: {
        choosePoke: (state, action) => {
            const {name, url} = action.payload
            state.name = name
            state.url = url
        },
        infoPoke: (state, action) => {
            const {id, abilities, height, order} = action.payload
            state.id = id
            state.abilities = abilities
            state.height = height
            state.order = order
        },
        addPokeImg: (state, action) => {
            state.image = action.payload
        
        },
    }
})

export const { choosePoke, infoPoke, addPokeImg } = pokesSlice.actions
export default pokesSlice.reducer