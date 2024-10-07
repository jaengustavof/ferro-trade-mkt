
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";


export const CartSteps = () => {
  return (
    <div className="cart-steps">
        <div className="cart-steps__step">
            <div className="cart-steps__step__circle"><FaShoppingCart /></div>
            <p className="cart-steps__step__text">Carrito</p>
        </div>
        
        <div className="cart-steps__step inactive">
            <div className="cart-steps__step__circle"><MdOutlinePayment /></div>
            <p className="cart-steps__step__text">Pago</p>
        </div>
    </div>
  )
}
