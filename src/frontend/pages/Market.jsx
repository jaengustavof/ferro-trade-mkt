import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import { MarketHeader } from '../components/ad-hoc/market/MarketHeader';
import MarketTrade from '../components/ad-hoc/market/Market';

export const Market = () => {

  const { marketplace, nft, account} = useContext(GlobalContext);

  return (
    <>
      <MarketHeader account={account} />
      <MarketTrade marketplace={marketplace} nft={nft} />
      <div>Market Footer</div>
    </>
    
  )
}

