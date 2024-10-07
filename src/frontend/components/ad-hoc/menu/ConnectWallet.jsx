import { useContext } from 'react';
import { GlobalContext } from '../../../context/GlobalContext';


const ConnectWallet = () => {
    const { account, web3Handler, disconnectWallet } = useContext(GlobalContext);

    return (
        <div>
            {account ? (
                <div>
                    <button 
                        onClick={disconnectWallet}
                        className='connect-wallet-button'
                    >Disconnect
                    </button>
                    
                </div>
            ) : (
                <button 
                    onClick={web3Handler}
                    className='connect-wallet-button'
                >Conectar
                </button>
            )}
        </div>
    );
};

export default ConnectWallet;
