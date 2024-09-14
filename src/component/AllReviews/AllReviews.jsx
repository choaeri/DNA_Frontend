import React, { useContext, useEffect, useState } from 'react';
import "./AllReviews.css";
import { axiosInstance } from '../../common/func/axios';
import { AppContext } from '../../context/AppContext';

export default function AllReviews() {
  const { errMessageCheck } = useContext(AppContext);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axiosInstance.get('/api/public/workation-reviews', {
          params: {
            page: 0,
            size: 6,
            sort: 'createdAt,desc', // 최신 작성일 기준으로 정렬
          },
        });

        const data = res.data;
        if (data && Array.isArray(data.content)) {
          setReviews(data.content);
        } else {
          console.error("Fetched data is not an array:", data);
        }
      } catch (err) {
        errMessageCheck(err.response.data.errorMessage);
      }
    };

    fetchReviews();
  }, []);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(
        <span key={i} className={i < rating ? "filledStar" : "emptyStar"}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="reviews-list">
      {reviews.length > 0 && (
        <div className="reviews-grid">
          {reviews.map((review) => (
            <div className="review-card" key={review.reviewId}>
              <h3>{review.username}</h3>
              <div className="reviewRating">Rating: {renderStars(review.rating)}</div>
              <p>위치: {review.locationName}</p>
              <p>내용: {review.content}</p>
              <p>작성일: {new Date(...review.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</p> {/* "June 2024" 형식 */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}