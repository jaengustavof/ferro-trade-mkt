import { useState, useEffect } from 'react';

// Define las constantes
const stockQuantities = ["1 a 4", "5 a 9", "10 a 14", "15 a 19", "20 a 25"];

const stockPrice = {
  "1 a 4": 250,
  "5 a 9": 225,
  "10 a 14": 205,
  "15 a 19": 185,
  "20 a 25": 178
};

// Crea el hook personalizado
const useStockData = () => {
  const [quantities, setQuantities] = useState([]);
  const [prices, setPrices] = useState({});

  useEffect(() => {
    // Será dinámico en un futuro. Aquí se hará una llamada a la API
    setQuantities(stockQuantities);
    setPrices(stockPrice);
  }, []);

  return { quantities, prices };
};

export default useStockData;
