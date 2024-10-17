import { FaShoppingCart } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useCart from "../../../hooks/useCart";
import { use } from "chai";

export const CartMenu = () => {
    const { cart } = useCart(); // Ya no necesitas setCart aquí
    const [cartItems, setCartItems] = useState(0);

    const navigate  = useNavigate();

    const goToCart = () => {
        navigate('/cart');
    }

    // Usamos useEffect para actualizar el estado cuando cart cambie
    useEffect(() => {
        setCartItems(cart.length);
    }, [cart]); // Este efecto se ejecutará cada vez que cart cambie

    return (
        <div 
            className="cart-menu-container"
            onClick={goToCart}
            >
            <FaShoppingCart color="white" />
            {cartItems > 0 ? <span className="cart-menu-container__items">{cartItems}</span> : ''}
        </div>
    );
};
