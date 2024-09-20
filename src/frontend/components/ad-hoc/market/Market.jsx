import { NFTCard } from './NFTCard';
import useMarketplaceItems from '../../../hooks/useMarketplaceItems';

//TODO: Pendiente Funcion de compra
const MarketTrade = ({ marketplace, nft }) => {

    const { items, loading } = useMarketplaceItems(marketplace, nft);

    if (loading) return (
        <main style={{ padding: "1rem 0" }}>
            <h2>Loading...</h2>
        </main>
    );

    return (
        <div className="market-trade">
            {items.length > 0 ?
                <>  
                    <NFTCard items={items} />
                </>
                : (
                    <h2 className='no-items'>No hay NFTs registrados</h2>
                )}
        </div>
    )
}

export default MarketTrade;