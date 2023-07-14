import Card from './Card';
import style from "./Cards.module.css";

export default function Cards({ characters, onClose }) {
  return (
    <div className={style.cardsContainer}>
      {characters.map(({ id, name, status, species, image, origin, gender }) => (
        <Card
          key={id}
          id={id}
          name={name}
          status={status}
          species={species}
          image={image}
          origin={origin.name}
          gender={gender}
          onClose={onClose} 
        />
      ))}
    </div>
  );
}

