import { Link } from "react-router-dom";
import {addFav, removeFav} from "../redux/actions"
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import style from "./Card.module.css";

 function Card({id, name, status, species, image, origin, onClose, gender, addFav, removeFav, myFavorites}) {
  
   const [isFav, setIsFav] = useState(false);

   const handleFavorite = () =>{
      if (isFav){
         setIsFav(false);
         removeFav(id);
      }
      else {
         setIsFav(true);
         addFav({id, name, status, species, image, origin, gender});
      }
   }

   useEffect(() => {
      myFavorites.forEach((fav) => {
         if (fav.id === id) {
            setIsFav(true);
         }
      });
   }, [myFavorites]);
  
   return (
      
      <div className={style.container}>

      <div className={style.button}> 
      {
         isFav ? (
          <button className={style.favo} onClick={handleFavorite}>❤️</button>
         ) : (
          <button className={style.favo} onClick={handleFavorite}>🤍</button>
       )
      }
      <button className={style.onClose} onClick={() => {onClose(id)}}>Close</button>

      </div>
      <br></br>
      <img  className={style.image} src={image} alt='' />

      <div className={style.letters}> 
         <Link to={`/detail/${id}`} >
         <h2>{name}</h2>
         </Link>
         <h4>{species}</h4>
         <h4>{gender}</h4>
         <h4>{origin}</h4>
         <h4>{status}</h4>

         </div>
         
      </div>
   );
}

const mapStateToProps = (state) =>{
   return{
      myFavorites: state.myFavorites
   }
}

const mapDispatchToProps = (dispatch) =>{
   return{
      addFav: (character) => {dispatch(addFav(character))},
      removeFav: (id) =>{dispatch(removeFav(id)) }
   }
}


export default connect(
   mapStateToProps,
   mapDispatchToProps
)(Card);
