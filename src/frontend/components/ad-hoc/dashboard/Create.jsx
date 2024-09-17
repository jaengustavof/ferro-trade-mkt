import CreateForm from "./CreateForm";
import { useContext } from 'react';
import { GlobalContext } from '../../../context/GlobalContext';

export const Create = () => {

  const { marketplace, nft} = useContext(GlobalContext);
  const logo = "/assets/img/ferro-logo.svg";

  return (
    <section className="create-section">
      <img src={logo} alt="Create NFT" className="create-section__logo"/>
      <CreateForm marketplace={marketplace} nft={nft}  />
    </section>
    
  )
}
