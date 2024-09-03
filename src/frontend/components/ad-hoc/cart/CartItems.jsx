import { FaRegTrashAlt } from "react-icons/fa";


export const CartItems = () => {
  return (
    <div className="cart-items">
        <h1 className="cart-items__heading">Carrito de Compra</h1>
        <p className="cart-items__text">Revisa los items de tu <span className="">carrito de Compra</span></p>

        <div className="cart-items__container">
            <div className="cart-items__item">
                <div className="cart-items__item-image">
                    <img src="https://via.placeholder.com/100" alt="item" />
                </div>
                <div className="cart-items__item-details">
                    <h3 className="item-title">Item Title</h3>
                    <div className="item-details-container">
                        <div className="item-details-container__shares">
                            <p className="text">acciones</p>
                            <p>x 5</p>
                        </div>
                        <div className="item-details-container__price">
                            <p className="text">precio</p>
                            <p>€ 1125.00</p>
                        </div>
                    </div>
                </div>
                <div className="cart-items__item-remove">
                    <button className="btn btn--danger"><FaRegTrashAlt /></button>
                </div>
            </div> 
    
            <div className="cart-items__item">
                <div className="cart-items__item-image">
                    <img src="https://via.placeholder.com/100" alt="item" />
                </div>
                <div className="cart-items__item-details">
                    <h3 className="item-title">Item Title</h3>
                    <div className="item-details-container">
                        <div className="item-details-container__shares">
                            <p className="text">acciones</p>
                            <p>x 5</p>
                        </div>
                        <div className="item-details-container__price">
                            <p className="text">precio</p>
                            <p>€ 1125.00</p>
                        </div>
                    </div>
                </div>
                <div className="cart-items__item-remove">
                    <button className="btn btn--danger"><FaRegTrashAlt /></button>
                </div>
            </div> 

            <div className="cart-items__item">
                <div className="cart-items__item-image">
                    <img src="https://via.placeholder.com/100" alt="item" />
                </div>
                <div className="cart-items__item-details">
                    <h3 className="item-title">Item Title</h3>
                    <div className="item-details-container">
                        <div className="item-details-container__shares">
                            <p className="text">acciones</p>
                            <p>x 5</p>
                        </div>
                        <div className="item-details-container__price">
                            <p className="text">precio</p>
                            <p>€ 1125.00</p>
                        </div>
                    </div>
                </div>
                <div className="cart-items__item-remove">
                    <button className="btn btn--danger"><FaRegTrashAlt /></button>
                </div>
            </div> 

        </div>

        <div className="cart-items__total">
            <div className="cart-items__total-container">
                <p className="text">Total acciones</p>
                <p className="text">15</p>
            </div>
            <div className="cart-items__total-container">
                <p className="text">Precio por acción</p>
                <p className="text">15 a 19</p>
                <p className="text">€ 185</p>
            </div>
            <div className="cart-items__total-container">
                <p className="text">Subtotal</p>
                <p className="text">€ 2775.00</p>
            </div>
            <div className="cart-items__total-container">
                <p className="text">Gastos de gestión</p>
                <p className="text">€ 300.00</p>
            </div>
            <div className="cart-items__total-container total-amount">
                <p className="text">Total</p>
                <p className="text">€ 3075.00</p>
            </div>
            <button className="cart-items__button">Pagar</button>
        </div>
    </div>
  )
}
