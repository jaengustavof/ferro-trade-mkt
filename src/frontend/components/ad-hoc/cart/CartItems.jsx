import { FaRegTrashAlt } from "react-icons/fa";
import { useEffect } from "react";
import useCart from "../../../hooks/useCart";
import useCartCalculations from "../../../hooks/useCartCalculations";
import { use } from "chai";

export const CartItems = () => {

    const { cart, setCart } = useCart();

    const { totalShares, subtotal, pricePerShare, finalPrice, shareRange, managementFees } = useCartCalculations(cart);
    console.log('cartItems:', cart);
    return (
        <div className="cart-items-container">
            <div className="logo-container"></div>
            <div className="cart-items">
                <h1 className="cart-items__heading">Carrito de Compra</h1>
                <p className="cart-items__text">Revisa los items de tu <span className="">carrito de Compra</span></p>

                {cart.length === 0 ? 
                <p className="cart-items__empty">No hay items en el carrito</p>
                :
                <>
                <div className="cart-items__container">

                    {
                        cart.map((item, idx) => (
                            <div key={idx} className="cart-items__item">
                                <div className="cart-items__item-image">
                                    <img src={item.image} alt="item" />
                                </div>
                                <div className="cart-items__item-details">
                                    <h4 className="item-title">{item.name}</h4>
                                    <div className="item-details-container">
                                        <div className="item-details-container__shares">
                                            <p className="text">acciones</p>
                                            <p>x {item.shares}</p>
                                        </div>
                                        <div className="item-details-container__price">
                                            <p className="text">precio</p>
                                            <p>€ {item.totalPrice}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="cart-items__item-remove">
                                    <button className="btn btn--danger" onClick={()     => {
                                        const newCart = cart.filter(cartItem => cartItem.itemId !== item.itemId);
                                        setCart(newCart);
                                    }}><FaRegTrashAlt style={{ fontSize: '2rem', color: 'red'}} /></button>
                                </div>
                            </div>
                        ))
                    }
                </div>

                <div className="cart-items__total"> 
                    <div className="cart-items__total-container">
                        <p className="text">Total acciones</p>
                        <p className="text">{totalShares}</p>
                    </div>
                    
                    <div className="cart-items__total-container">
                        <p className="text">Precio por acción</p>
                        <p className="text">{shareRange}</p>
                        <p className="text">€ {pricePerShare}</p>
                    </div>
                    <div className="cart-items__total-container">
                        <p className="text">Subtotal</p>
                        <p className="text">€ {totalShares * pricePerShare}</p>
                    </div>
                    
                    <div className="cart-items__total-container">
                        <p className="text">Gastos de gestión</p>
                        <p className="text">€ {managementFees}</p>
                    </div>
                    <div className="cart-items__total-container total-amount">
                        <p className="text">Total</p>
                        <p className="text">€ {finalPrice}</p>
                    </div>
                    {/* <button className="cart-items__button">Pagar</button> */}

                    <div className="cart-items__button">
                        <stripe-buy-button
                          buy-button-id="buy_btn_1QAgY4E8xKRW5vlskhok7nMl"
                          publishable-key="pk_test_51MriPzE8xKRW5vlsAMcFVw1wLKNKUImCAW8GZ4cvYRjfqkCGmRj3TIaGC6bj27mBDVxUxY5XBOmNstkVJpSlNg5300Shxdbmpt"
                        >
                        </stripe-buy-button>
                    </div>
                </div>
                </>
                }
            </div>
        </div>
    
    )
}
