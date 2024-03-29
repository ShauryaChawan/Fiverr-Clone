import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./message.scss";

const Message = () => {
  const { id } = useParams();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["messages"],
    queryFn: () =>
      newRequest.get(`/messages/${id}`).then((res) => {
        return res.data;
      }),
  });

  const [otherUser, setOtherUser] = useState(null);

  useEffect(() => {
    const fetchOtherUser = async () => {
      const conversation = await newRequest.get(`/conversations/single/${id}`);
      const otherUserId =
        currentUser.isSeller === true
          ? conversation.data.buyerId
          : conversation.data.sellerId;
      const otherUser = await newRequest.get(`/users/${otherUserId}`);
      setOtherUser(otherUser.data);
    };

    fetchOtherUser();
  }, [id, currentUser.isSeller]);

  const mutation = useMutation({
    mutationFn: (message) => {
      return newRequest.post(`/messages`, message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["messages"]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ conversationId: id, desc: e.target[0].value });
    e.target[0].value = "";
  };

  console.log(data);
  console.log(otherUser);

  return (
    <div className="message">
      <div className="container">
        <span className="breadcrumbs">
          <Link to="/messages">Messages</Link> &gt;{" "}
          {otherUser ? otherUser.fullName : ""}
        </span>

        {isLoading ? (
          "loading"
        ) : error ? (
          "error"
        ) : (
          <div className="messages">
            {data.map((m) => (
              <div
                className={m.userId === currentUser._id ? "owner item" : "item"}
                key={m._id}
              >
                <img src={currentUser.img} alt="" />

                <p>{m.desc}</p>
              </div>
            ))}
          </div>
        )}
        <hr />
        <form className="write" onSubmit={handleSubmit}>
          <textarea type="text" placeholder="write a message" />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Message;
