import React from "react";
import "./projectCard.scss";
import PropTypes from "prop-types";

function ProjectCard({ card }) {
  return (
    <div className="projectCard">
      <img src={card.img} alt="" />
      <div className="info">
        <img src={card.pp} alt="" />
        <div className="texts">
          <h2>{card.cat}</h2>
          <span>{card.username}</span>
        </div>
      </div>
    </div>
  );
}


ProjectCard.propTypes = {
  card: PropTypes.node,
};

export default ProjectCard;