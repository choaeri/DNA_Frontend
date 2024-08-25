import React, { useEffect, useState } from 'react';
import "./AllReviews.css";
import { axiosInstance } from '../../common/func/axios';

const ReviewCard = ({ review }) => {
  return (
    <div className="review-card">
      <h3>{review.username}</h3>
      <p>위치: {review.locationName}</p>
      <p>시작 날짜: {review.startDate}</p>
      <p>종료 날짜: {review.endDate}</p>
      <p>내용: {review.content}</p>
      <p>작성일: {new Date(review.createdAt).toLocaleString()}</p>
    </div>
  );
};

const ReviewsList = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axiosInstance.get('/api/reviews/all', {
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
        console.error("Error fetching reviews:", err);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="reviews-list">
      {reviews.length > 0 && (
        <div className="reviews-grid">
          {reviews.map((review) => (
            <ReviewCard key={review.reviewId} review={review} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewsList;
