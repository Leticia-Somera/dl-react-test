import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { choosePoke } from "../redux/pokesSlice"

let counterPage = 20
let limitPerPage = 20

export const PokeList = () => {    
    const dispatch = useDispatch()

    const [pokesList, setPokesList] = useState([])
    const [disableNext, setDisableNext] = useState(false)
    const [disablePrev, setDisablePrev] = useState(true)

    const getAllPokes =  (limitPerPage, offset) => {
        const URL = `https://pokeapi.co/api/v2/pokemon/?limit=${limitPerPage}&offset=${offset}`
        fetch(URL)
            .then(res => res.json())
            .then(data => setPokesList(data.results))        
            .catch(error => console.log(error))
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
                <ul 
                >    
                {pokesList.map((poke, key) => {
                    return (  
                    <li 
                        key={key}
                        onClick={() => {
                            dispatch(choosePoke(poke))
                        }}
                        >
                            <div className="list-container">
                                <Link to={`/pokeimage`} >IMAGEN <Link to={`/pokecard`} >{poke.name}</Link></Link>
                            </div>
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
        </div>
    )
}
