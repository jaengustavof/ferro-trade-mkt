import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext'; // Asegúrate de que la ruta sea correcta

const useCart = () => {
    const { cart, setCart } = useContext(GlobalContext);
    return { cart, setCart };
};

export default useCart;
