import React from 'react'
import { FaCartArrowDown } from "react-icons/fa";
export const NFTCard = ({items}) => {
  return (
    <> 
        {items.map((item, idx) => (
            <div key={idx} className='nft-container'>
                <img className='nft-container__image' src={item.image} alt={item.name} key={idx} />
                <h4 className='nft-container__title'>{item.name}</h4>
                <p className='nft-container__sub'>AD Ferroviaria</p>
                {/*<p>{item.description}</p>*/}
                <div className='nft-container__info'>
                    <div className='info-container'>
                        <p className='amount'>€ {item.totalPrice}</p>
                        <p>precio</p>
                    </div>
                    <div className='info-container right'>
                        <p className='amount'>x {item.shares}</p>
                        <p className='shares'>acciones</p>
                    </div>
                </div>
                <div className="nft-container__buttton-container">
                    <button className='buy'>Comprar</button>
                    <button className='add'><FaCartArrowDown /></button>
                </div>
            </ div>
        ))}
    </>
  )
}
