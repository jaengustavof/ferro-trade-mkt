import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { GlobalContext } from '../context/GlobalContext';
import { MarketHeader } from '../components/ad-hoc/market/MarketHeader';
import MarketTrade from '../components/ad-hoc/market/Market';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Market = () => {

  const { marketplace, nft, account} = useContext(GlobalContext);
  const navigate = useNavigate();
  
 
  //FIX TTHIS
  if (!account) {
    console.log("No account");
    navigate('/');
    return null;
  }

  return (
    <section id='marketplace'>
      <MarketHeader account={account} />
      <MarketTrade marketplace={marketplace} nft={nft} />
      <ToastContainer />
      <div>Market Footer</div>
    </section>
    
  )
}

