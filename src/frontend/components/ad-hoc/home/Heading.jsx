const nftImage = "/assets/img/marketplace/lafe-nft.png";

const Heading = () => {
    return (
        <   >
            <section className="waiting-heading">
                <div>
                    <img className="waiting-heading__image" src={nftImage} alt="NFT marketplace" />
                </div>
                <div className="heading-container">
                    <h1 className="heading-container__title">
                        Marketplace Exclusivo de NFTs de La Ferroviaria:
                    </h1>
                    <h2 className="heading-container__subtitle">Tu Pase a la Historia del Club</h2>
                    <p className="heading-container__text">
                        ¡Bienvenido al Mercado Exclusivo de NFTs de La Ferro! Descubre y
                        colecciona NFTs exclusivos del club. Sumérgete en momentos icónicos y
                        jugadores legendarios de nuestro club de fútbol. Conéctate con La Ferroviaria y su comunidad, obteniendo derechos exclusivos para canjear tus NFTs por acciones del club en el futuro. ¡Únete a esta emocionante
                        aventura y deja tu huella en nuestra historia!
                    </p>

                    <a href="#waitingListForm" className="heading-container__cta">
                        Descubre
                    </a>
                </div>
            </section>
        </  >
    );
};

export default Heading;