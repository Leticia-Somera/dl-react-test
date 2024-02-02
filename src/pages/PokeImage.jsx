import { useEffect } from "react"
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addPokeImg } from "../redux/pokesSlice";

export const PokeImage = () => {
  const dispatch = useDispatch()

  const imgUrl = useSelector(state => state.pokemon.image) 
  const pokeUrl = useSelector(state => state.pokemon.url)
  const pokeName = useSelector(state => state.pokemon.name)

  const getUniquePoke = (url) => {  
    fetch(url)
      .then(res =>res.json())
      .then(data => {
        dispatch(addPokeImg(data.sprites.front_default))         
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
            <img src={imgUrl} alt={pokeName} width={200} />
        </div>
      
      <div>
        <button>
            <Link to={'/'} >Regresar</Link>
        </button>
      </div>
    </div>
  )
}