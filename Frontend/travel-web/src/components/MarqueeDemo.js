import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa"; // Import React Icons for stars
import "./MarqueeDemo.css";
import { IoMdMailUnread } from "react-icons/io";
import logo from '../../src/assets/images/logo.jpg'
const ReviewCard = ({ img, name, title, content, rating }) => (
  <figure className="review-card">
    <div className="review-header">
      <img
        className="review-avatar"
        src={img || logo}
        alt={name}
      />
      <div className="review-info">
        <figcaption className="review-name">{name}</figcaption>
        <p className="review-title">{title}</p>
      </div>
    </div>
    <blockquote className="review-body">{content}</blockquote>
    <div className="review-rating">
      {Array.from({ length: 5 }).map((_, index) => (
        <FaStar
          key={index}
          size={18}
          color={index < rating ? "gold" : "lightgray"}
        />
      ))}
    </div>

    {/* Add icon to the top right corner */}
    <div className="review-card-icon">
      <IoMdMailUnread size={30} color="rgb(11, 11, 92)" />
    </div>
  </figure>
);

export function MarqueeDemo() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
   // fetch("http://localhost:7000/api/v1/Feedback")
  useEffect(() => {
    fetch("https://crush-holidays-backend.onrender.com/api/v1/Feedback")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch feedback details");
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          setReviews(data.data); // Access the `data` array from the response
        } else {
          throw new Error(data.message || "Unexpected response format");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching feedback details:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading reviews...</p>;
  }

  if (error) {
    return (
      <div className="text-red-500 p-4 bg-red-100 border border-red-300 rounded">
        <p>Error: {error}</p>
      </div>
    );
  }

  if (reviews.length === 0) {
    return <p>No reviews available.</p>;
  }

  return (
    <div className="marquee-container">
      {/* Title for the whole review section */}
      <h2 className="reviews-section-title">What Our Customers Say</h2>

      <div className="marquee" style={{ animationDuration: "20s" }}>
        {reviews.map((review) => (
          <ReviewCard
            key={review._id}
            img={review.img}
            name={review.name}
            title={review.Title}
            content={review.content}
            rating={review.rating}
          />
        ))}
      </div>

      {/* Optionally, add gradient effect on the left and right */}
      <div className="marquee-gradient left"></div>
      <div className="marquee-gradient right"></div>
    </div>
  );
}

export default MarqueeDemo;



