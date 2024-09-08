import React, { useContext, useEffect, useState } from 'react';
import "./Reviews.css";
import { AppContext } from "../../../../context/AppContext";
import DetailReviews from "./DetailReviews/DetailReviews";
import { axiosInstance } from "../../../../common/func/axios";

export default function Reviews () {
  const { errMessageCheck, setOpenReviewModal, detailInfo } = useContext(AppContext);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axiosInstance.get(`/api/public/locations/${detailInfo.locationId}/workation-reviews`, {
          params: {
            page: 0,
            size: 3,
            sort: 'createdAt,desc',
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
  }, [detailInfo, errMessageCheck]);

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
    <div className="Reviews">
      <DetailReviews />
      <div className="header">
        <span>Reviews</span>
        <svg onClick={() => setOpenReviewModal(true)} xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
          <path d="M11.5306 9.0306L6.5306 14.0306C6.3897 14.1715 6.19861 14.2506 5.99935 14.2506C5.80009 14.2506 5.60899 14.1715 5.4681 14.0306C5.3272 13.8897 5.24805 13.6986 5.24805 13.4993C5.24805 13.3001 5.3272 13.109 5.4681 12.9681L9.93747 8.49997L5.46935 4.0306C5.39958 3.96083 5.34424 3.87801 5.30649 3.78686C5.26873 3.69571 5.2493 3.59801 5.2493 3.49935C5.2493 3.40069 5.26873 3.30299 5.30649 3.21184C5.34424 3.12069 5.39958 3.03786 5.46935 2.9681C5.53911 2.89833 5.62194 2.84299 5.71309 2.80524C5.80424 2.76748 5.90194 2.74805 6.0006 2.74805C6.09926 2.74805 6.19696 2.76748 6.28811 2.80524C6.37926 2.84299 6.46208 2.89833 6.53185 2.9681L11.5318 7.9681C11.6017 8.03786 11.6571 8.12072 11.6948 8.21193C11.7326 8.30313 11.7519 8.4009 11.7518 8.49961C11.7517 8.59832 11.7321 8.69603 11.6941 8.78715C11.6562 8.87827 11.6006 8.961 11.5306 9.0306Z" fill="#B6B9BE"/>
        </svg>
      </div>
      <div className="reviewStats">
        <div>★{detailInfo.averageRating.toFixed(2)}({detailInfo.reviewCount})</div>
      </div>
      <div className="reviewList">
        {reviews.map((review, index) => (
          <div key={index} className="reviewItem">
            <div className="reviewUsername">{review.username}</div>
            <div className="reviewDate">{new Date(...review.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</div>
            <div className="reviewRating">Rating: {renderStars(review.rating)}</div>
            <div className="reviewContent">{review.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
