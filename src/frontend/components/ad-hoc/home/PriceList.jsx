import { IoIosHappy } from "react-icons/io";
import PriceTable from "./PriceTable";
import { IoSearchCircleSharp } from "react-icons/io5";
import { FaHeartCircleCheck } from "react-icons/fa6";

const PriceList = () => {
    return (
        <>
            <section className="price-list">
                <h2 className="price-list__heading">
                    Invierte en el Futuro del Fútbol con{" "}
                    <span className="price-list__subheading">La Ferroviaria</span>
                </h2>

                <div className="price-list__container">
                    <div className="price-list__section">
                        <p className="price-list__text">
                            Cada NFT es una oportunidad de ser parte de la historia y del futuro de
                            este club. Además, cuanto más compres,{" "}
                            <span className="price-list__best">¡Mejor precio obtienes!</span>
                        </p>

                        <PriceTable />
                    </div>

                    <div className="price-list__section">
                        <p className="price-list__subtitle">Cómo Funciona:</p>
                        <ul className="price-list__list">
                            <li className="price-list__item">
                                <IoSearchCircleSharp size={50} color="#d4edda" />
                                <div>
                                    <span className="price-list__item--green">Explora</span> y elige
                                    tus NFTs, cada uno representando una acción del club.
                                </div>
                            </li>
                            <li className="price-list__item">
                                <FaHeartCircleCheck size={50} color="#e0d6ef" />
                                <div>
                                    <span className="price-list__item--purple">Añade</span> más
                                    unidades a tu carrito y observa cómo disminuye el precio.
                                </div>
                            </li>
                            <li className="price-list__item">
                                <IoIosHappy size={50} color="#bee5eb" />
                                <div>
                                    <span className="price-list__item--blue">Completa</span> tu
                                    compra y conviértete en un accionista de La Ferroviaria.
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="price-list__cta">
                    <p>
                        ¡Aprovecha y asegura{" "}
                        <span className="price-list__cta-span">tu lugar en el equipo</span> hoy
                        mismo!
                    </p>
                </div>
            </section>
        </>
    );
};

export default PriceList;
