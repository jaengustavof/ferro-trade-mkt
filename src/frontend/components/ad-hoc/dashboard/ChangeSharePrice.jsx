
import ChangeSharePriceForm from './ChangeSharePriceForm';

const ChangeSharePrice = () => {

    const logo = "/assets/img/ferro-logo.svg";

    return (
        <section className='change-share-prices'>
            <img src={logo} alt="Create NFT" className="create-section__logo"/>
            <ChangeSharePriceForm />
        </section>
    )
}

export default ChangeSharePrice