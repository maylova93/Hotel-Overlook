import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./Slideshow.module.scss";
import { Title } from "../Title/Title";




// Array med billeder
const images = [
  { src: "./frankfurt-skyline-germany.jpg", alt: "Frankfurt Skyline, Germany"  },
  { src: "./waterfront-stockholm.jpg", alt: "Waterfront Stockholm, Sweden" },
  { src: "./fishmarket-hamborg.jpg", alt: "Fish Market, Hamburg, Germany" },
];

export function Slideshow() {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className={styles["slideshow-container"]}>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img src={image.src} alt={image.alt} className={styles["slide-image"]} />
          </div>
        ))}
      </Slider>
      <div className={styles["title-container"]}>
      <Title title="VELKOMMEN TIL HOTEL OVERLOOK ONLINE"/>
      </div>
    </div>
  );
}
