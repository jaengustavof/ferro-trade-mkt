import { useState, useEffect } from 'react';
import { ethers } from "ethers";
import { BigNumber } from 'ethers';
import { NFTCard } from './NFTCard';

//TODO: Pendiente Funcion de compra
const MarketTrade = ({ marketplace, nft }) => {

    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState([]);
    const loadMarketplaceItem = async () => {
        const itemCount = 10 // await marketplace.itemCount();
        let items = [];
        for (let i = 1; i <= itemCount; i++) {
            // const item = await marketplace.items(i);
            const item = {
                totalPrice: 100,
                itemId: 0,
                seller: '0x116184730Bd91EA7c849Ac602fD760Bbfc7d144b',
                owner: '0x116184730Bd91EA7c849Ac602fD760Bbfc7d144b',
                shares: 1,
                name: 'Nombre de la Obra',
                description: 'Descripcion de la Obra',
                image: 'https://ipfs.io/ipfs/QmZ3f5VzZp5q7jBQ6ZQf2tZy6Hb5J6XvG4c3JfQVZ4y7D8',
                sold: false
            }
            // TODO: estaba asi antes -> if(!item.sold) {
            console.log('item', item)
            if(!item.sold) {
                // const uri = await nft.tokenURI(item.tokenId);
                // const response = await fetch(uri);
                // const metadata = await response.json();
                const metadata = {
                    dataShares: 1,
                    dataName: 'Nombre de la Obra',
                    dataDescription: 'Descripcion de la Obra',
                    imageToUpload: 'https://ipfs.io/ipfs/QmZ3f5VzZp5q7jBQ6ZQf2tZy6Hb5J6XvG4c3JfQVZ4y7D8'
                }
                // const tokenID = +BigNumber.from(item.tokenId).toString();
               
                // const totalPrice = await marketplace.getPriceFromItem(i);
                const totalPrice = item.totalPrice;
                items.push({
                    totalPrice: +BigNumber.from(totalPrice).toString(),
                    itemId: item.itemId,
                    seller: item.seller,
                    owner: item.owner,
                    shares: metadata.dataShares,
                    name: metadata.dataName,
                    description: metadata.dataDescription,
                    image: metadata.imageToUpload
                }) 
            }
        }
        setLoading(false);
        setItems(items);
    }

    useEffect(() => {
        loadMarketplaceItem()
    }, [])

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