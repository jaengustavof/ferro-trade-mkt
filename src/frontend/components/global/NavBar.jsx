import { NavLink } from "react-router-dom";
import ConnectWallet from "../ad-hoc/menu/ConnectWallet";
import { TiThMenu } from "react-icons/ti";
import { IoCloseCircle } from "react-icons/io5";
import { CartMenu } from "../ad-hoc/menu/CartMenu";
import useIsOwner from "../../hooks/useIsOwner";

export const NavBar = () => {

  const isOwner = useIsOwner();
  
  const links = [
    {
    name: "Home",
    path: "/"
  },
  {
    name: "Market",
    path: "/market"
  },
  ...(isOwner ? [{ name: "Create", path: "/create" }] : []) 
]
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
            {links.map((link, index) => (
              <NavLink 
                key={index} 
                to={link.path} 
                className="links-container__list-item"
                onClick={handleMenuClick}
              >
                {link.name}
              </NavLink>
            ))}
          </div>
          
        </div>
        <div className="actions-container">
          <CartMenu />
          <ConnectWallet />
        </div>
        
      </nav>
      
    </div>

  )
}
