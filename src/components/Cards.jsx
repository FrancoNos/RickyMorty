import Card from './Card';

export default function Cards({characters, onClose}) {
   return <div>
      {
         characters.map(({id, name, status, species, image, origin, gender}) =>{
            return( 
               <Card              
            key = {id}
            id={id}
            name ={name}
            status ={status}
            species ={species}
            image={image}
            origin={origin.name}
            gender={gender}
            onClose={onClose}

             />          
            )
         })
      }
   </div>;
}
