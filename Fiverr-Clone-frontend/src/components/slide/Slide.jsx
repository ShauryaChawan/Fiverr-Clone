import "./slide.scss";
import Slider from "infinite-react-carousel";
import PropTypes from "prop-types";

const Slide = ({ children, slidesToShow, arrowsScroll }) => {
  return (
    <div className="slide">
      <div className="container">
        <Slider slidesToShow={slidesToShow} arrowsScroll={arrowsScroll}>
          {children}
        </Slider>
      </div>
    </div>
  );
};

Slide.propTypes = {
  children: PropTypes.node,
  slidesToShow: PropTypes.number,
  arrowsScroll: PropTypes.number,
};

export default Slide;