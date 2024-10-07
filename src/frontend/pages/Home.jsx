import Heading from "../components/ad-hoc/home/Heading";
import Slider from "../components/global/Slider";
import PriceList from "../components/ad-hoc/home/PriceList";
import Faqs from "../components/ad-hoc/home/Faqs";

const images = [
  "/assets/img/marketplace/nft1.svg",
  "/assets/img/marketplace/nft2.svg",
  "/assets/img/marketplace/nft3.svg",
  "/assets/img/marketplace/nft4.svg",
  "/assets/img/marketplace/nft5.svg",
  "/assets/img/marketplace/nft6.svg",
  "/assets/img/marketplace/nft7.svg",
  "/assets/img/marketplace/nft8.svg"
];

const Home = () => {
  return (
    <section className="home-page">
      <Heading />
      <h2 className="home-page__nfts">Descubre nuestra coleccion de NFTs</h2>
      <Slider images={images} />
      <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="section-separator"
      >
          <path fill="#f2f2f2" fillOpacity="1" d="M0,256L1440,160L1440,320L0,320Z"></path>
      </svg>
      <PriceList />
      <svg
          className="section-separator-bottom"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 180"
      >
          <path fill="#f2f2f2" fillOpacity="1" d="M0,60L1440,180L1440,0L0,0Z"></path>
      </svg>
      <h2 className="home-page__nfts">Preguntas frecuentes</h2>
      <Faqs />
    </section>
    
  )
}

export default Home