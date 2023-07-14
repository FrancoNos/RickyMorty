import SearchBar from "./SearchBar";
import { Link, useNavigate } from "react-router-dom";

const Nav = ({onSearch, setAccess}) => {
    const navigate = useNavigate();
    const handleLogOut = () =>{
        setAccess(false);
        navigate("/")
    }

    return(
        <nav>
            <SearchBar onSearch={onSearch}/>
           
           <div>

            <button>
            <Link to="/about">About</Link>
            </button>

            <button>
            <Link to="/home">Home</Link>
            </button>

            <button>
            <Link to="/favorites">Favoritos</Link>
            </button>

            </div>

            <button onClick = {handleLogOut}>LOG OUT</button>

        </nav>
    )
}

export default Nav;