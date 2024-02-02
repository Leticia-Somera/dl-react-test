import { useEffect, useState } from "react"
import { IoIosCloseCircleOutline } from "react-icons/io";

export const PokeImage = (info) => {
    //componente para mostrar cada carta
    const [pokeData, setPokeData] = useState([])    
    const pokeUrl = info.info.url
    const pokeName = info.info.name

    const getUniquePoke = (url) => {  
      fetch(url)
        .then(res =>res.json())
        .then(data => {
          const imgUrl = data.sprites?.front_default

          setPokeData(imgUrl)
        })
    }
  
    useEffect(() => {
        getUniquePoke(pokeUrl)
    }, [pokeUrl])
  
    if(!pokeData) return null     
      return (
        <div>
          {pokeData &&
            <div>            
                <IoIosCloseCircleOutline />    
                <h3>Name: {pokeName} </h3>            
                <img src={pokeData} alt={pokeName} width={200} />
            </div>
          }
        </div>
      )
  }
  
