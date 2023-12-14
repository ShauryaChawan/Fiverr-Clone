import { Link } from "react-router-dom";
import "./catCard.scss";
import PropTypes from "prop-types";

const CatCard = ({ card }) => {
  return (
    <Link to="/gigs?cat=design">
      <div className="catCard">
        <img src={card.img} alt="" />
        <span className="desc">{card.desc}</span>
        <span className="title">{card.title}</span>
      </div>
    </Link>
  );
}

CatCard.propTypes = {
  card: PropTypes.node,
};

export default CatCard;