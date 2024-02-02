import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { PokeCard } from "./PokeCard"
import { PokeImage } from "./PokeImage"

let counterPage = 20
let limitPerPage = 20

export const PokeList = () => {
    const [pokesList, setPokesList] = useState([])
    const [isOpenCard, setIsOpenCard] = useState(false)
    const [isOpenImg, setIsOpenImg] = useState(false)
    const [pokeInfo, setPokeInfo] = useState({})
    const [disableNext, setDisableNext] = useState(false)
    const [disablePrev, setDisablePrev] = useState(true)

    const getAllPokes = async (limitPerPage, offset) => {
        const URL = `https://pokeapi.co/api/v2/pokemon/?limit=${limitPerPage}&offset=${offset}`
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
                    return (  
                    <li key={key}>
                        <Link 
                        to={`/pokecard`}
                        onClick={() => {
                            setIsOpenCard(false)  
                            setPokeInfo(poke)               
                            setIsOpenImg(true) 
                        }}
                        >
                            {key+1}. {poke.name} 
                        </Link>
                       <Link 
                       to={`/pokeimage`}
                        onDoubleClick={() => {
                            setIsOpenImg(false) 
                            setPokeInfo(poke) 
                            setIsOpenCard(true)                                               
                        }}                        
                        >
                            {key+1}. {poke.name} 
                        </Link>
                    </li> 
                        
                        
                    )            
                })}
                </ul>
            </div>

            <div className="btns-container">
                <div>
                    <button onClick={handlerPrevPage} disabled={disablePrev} >Anterior</button>
                </div>
                <div>
                    <button onClick={handlerNextPage} disabled={disableNext}>Siguiente</button>
                </div>
            </div>       
                
            {isOpenCard && <Link to={`/pokecard/${pokeInfo.id}`}><PokeCard info={pokeInfo}  /></Link> } 
            {isOpenImg && <Link to={`/pokeimage/${pokeInfo.id}`}><PokeImage info={pokeInfo}  /></Link> } 
        </div>
    )
}
