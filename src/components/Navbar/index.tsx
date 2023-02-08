import { NavLink } from 'react-router-dom';
import './styles.css';

const Navbar = () => {

  return (
    <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
      <div className="container">
        <NavLink className="navbar-brand" to="/">Anime Flix</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarItems" aria-controls="navbarItems" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarItems">
          <ul className="navbar-nav mb-0">
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="animes">Animes</NavLink>
            </li>
            
              <li className="nav-item">
                <NavLink className="nav-link" to="admin">Admin</NavLink>
              </li>
            
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
