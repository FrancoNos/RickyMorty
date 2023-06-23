 import './App.css';
import Cards from './components/Cards.jsx';
import Nav from './components/Nav.jsx';
import Form from './components/Form';
import Favorites from './components/Favorites/Favorites';
import About from './components/About';
import Detail from './components/Detail';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

const email = "fran@hotmail.com";
const password = "123asd";

function App() {
   const Location = useLocation();
   const navigate = useNavigate();
   const [characters, setCharacters] = useState([]);
   const [access, setAccess] = useState(false);

   const login = (userData) => {
      if (userData.password === password && userData.email === email) {
         setAccess(true);
         navigate('/home');
      }
   }

   useEffect (() =>{
      !access && navigate('/')
   },[access]);

   const onSearch = (id) => {
      axios(`https://rickandmortyapi.com/api/character/${id}`).then(({ data }) => {
         if (data.name) {
            setCharacters((oldChars) => [...oldChars, data]);
         } else {
            window.alert('¡No hay personajes con este ID!');
         }
      });
   }

   const onClose = (id) =>{
      const charactersFiltered = characters.filter(character => character.id !== Number(id));
      setCharacters(charactersFiltered);
   }

   return (
      <div className='App'>

      {
         Location.pathname !== "/" && <Nav onSearch={onSearch} setAccess={setAccess}/>
      }
      <Routes>
         <Route path='/' element = {<Form login={login}/>}/>
         <Route path="/home" element = {<Cards characters={characters} onClose={onClose}/> }/>
         <Route path="/about" element ={<About/>}/>
         <Route path="/detail/:id" element={<Detail/>}/>
         <Route path='/favorites' element={<Favorites/>}/>
      </Routes>
          
      </div>
   );
}
   export default App
