import { useState, useEffect } from 'react';
import { BigNumber } from 'ethers';

const useMarketplaceItems = (marketplace, nft) => {
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState([]);

    const loadMarketplaceItems = async () => {
        try {
            const itemCount = await marketplace.itemCount();
            let itemsArray = [];
            for (let i = 1; i <= itemCount; i++) {
                const item = await marketplace.items(i);           
                if (!item.sold) {
                    const uri = await nft.tokenURI(item.tokenId);
                    const response = await fetch(uri);
                    const metadata = await response.json();
                    const tokenID = +BigNumber.from(item.tokenId).toString();
                    const totalPrice = await marketplace.getPriceFromItem(i);

                    itemsArray.push({
                        totalPrice: +BigNumber.from(totalPrice).toString(),
                        itemId: item.itemId,
                        seller: item.seller,
                        owner: item.owner,
                        shares: metadata.dataShares,
                        name: metadata.dataName,
                        description: metadata.dataDescription,
                        image: metadata.imageToUpload,
                    });
                }
            }
            setItems(itemsArray);
            setLoading(false);
        } catch (error) {
            console.error("Error loading marketplace items:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (marketplace && nft) {
            loadMarketplaceItems();
        }
    }, [marketplace, nft]);

    return { items, loading };
};

export default useMarketplaceItems;
    