import { NavLink } from "react-router-dom";
import Button from "./Button";
import { TiThMenu } from "react-icons/ti";
import { IoCloseCircle } from "react-icons/io5";

export const NavBar = () => {

  const handleMenuClick = () => {
    document.getElementById("menuContainer").classList.toggle("show");
  }
  return (
    <div className="nav-conatainer">
      <nav>
        <TiThMenu 
          color="white" 
          size="3rem" 
          onClick={handleMenuClick}
          className="custom-menu-icon"
        />
        
        <div id="menuContainer" className="links-container">
          <div id="closeMenu" className="links-container__close">
            <IoCloseCircle 
              color="white" 
              size="3rem" 
              onClick={handleMenuClick}
            />
          </div>
          <div className="links-container__list">
            <NavLink 
              to="/" 
              className="links-container__list-item"
              onClick={handleMenuClick}
            >
              Home
            </NavLink>
            <NavLink 
              to="/market" 
              className="links-container__list-item"
              onClick={handleMenuClick}
            >
              Market
            </NavLink>
            <NavLink 
              to="/create" 
              className="links-container__list-item"
              onClick={handleMenuClick}
              >
              Create
            </NavLink>
          </div>
        </div>

        <Button 
          label="Connect Wallet" 
          type="primary" 
          size="medium" 
          labelColor="white" 
          
        />
      </nav>
    </div>

  )
}
