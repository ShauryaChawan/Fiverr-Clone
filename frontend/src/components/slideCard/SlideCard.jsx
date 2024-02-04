import "./slideCard.scss";
import { cards } from "../../data";

import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const SlideCard = () => {
  return (
    <Link to="/gigs">
      <div className="slide-card">
        <Swiper
          modules={[Autoplay, Navigation]}
          slidesPerView={4}
          centeredSlides={false}
          slidesPerGroup={4}
          spaceBetween={30}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          navigation={true}
          speed={2000}
          // virtual
        >
          {cards.map((card) => (
            <SwiperSlide key={card.id}>
              <img src={card.img} alt="img" />
              <span className="desc">{card.desc}</span>
              <span className="title">{card.title}</span>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Link>
  );
};

export default SlideCard;
