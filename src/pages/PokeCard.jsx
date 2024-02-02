import { useEffect, useState } from "react"
import { IoIosCloseCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { infoPoke } from "../redux/pokesSlice";

export const PokeCard = () => {
  const dispatch = useDispatch()

  console.log('this is CARDDD')

    //componente para mostrar cada carta
    const [pokeData, setPokeData] = useState([])
    const pokeUrl = useSelector(state => state.pokemon.url)
    const pokeName = useSelector(state => state.pokemon.name)
    const statePokeData = useSelector(state => state.pokemon)

    const getUniquePoke = (url) => {
        fetch(url)
            .then(res =>res.json())
            .then(data => {        
                dispatch(infoPoke(data))
                setPokeData(statePokeData)
            })    
            .catch(error => console.log(error))
    }
  
    useEffect(() => {
        getUniquePoke(pokeUrl)
    }, [pokeUrl])

    return (
      <div>
        {pokeData &&
            <div>          
                <IoIosCloseCircleOutline />
                <h3>Name: {pokeName} </h3>        
                <h3>Abilities:</h3>
                <ul>
                    {pokeData.abilities.map((abi, key) => {
                        return (
                            <li key={key}>{abi.ability?.name}</li>
                        )
                    })}         
                </ul> 
                <h3>Height: </h3> <p>{pokeData.height}</p>
                <h3>Order: </h3> <p>{pokeData.order}</p>
                
            </div>
        }
        <div>
            <button>
                <Link to={'/'} >Regresar</Link>
            </button>
        </div>
      </div>
    )
  }
  
