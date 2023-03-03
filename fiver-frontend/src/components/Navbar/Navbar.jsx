import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import "./navbar.scss";

const Navbar = () => {
  const [active, setActive] = useState(false);

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(()=>{
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  return (
    <div className={active ? "navbar_continaier active" : "navbar_continaier"}>
      <nav>
        <div className="top_container">
          <div className="logo">
            <span className="text">fiverr</span>
            <span className="dot">.</span>
          </div>
          <div className="links">
            <span>Fiverr Business</span>
            <span>Explore</span>
            <span>English</span>
            <span>Sign In</span>
            <span>Become a Seller</span>
            <button>Join</button>
          </div>
        </div>
        {active && (
          <div style={{margin: "0", padding: "0"}}>
            <hr />
            <div className="bottom_container">
              <span>Test</span>
              <span>Test 2</span>
              <span>Test 3</span>
              <span>Test 4</span>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
