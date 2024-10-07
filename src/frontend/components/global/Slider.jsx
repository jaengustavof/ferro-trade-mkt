import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SliderWrapper from "react-slick";
import { GoDotFill } from "react-icons/go";

function Slider({ images }) {
    const settings = {
        customPaging: function () {
            return (
                <a>
                    <GoDotFill />
                </a>
            );
        },
        dots: true,
        dotsClass: "slick-dots",
        infinite: true,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 3,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 482,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <section className="slider-container">
            <SliderWrapper {...settings}>
                {images.map((item, index) => (
                    <img key={index} src={item} alt="NFT Image" />
                ))}
            </SliderWrapper>
        </section>
    );
}

export default Slider;
