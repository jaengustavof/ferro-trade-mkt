import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import ConnectWallet from "../ad-hoc/menu/ConnectWallet";
import { TiThMenu } from "react-icons/ti";
import { IoCloseCircle } from "react-icons/io5";
import { CartMenu } from "../ad-hoc/menu/CartMenu";
import useIsOwner from "../../hooks/useIsOwner";
import { DropdownProfile, FlowBlockAuth } from 'blockauth-sdk-react';
// blockauth-sdk-react CSS
import 'blockauth-sdk-react/public/output.css'

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
  // TODO: delete, just for dev
  const [isLogged, setIsLogged] = useState(false)

  const onSuccess = (address) => {
    setIsLogged(true)
    // TODO: call to normal login
    // handleLogin({
    //     email: getValues("email"),
    //     password: getValues("password"),
    //     address: address,
    // })
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
          {/* <ConnectWallet /> */}
          <div>
              {(isLogged) && <>
              <DropdownProfile
                  onLogout={()=>{
                      setIsLogged(false);
                  }}
                  onSuccess={onSuccess}
                  apiKey={"app.2927cdaa-3a27-5e98-a685-a03cfb493b3f"}
                  apiSecret={"5dd6f8243aa7778d541c833a80a9e7d7430068c60c0c9dc1b612ce8d91736612b21f96488e898e4dad0e11e173c46e830af5560a499fd34c9b05b96e17bed4dd.ffb02faacfedba7f"}
              />
              </>}
              {(!isLogged) && <>
              <FlowBlockAuth
                  apiKey={"app.2927cdaa-3a27-5e98-a685-a03cfb493b3f"}
                  apiSecret={"5dd6f8243aa7778d541c833a80a9e7d7430068c60c0c9dc1b612ce8d91736612b21f96488e898e4dad0e11e173c46e830af5560a499fd34c9b05b96e17bed4dd.ffb02faacfedba7f"}
                  onSuccess={onSuccess}
              />
              </>}
          </div>
        </div>
        
      </nav>
      
    </div>

  )
}
