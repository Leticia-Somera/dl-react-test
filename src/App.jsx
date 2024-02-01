import { useState, useEffect } from 'react'
import './App.css'
import { PokeCard } from './pages/PokeCard'

let counterPage = 20
let limitPerPage = 20

  //componente para mostrar lista
const PokeList = () => {
  const [pokesList, setPokesList] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [pokeInfo, setPokeInfo] = useState({})
  const [disableNext, setDisableNext] = useState(false)
  const [disablePrev, setDisablePrev] = useState(true)

  const getAllPokes = async (limitPerPage, offset) => {
    const URL = `https://pokeapi.co/api/v2/pokemon/?limit=${limitPerPage}&offset=${offset}`
    console.log('URL: ' , URL)

    const res = await fetch(URL)
    const data = await res.json()
    setPokesList(data.results)
  }

  useEffect(() => {
    getAllPokes(20, 20)
  } ,[])

  //Habilitar o deshablitar botón de Siguiente
  //Actualiza el endpoint
  const handlerNextPage = () => {
    counterPage += 20
    console.log('counter:', counterPage)
    if(counterPage <=20) {
      setDisablePrev(true)
      setDisableNext(false)
      limitPerPage = 20
    } else if(counterPage >20 && counterPage < 160) {
      setDisablePrev(false)
      setDisableNext(false)
    } else {
      limitPerPage = 11
      setDisablePrev(false)
      setDisableNext(true)
    }
    getAllPokes(limitPerPage, counterPage)
  }
  
  //Habilitar o deshablitar botón de Anterior
  //Actualiza el endpoint
  const handlerPrevPage = () => {
    console.log('counter:', counterPage)
    counterPage = counterPage-20

    if(counterPage <=20) {
      counterPage = 20
      setDisablePrev(true)
      setDisableNext(false)
    } else if(counterPage >20 && counterPage < 160) {
      counterPage -= 20
      setDisablePrev(false)
      setDisableNext(false)
      limitPerPage = 20
    } else {
      limitPerPage = 11
      setDisablePrev(false)
      setDisableNext(true)
    }
    getAllPokes(limitPerPage, counterPage)
  }

  return (
    <div>
      <div>
        <h1>Pokemones</h1>    
        <ul>    
          {pokesList.map((poke, key) => {
            return(        
              <>   
              <li key={key} onClick={() => 
                {setIsOpen(true)
                  setPokeInfo(poke)}
                }
                >{key+1}. {poke.name}</li>  
              </> 
            )            
          })}
              {isOpen && <PokeCard info={pokeInfo}  />} 
        </ul>
      </div>

      <div>
        <div>
          <button onClick={handlerPrevPage} disabled={disablePrev} >Anterior</button>
        </div>
        <div>
          <button onClick={handlerNextPage} disabled={disableNext}>Siguiente</button>
        </div>
      </div>
       
    </div>
  )
}


function App() {
  return (
    <>
      <PokeList />
    </>     
  )
}

export default App
