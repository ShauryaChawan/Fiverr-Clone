import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import newRequest from "../../utils/newRequest";
import Review from "../review/Review";
import "./Reviews.scss";
import PropTypes from "prop-types";

const Reviews = ({ gigId }) => {
  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery({
    queryKey: ["reviews"],
    queryFn: () =>
      newRequest.get(`/reviews/${gigId}`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (review) => {
      return newRequest.post("/reviews", review);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews"]);
      setInputValue(""); // Clear the input field
    },
  });

  const [inputValue, setInputValue] = useState(""); // State to hold the input value

  const handleSubmit = (e) => {
    // e.preventDefault();
    const desc = inputValue;
    const star = e.target[1].value;
    mutation.mutate({ gigId, desc, star });
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value); // Update the input value
  };

  return (
    <div className="reviews">
      <h2>Reviews</h2>
      {isLoading
        ? "loading"
        : error
        ? "Something went wrong!"
        : data.map((review) => <Review key={review._id} review={review} />)}
      <div className="add">
        <h3>Add a review</h3>
        <form action="" className="addForm" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="write your opinion"
            value={inputValue}
            onChange={handleInputChange}
          />
          <select name="" id="">
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
};

Reviews.propTypes = {
  gigId: PropTypes.string.isRequired,
};

export default Reviews;
