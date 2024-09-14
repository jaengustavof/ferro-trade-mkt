import React, { useState } from 'react';
import { TbDeviceIpadQuestion } from 'react-icons/tb';
import { IoWalletOutline } from 'react-icons/io5';
import { GrSecure } from 'react-icons/gr';

const Faqs = () => {
  const [showMore, setShowMore] = useState({
    1: false,
    2: false,
    3: false,
  });

  const toggleShowMore = (id) => {
    setShowMore((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="faqs">
      <div className="faqs-container">
        <TbDeviceIpadQuestion className="faq-icon" />
        <div className="faqs-container__data">
          <h4 className="container-title">¿Qué es un NFT y cómo funciona?</h4>
          <div className={`container-text ${showMore[1] ? 'show-all' : ''}`}>
            Un NFT (Non-Fungible Token) es un tipo de activo digital que representa la propiedad única de un artículo o contenido en blockchain. A diferencia de las criptomonedas, los NFTs no son intercambiables entre sí porque cada uno tiene características y valores únicos.
          </div>
          <button className="toggle-button" onClick={() => toggleShowMore(1)}>
            {showMore[1] ? 'Ver menos' : 'Ver más'}
          </button>
        </div>
      </div>

      <div className="faqs-container">
        <IoWalletOutline className="faq-icon" />
        <div className="faqs-container__data">
          <h4 className="container-title">¿Cómo puedo comprar un NFT en el marketplace?</h4>
          <div className={`container-text ${showMore[2] ? 'show-all' : ''}`}>
            Para comprar un NFT, primero necesitas estar autorizado para abrir una cuenta en el marketplace. Una vez que tu cuenta esté aprobada, podrás comprar NFTs utilizando cualquier tarjeta de crédito. Busca el NFT que deseas comprar, haz clic en "Comprar", y sigue las instrucciones para completar la transacción.
          </div>
          <button className="toggle-button" onClick={() => toggleShowMore(2)}>
            {showMore[2] ? 'Ver menos' : 'Ver más'}
          </button>
        </div>
      </div>

      <div className="faqs-container">
        <GrSecure className="faq-icon" />
        <div className="faqs-container__data">
          <h4 className="container-title">¿Cómo se garantiza la autenticidad y propiedad de un NFT?</h4>
          <div className={`container-text ${showMore[3] ? 'show-all' : ''}`}>
            La autenticidad y propiedad de un NFT están garantizadas por la blockchain. Cuando compras un NFT, se registra en la blockchain un contrato inteligente que certifica que eres el propietario legítimo de ese activo. Toda la información, incluyendo el historial de transacciones y propietarios anteriores, está disponible públicamente en la cadena de bloques, lo que asegura transparencia y autenticidad.
          </div>
          <button className="toggle-button" onClick={() => toggleShowMore(3)}>
            {showMore[3] ? 'Ver menos' : 'Ver más'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Faqs;
  