import './App.css'
import { PokeList } from './pages/PokeList'
import { PokeCard } from './pages/PokeCard'
import { PokeImage } from './pages/PokeImage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    // <PokeList />
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PokeList />} />
        <Route path='/pokecard' element={<PokeCard />} />
        <Route path='/pokeimage' element={<PokeImage />} />
      </Routes>
    </BrowserRouter>     
  )
}

export default App
