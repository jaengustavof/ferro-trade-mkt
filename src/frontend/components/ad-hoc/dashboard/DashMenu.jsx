
const DashMenu = ({ setSelectedSection }) => {
  return (
    <div className="dash-menu">
      <div className="dash-menu__container">
        <button className="dash-menu__button" onClick={() => setSelectedSection("nftList")}>Listado de NFTs</button>
        <button className="dash-menu__button" onClick={() => setSelectedSection("changePrice")}>Precio de Acciones</button>
        <button className="dash-menu__button" onClick={() => setSelectedSection("createNFT")}>Crear NFT</button>
      </div>
    </div>
  )
}

export default DashMenu