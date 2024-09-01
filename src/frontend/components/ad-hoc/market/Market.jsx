import { useState, useEffect } from 'react';
import { ethers } from "ethers";
import { BigNumber } from 'ethers';
import { FaCartArrowDown } from "react-icons/fa";

//TODO: Pendiente Funcion de compra
const MarketTrade = ({ marketplace, nft }) => {

    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState([]);
    console.log('this is the marketplace', marketplace)
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
                console.log('metadata', metadata)
                const tokenID = +BigNumber.from(item.tokenId).toString();
               
                const totalPrice = await marketplace.getPriceFromItem(i);
                console.log('totalPrice', +BigNumber.from(totalPrice).toString());
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
        console.log('items', items);
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
        <div className="market-trade">
            {items.length > 0 ?
                <>
                    {items.map((item, idx) => (
                        <div key={idx} className='nft-container'>
                            <img className='nft-container__image' src={item.image} alt={item.name} key={idx} />
                            <h4 className='nft-container__title'>{item.name}</h4>
                            <p className='nft-container__sub'>AD Ferroviaria</p>
                            {/*<p>{item.description}</p>*/}
                            <div className='nft-container__info'>
                                <div className='info-container'>
                                    <p className='amount'>€ {item.totalPrice}</p>
                                    <p>precio</p>
                                </div>
                                <div className='info-container right'>
                                    <p className='amount'>x {item.shares}</p>
                                    <p className='shares'>acciones</p>
                                </div>
                            </div>
                            <div className="nft-container__buttton-container">
                                <button className='buy'>Comprar</button>
                                <button className='add'><FaCartArrowDown /></button>
                            </div>
                        </ div>
                    ))}
                </>
              
                : (
                   
                    <h2 className='no-items'>No hay NFTs registrados</h2>
                    
                )}
        </div>
    )
}

export default MarketTrade;