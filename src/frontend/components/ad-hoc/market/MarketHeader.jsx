import { MdAccountCircle } from "react-icons/md";

export const MarketHeader = ({account}) => {
  const shortenedAccount = `${account.slice(0, 6)}...${account.slice(-4)}`;
  const mainImage = "/assets/img/marketplace/heroImage.svg";
  const logo = "/assets/img/ferro-logo.svg";

  return (
    <section className="market-header">
        <div className="market-header__hero">
          <img src={mainImage} alt="stestt" className='hero-image'/>
          <div className="market-header__icon-container">
            <img src={logo} alt="marketplace-icon" className="logo-ferroviaria" />
          </div>
        </div>
        <div className="market-header__container">
            <h2 className="container-title">La Ferro Maketplace</h2>
            <p className="container-bubtitle">Descubre y adquiere NFTs exclusivos en nuestra plataforma.</p>
            <p className="container-user"><span><MdAccountCircle /></span>{shortenedAccount}</p>
            <div className="info-container">
              <div className="info-container__item">
                <p className="info-container__item-value">+250</p>
                <p className="info-container__item-title">NFTs en venta</p>
              </div>
              <div className="info-container__item">
                <p className="info-container__item-value">1500</p>
                <p className="info-container__item-title">Acciones Vendidas</p>
              </div>
              <div className="info-container__item">
                <p className="info-container__item-value">3900</p>
                <p className="info-container__item-title">Acciones Emitidas</p>
              </div>
            </div>
        </div>
    </section>
  )
}
