import { useEffect } from 'react';
import { FaCartArrowDown } from "react-icons/fa";
import useCart from '../../../hooks/useCart';

export const NFTCard = ({ items }) => {
    const { cart, setCart } = useCart();

    const handleBuy = () => {
        console.log('Comprar');
    };

    const handleAdd = (item) => {
        /// Verificar si el item ya está en el carrito usando su itemId o keyidx
        const isItemInCart = cart.some(cartItem => cartItem.itemId === item.itemId); // O usar keyidx si no tienes itemId

        if (!isItemInCart) {
            const newCart = [...cart, item]; // Si no está en el carrito, lo añadimos
            setCart(newCart); // Actualizar el carrito en el contexto
            console.log('Añadido al carrito:', item);
        } else {
            console.log('El item ya está en el carrito:', item);
        }
    };

    useEffect(() => {
        console.log('Items:', cart);
    }, [cart]);

    return (
        <> 
            {items.map((item, idx) => (
                <div key={idx} className='nft-container'>
                    <img className='nft-container__image' src={item.image} alt={item.name} />
                    <h4 className='nft-container__title'>{item.name}</h4>
                    <p className='nft-container__sub'>AD Ferroviaria</p>
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
                        <button 
                            className='buy'
                            onClick={handleBuy}
                        >Comprar</button>
                        <button 
                            className='add'
                            onClick={() => handleAdd(item)} // Pasamos el item al carrito
                        >
                            <FaCartArrowDown />
                        </button>
                    </div>
                </div>
            ))}
        </>
    );
};
