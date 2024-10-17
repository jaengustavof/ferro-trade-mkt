import { CartSteps } from "../components/ad-hoc/cart/CartSteps";
import { CartItems } from "../components/ad-hoc/cart/CartItems";

export const Cart = () => {

  return (
    <section id="checkoutCart" className="cart">
        <CartSteps />
        <CartItems />        
    </section>
  )
}
