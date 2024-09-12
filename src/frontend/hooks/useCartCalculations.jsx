import { useState, useEffect } from 'react';

const useCartCalculations = (cartItems) => {
  const [totalShares, setTotalShares] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [pricePerShare, setPricePerShare] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const [shareRange, setShareRange] = useState('');
  const [managementFees, setManagementFees] = useState(0);

  // Function to determine price per share and share range based on total number of shares
  const calculatePriceAndRange = (totalShares) => {
    if (totalShares >= 1 && totalShares <= 4) return { price: 250, range: '1 a 4' };
    if (totalShares >= 5 && totalShares <= 9) return { price: 225, range: '5 a 9' };
    if (totalShares >= 10 && totalShares <= 14) return { price: 205, range: '10 a 14' };
    if (totalShares >= 15 && totalShares <= 19) return { price: 185, range: '15 a 19' };
    if (totalShares >= 20 && totalShares <= 25) return { price: 178, range: '20 a 25' };
    return { price: 0, range: 'Fuera de rango' };
  };

  useEffect(() => {
    // Calculate total shares and subtotal
    const totalShares = cartItems.reduce((acc, item) => acc + parseInt(item.shares), 0);
    const subtotal = cartItems.reduce((acc, item) => acc + parseFloat(item.totalPrice), 0);
    
    // Determine price per share and share range
    const { price: pricePerShare, range: shareRange } = calculatePriceAndRange(totalShares);
    
    // Calculate the management fees
    const managementFees = totalShares * 20; // 20 euros per share
    
    // Calculate the final price, including management fees
    const finalPrice = (totalShares * pricePerShare) + managementFees;

    // Update state
    setTotalShares(totalShares);
    setSubtotal(subtotal);
    setPricePerShare(pricePerShare);
    setFinalPrice(finalPrice);
    setShareRange(shareRange);
    setManagementFees(managementFees);
  }, [cartItems]);

  return { totalShares, subtotal, pricePerShare, finalPrice, shareRange, managementFees };
};

export default useCartCalculations;
