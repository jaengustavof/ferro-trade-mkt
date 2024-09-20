import useIsOwner from "../../../hooks/useIsOwner";
import useMarketplaceItems from "../../../hooks/useMarketplaceItems";
import { useContext } from "react";
import { GlobalContext } from "../../../context/GlobalContext";
import { IoSettingsSharp } from "react-icons/io5";


const NftList = () => {

  const { marketplace, nft } = useContext(GlobalContext);
  const {items, loading} = useMarketplaceItems(marketplace, nft); 
  const isOwner = useIsOwner();
  //console.log(items);
  const callItem = async (id) => {
    const item = await marketplace.items(id);
    console.log(item.available);
  }
  
  const shorterOwner = (owner) => {
    return `${owner.slice(0, 3)}...${owner.slice(-3)}`;
  }
  return (
    <section className='nft-list'>
      <div className="nft-list__form-container">
      {isOwner ? 
            <>
                <h1 className="form-heading">Listado de NFT</h1>
                <p className="form-text">Información detallada de los NFTs <span className="">del marketplace</span></p>
                <table className="nft-list-table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Acciones</th>
                            <th>Precio</th>
                            <th>Estado</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                          items.map((item, idx) =>{
                            return (
                              <tr key={idx}>
                                <td className="item-name">{item.name}</td>
                                <td>{item.shares}</td>
                                <td>€ {item.totalPrice}</td>
                                <td className={callItem(idx)? 
                                    'status available' : 
                                    'status unavailable'}>
                                    <span>{callItem(idx)? 'disponible': 'No disponible'}</span>
                                  </td>
                                <td>
                                  <button>
                                    <IoSettingsSharp style={{color: '#ffbc2a'}}/>
                                  </button>
                                </td>
                              </tr>
                            )
                          })
                        }
                    </tbody>
                </table>
            </> : 
            <h1 className="form-heading">No tienes permisos para ingresar en esta sección</h1>}
      </div>
    </section>
  )
}

export default NftList