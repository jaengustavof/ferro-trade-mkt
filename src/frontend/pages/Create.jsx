import CreateForm from "../components/ad-hoc/create/CreateForm";
import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalContext';

export const Create = () => {

  const { marketplace, nft} = useContext(GlobalContext);

  return (
    <>
      <div style={{width: '100%', height: '100px', background: 'tomato'}}>Create Header</div>
      <CreateForm marketplace={marketplace} nft={nft}  />
    </>
    
  )
}
