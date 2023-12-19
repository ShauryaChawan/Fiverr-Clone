import "./slideProject.scss";
import { projects } from "../../data";

import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const SlideProject = () => {
  return (
    <div className="slide-project">
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
        {projects.map((project) => (
          <SwiperSlide key={project.id}>
            <img src={project.img} alt="" />
            <div className="info">
              <img src={project.pp} alt="" />
              <div className="texts">
                <h2>{project.cat}</h2>
                <span>{project.username}</span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SlideProject;
