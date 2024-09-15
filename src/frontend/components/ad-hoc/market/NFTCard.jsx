import { useNavigate } from "react-router-dom";
import { FaCartArrowDown } from "react-icons/fa";
import useCart from '../../../hooks/useCart';
import { toast } from 'react-toastify';

export const NFTCard = ({ items }) => {
    const { cart, setCart } = useCart();

    const navigate = useNavigate();

    const quantityControl = (cart, item) => {
        let totalShares = 0;
        cart.forEach(item => {
            totalShares += +item.shares;
        });
        if(totalShares + +item.shares > 25) {
            toast.error("No es posible comprar más de 25 acciones por persona", {
                position: "top-right",
              });
            return true;
        }
        return false;
    }

    const addToCart = (item) => {
        /// Verificar si el item ya está en el carrito usando su itemId o keyidx
        const isItemInCart = cart.some(cartItem => cartItem.itemId === item.itemId);

        if (!isItemInCart) {
            if(quantityControl(cart, item)) return;
            const newCart = [...cart, item]; // Si no está en el carrito, lo añadimos
            setCart(newCart); // Actualizar el carrito en el contexto
            
            toast.success("NFT añadido al carrito", {
                position: "top-right",
              });
        } else {
            
            toast.warn("Este NFT ya está en el carrito", {
                position: "top-right",
              });
        }
    }

    const handleBuy = (item) => {
        addToCart(item);
        navigate('/cart');
    };

    const handleAdd = (item) => {
        
        addToCart(item);
    };

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
                            onClick={() => handleBuy(item)}
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
