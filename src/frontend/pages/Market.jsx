import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import MarketTrade from '../components/ad-hoc/market/Market';

export const Market = () => {

  const { marketplace, nft} = useContext(GlobalContext);

  return (
    <>
      <div style={{width:"100%", height: '80px', background: 'teal'}}>Market Header</div>
      <MarketTrade marketplace={marketplace} nft={nft} />
      <div>Market Footer</div>
    </>
    
  )
}

