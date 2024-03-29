import React, { useEffect, useRef, useState } from "react";
import "./Gigs.scss";
import GigCard from "../../components/gigCard/GigCard";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useLocation } from "react-router-dom";

function Gigs() {
  const [sort, setSort] = useState("sales");
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("");
  const minRef = useRef();
  const maxRef = useRef();

  const { search } = useLocation();

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["gigs"],
    queryFn: () => {
      let apiUrl = "/gigs";
      const queryParams = `?&min=${minRef.current.value}&max=${maxRef.current.value}&sort=${sort}`;

      // Check if search parameter is present
      if (search) {
        apiUrl += search + queryParams;
      } else {
        apiUrl += queryParams;
      }

      return newRequest.get(apiUrl).then((res) => res.data);
    },
  });

  console.log(data);

  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };

  /*
  For the following code i was geeting following warning
  
  React Hook useEffect has a missing dependency: 'refetch'. 
  Either include it or remove the dependency array. eslint(react-hooks/exhaustive-deps)
  */
  // useEffect(() => {
  //   refetch();
  // }, [sort]);

  // so the modified code is
  useEffect(() => {
    const fetchData = async () => {
      await refetch();
    };

    fetchData();
  }, [sort, refetch]);

  const apply = () => {
    refetch();
  };

  return (
    <div className="gigs">
      <div className="container">
        <span className="breadcrumbs">Fiverr &gt; All Categories &gt;</span>
        <h1>All Categories</h1>
        <p>
          Explore the boundaries of art and technology with Liverr&apos;s All
          Categories
        </p>
        <div className="menu">
          <div className="left">
            <span>Budget</span>
            <input ref={minRef} type="number" placeholder="min" />
            <input ref={maxRef} type="number" placeholder="max" />
            <button onClick={apply}>Apply</button>
          </div>
          <div className="right">
            <span className="sortBy">Sort by</span>
            <span className="sortType">
              {sort === "sales" ? "Best Selling" : "Newest"}
            </span>
            <img src="./img/down.png" alt="" onClick={() => setOpen(!open)} />
            {open && (
              <div className="rightMenu">
                {sort === "sales" ? (
                  <span onClick={() => reSort("createdAt")}>Newest</span>
                ) : (
                  <span onClick={() => reSort("sales")}>Best Selling</span>
                )}
                <span onClick={() => reSort("sales")}>Popular</span>
              </div>
            )}
          </div>
        </div>
        <div className="cards">
          {isLoading
            ? "loading"
            : error
            ? "Something went wrong!"
            : data.map((gig) => <GigCard key={gig._id} item={gig} />)}
        </div>
      </div>
    </div>
  );
}

export default Gigs;
