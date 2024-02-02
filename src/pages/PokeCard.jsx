import { useEffect } from "react"
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { infoPoke } from "../redux/pokesSlice";

export const PokeCard = () => {
    const dispatch = useDispatch()
    const pokemon = useSelector(state => state.pokemon) 
    const pokeUrl = useSelector(state => state.pokemon.url)
    const pokeName = useSelector(state => state.pokemon.name)

    const getUniquePoke = (url) => {
        fetch(url)
            .then(res => res.json())
            .then(data => {      
                dispatch(infoPoke(data))
            })    
            .catch(error => console.log(error))
    }

    useEffect(() => {
        getUniquePoke(pokeUrl)
    }, [pokeUrl])
    
    return (
        <div>        
            <div>          
                <h3>Name: {pokeName} </h3>      
                <h3>Abilities:</h3>
                <ul>
                    {pokemon.abilities.map((abi, key) => {
                        return (
                            <li key={key}>{abi.ability?.name}</li>
                        )
                    })}         
                </ul> 
                <h3>Height: </h3> <p>{pokemon.height}</p>
                <h3>Order: </h3> <p>{pokemon.order}</p>                
            </div>        
        <div>
            <button>
                <Link to={'/'} >Regresar</Link>
            </button>
        </div>
      </div>
    )
  }
  
