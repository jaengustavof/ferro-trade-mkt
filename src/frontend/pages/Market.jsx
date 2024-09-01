import { useContext, useEffect} from 'react';
import { useNavigate } from 'react-router-dom'; 
import { GlobalContext } from '../context/GlobalContext';
import { MarketHeader } from '../components/ad-hoc/market/MarketHeader';
import MarketTrade from '../components/ad-hoc/market/Market';

export const Market = () => {

  const { marketplace, nft, account} = useContext(GlobalContext);
  const navigate = useNavigate();
  
  if (!account) {
    console.log("No account");
    navigate('/');
    return null;
  }

  return (
    <section id='marketplace'>
      <MarketHeader account={account} />
      <MarketTrade marketplace={marketplace} nft={nft} />
      <div>Market Footer</div>
    </section>
    
  )
}

