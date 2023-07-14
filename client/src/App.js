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

function App() {
   const Location = useLocation();
   const navigate = useNavigate();
   const [characters, setCharacters] = useState([]);
   const [access, setAccess] = useState(false);

   const login = (userData) => {
      const { email, password } = userData;
      const URL = 'http://localhost:3001/rickandmorty/login/';
      axios(URL + `?email=${email}&password=${password}`).then(({ data }) => {
        const { access } = data;
        setAccess(access); 
        access && navigate('/home');
      });
    };

   useEffect (() =>{
      !access && navigate('/')
   },[access]);

   const onSearch = (id) => {
      axios(`http://localhost:3001/rickandmorty/character/${id}`).then(({ data }) => {
         if (data.name) {
            setCharacters((oldChars) => [...oldChars, data]);
         } else {
            window.alert('¡No hay personajes con este ID!');
         }
      });
   }
   
   const onClose = (id) => {
      setCharacters((prevCharacters) =>
        prevCharacters.filter((character) => character.id !== id)
      );
    };

   return (
      <div className='App'>
         {Location.pathname !== "/" && <Nav onSearch={onSearch} setAccess={setAccess}/>}
         <Routes>
            <Route path='/' element={<Form login={login} />} />
            <Route path="/home" element = {<Cards characters={characters} onClose={onClose}/> }/>
            <Route path="/about" element={<About />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path='/favorites' element={<Favorites />} />
         </Routes>
      </div>
   );
}

export default App;


   //falta agregar styles