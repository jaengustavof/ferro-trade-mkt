const logo = "/assets/img/ferro-logo.svg";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa6";

export const Footer = () => {
  return (
    <footer>
        <div className="footer-container">
            <div className="footer-container__content">
                <img src={logo} alt="footer-logo" className="footer-logo" />
            </div>
            <div className="footer-container__content">
                <a href="https://adferroviaria.org">Agrupación Deportiva Ferroviaria – desde 1918</a>
                <a href="https://adferroviaria.org/aviso-legal">Aviso Legal</a>
                <a href="https://adferroviaria.org/politica-de-privacidad">Política de Privacidad</a>
                <a href="https://adferroviaria.org/terminos-y-condiciones">Términos y condiciones</a>
            </div>
            <div className="footer-container__content">
                <div className="social-container">
                    <a href="https://www.facebook.com/adferroviaria" target="_blank" rel="noreferrer">
                        <FaFacebookF />
                    </a>
                    <a href="https://twitter.com/ad_ferroviaria" target="_blank" rel="noreferrer">
                        <FaXTwitter />
                    </a>
                    <a href="https://www.instagram.com/adferroviaria/" target="_blank" rel="noreferrer">
                        <FaInstagram />
                    </a>
                    <a href="https://www.youtube.com/channel/UCdqNtORdyek9n5mv-H3D34A" target="_blank" rel="noreferrer">
                        <FaYoutube />
                    </a>
                </div>
            </div>
        </div>
    </footer>
  )
}
