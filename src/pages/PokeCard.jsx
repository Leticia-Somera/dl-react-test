import { useEffect, useState } from "react"
import { IoIosCloseCircleOutline } from "react-icons/io";

export const PokeCard = (info) => {
  console.log('this is CARDDD')

    //componente para mostrar cada carta
    const [pokeData, setPokeData] = useState([])
    const pokeUrl = info.info.url
    const pokeName = info.info.name

    const getUniquePoke = (url) => {
        fetch(url)
            .then(res =>res.json())
            .then(data => {        
                setPokeData(data)
            })
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
                    {pokeData.abilities?.map((abi, key) => {
                        return (
                            <li key={key}>{abi?.ability?.name}</li>
                        )
                    })}         
                </ul> 
                <h3>Height: </h3> <p>{pokeData.height}</p>
            </div>
        }
      </div>
    )
  }
  
