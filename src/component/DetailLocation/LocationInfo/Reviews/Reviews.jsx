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
          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="11" viewBox="0 0 10 11" fill="none">
            <path d="M9.16016 4.96789L7.39845 6.50539L7.92618 8.79445C7.95411 8.91412 7.94614 9.03936 7.90327 9.15452C7.8604 9.26968 7.78454 9.36965 7.68517 9.44193C7.58579 9.51421 7.46732 9.5556 7.34455 9.56091C7.22178 9.56622 7.10018 9.53522 6.99493 9.4718L4.99845 8.26086L3.00626 9.4718C2.90101 9.53522 2.7794 9.56622 2.65664 9.56091C2.53387 9.5556 2.4154 9.51421 2.31602 9.44193C2.21665 9.36965 2.14078 9.26968 2.09792 9.15452C2.05505 9.03936 2.04708 8.91412 2.07501 8.79445L2.60196 6.50773L0.839852 4.96789C0.746653 4.88751 0.67926 4.7814 0.646124 4.66287C0.612989 4.54434 0.615587 4.41866 0.653591 4.30161C0.691596 4.18455 0.763316 4.08131 0.859758 4.00485C0.9562 3.92839 1.07307 3.8821 1.19571 3.8718L3.51837 3.67062L4.42501 1.50813C4.47235 1.39465 4.55222 1.29773 4.65453 1.22955C4.75685 1.16138 4.87706 1.125 5.00001 1.125C5.12296 1.125 5.24316 1.16138 5.34548 1.22955C5.4478 1.29773 5.52766 1.39465 5.57501 1.50813L6.48438 3.67062L8.80626 3.8718C8.9289 3.8821 9.04577 3.92839 9.14221 4.00485C9.23865 4.08131 9.31037 4.18455 9.34838 4.30161C9.38638 4.41866 9.38898 4.54434 9.35585 4.66287C9.32271 4.7814 9.25532 4.88751 9.16212 4.96789H9.16016Z" fill="#292C30"/>
          </svg>
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
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
          <path d="M14.656 7.64863L11.8372 10.1086L12.6816 13.7711C12.7263 13.9626 12.7135 14.163 12.6449 14.3472C12.5764 14.5315 12.455 14.6914 12.296 14.8071C12.137 14.9227 11.9474 14.989 11.751 14.9975C11.5546 15.006 11.36 14.9564 11.1916 14.8549L7.99722 12.9174L4.80972 14.8549C4.64133 14.9564 4.44676 15.006 4.25033 14.9975C4.0539 14.989 3.86434 14.9227 3.70534 14.8071C3.54634 14.6914 3.42496 14.5315 3.35638 14.3472C3.28779 14.163 3.27504 13.9626 3.31972 13.7711L4.16285 10.1124L1.34347 7.64863C1.19435 7.52002 1.08652 7.35024 1.03351 7.16059C0.980489 6.97094 0.984646 6.76986 1.04545 6.58257C1.10626 6.39527 1.22101 6.2301 1.37532 6.10776C1.52963 5.98542 1.71662 5.91137 1.91285 5.89488L5.6291 5.573L7.07972 2.113C7.15548 1.93145 7.28325 1.77637 7.44696 1.66729C7.61067 1.55821 7.803 1.5 7.99972 1.5C8.19644 1.5 8.38877 1.55821 8.55248 1.66729C8.71619 1.77637 8.84397 1.93145 8.91972 2.113L10.3747 5.573L14.0897 5.89488C14.2859 5.91137 14.4729 5.98542 14.6272 6.10776C14.7816 6.2301 14.8963 6.39527 14.9571 6.58257C15.0179 6.76986 15.0221 6.97094 14.9691 7.16059C14.916 7.35024 14.8082 7.52002 14.6591 7.64863H14.656Z" fill="#1D2024"/>
        </svg>
        <span className='avg'>{detailInfo.averageRating.toFixed(2)}</span>
        <span className='count'>({detailInfo.reviewCount})</span>
      </div>
      <div className="reviewList">
        {reviews.map((review, index) => (
          <div key={index} className="reviewItem">
            <div className='info'>
              <div className="reviewRating">{renderStars(review.rating)}</div>
              <div className="reviewDate">{new Date(...review.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</div>
              <div className="reviewUsername">{review.username}</div>
            </div>
            <div className="reviewContent">{review.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
