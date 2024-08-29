import { useState, useEffect } from 'react';
import { ethers } from "ethers";

//TODO: Pendiente Funcion de compra
const MarketTrade = ({ marketplace, nft }) => {
    console.log('Testing');
    console.log('marketplace', marketplace);
    console.log('nft', nft);

    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState([]);

    const loadMarketplaceItem = async () => {
        const itemCount = await marketplace.itemCount();
        console.log(itemCount.toNumber());
        let items = [];
        for (let i = 1; i <= itemCount; i++) {
            const item = await marketplace.items(i);
            if(!item.sold) {
                const uri = await nft.tokenURI(item.tokenId);
                const response = await fetch(uri);
                const metadata = await response.json();
                const totalPrice = await marketplace.getPriceFromItem(item.tokenId);
                item.push({
                    totalPrice,
                    itemId: item.itemId,
                    seller: item.seller,
                    owner: item.owner,
                    name: metadata.name,
                    description: metadata.description,
                    image: metadata.image
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
    )

    return (
        <div className="flex justify-center">
            {items.length > 0 ?
                <div className="px-5 container">
                    <div className="g-4 py-5">
                        {items.map((item, idx) => (
                            <div key={idx} className="overflow-hidden">
                                <div>
                                    <img variant="top" src={item.image} />
                                    <div color="secondary">
                                        <p>{item.name}</p>
                                        <p>{item.description}</p>
                                    </div>
                                    <div>
                                        <div className="d-grid">
                                            {/*
                                                <Button onClick={() => buyMarketItem(item)} variant="primary" size="lg">
                                                    Buy by {ethers.utils.formatEther(item.totalPrice)} ETH
                                                </Button>
                                            */}
                                            <p>price: {item.totalPrice}</p>
                                            <p>seller: {item.seller}</p>
                                            <p>owner: {item.owner}</p>
                                            <p>itemId: {item.itemId} </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                : (
                    <main style={{ padding: "1rem 0" }}>
                        <h2>No hay NFTs registrados</h2>
                    </main>
                )}
        </div>
    )
}

export default MarketTrade