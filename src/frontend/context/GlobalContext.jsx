import { createContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import MarketplaceAbi from '../contractsData/Marketplace.json';
import MarketplaceAddress from '../contractsData/Marketplace-address.json';
import NFTAbi from '../contractsData/NFT.json';
import NFTAddress from '../contractsData/NFT-address.json';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [account, setAccount] = useState(null);
    const [nft, setNFT] = useState({});
    const [marketplace, setMarketplace] = useState({});
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState([]);
    const [priceRanges, setPriceRanges] = useState([]);

    const web3Handler = async () => {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        
        window.ethereum.on('chainChanged', () => {
            window.location.reload();
        });

        window.ethereum.on('accountsChanged', async (accounts) => {
            if (accounts.length === 0) {
                disconnectWallet(); // If no accounts are returned, consider it as a disconnection
            } else {
                setAccount(accounts[0]);
                await web3Handler();
            }
        });

        loadContracts(signer);
    };

    const loadPriceRanges = async (marketplaceContract) => {

        try {
            let ranges = [];
            // Sabemos que hay 5 price ranges basados en el smart contract
            for (let i = 0; i < 5; i++) {
                const range = await marketplaceContract.priceRanges(i); // Llamada a la función del contrato
                
                ranges.push({
                    min: range.min.toNumber(),
                    max: range.max.toNumber(),
                    price: range.price.toNumber(),
                });
            }

            setPriceRanges(ranges); // Guardar los priceRanges en el estado
        } catch (error) {
            console.error("Error al cargar los price ranges:", error);
        }
    };

    const loadContracts = async (signer) => {
        const marketplace = new ethers.Contract(MarketplaceAddress.address, MarketplaceAbi.abi, signer);
        setMarketplace(marketplace);
        const nft = new ethers.Contract(NFTAddress.address, NFTAbi.abi, signer);
        setNFT(nft);
        setLoading(false);
        const owner = await marketplace.owner();
        await loadPriceRanges(marketplace);
    };

    const disconnectWallet = () => {
        setAccount(null);
        setNFT({});
        setMarketplace({});
        setLoading(true);
    };

    return (
        <GlobalContext.Provider value={{ account, nft, marketplace, loading, cart, setCart, priceRanges, setPriceRanges,     web3Handler, disconnectWallet }}>
            {children}
        </GlobalContext.Provider>
    );
};
