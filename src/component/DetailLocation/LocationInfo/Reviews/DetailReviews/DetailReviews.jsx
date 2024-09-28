import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from "../../../../../context/AppContext";
import "./DetailReviews.css";
import { Modal } from "@mui/material";
import { axiosInstance } from "../../../../../common/func/axios";

export default function DetailReviews() {
  const { errMessageCheck, openReviewModal, setOpenReviewModal, detailInfo } = useContext(AppContext);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axiosInstance.get(`/api/public/locations/${detailInfo.locationId}/workation-reviews`, {
          params: {
            page: 0,
            size: 7,
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
    <Modal 
      open={openReviewModal} 
      onClose={() => setOpenReviewModal(false)}
    >
      <section className="dtrSection">
        <div className="dtrModal">
          <div className="dtrHeader">
            <span>Reviews</span>
            <svg className="closeBtn" onClick={() => setOpenReviewModal(false)} xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path d="M12.929 13.0713L27.0711 27.2134" stroke="black" strokeWidth="2"/>
              <path d="M27.071 13.0713L12.9289 27.2134" stroke="black" strokeWidth="2"/>
            </svg>
          </div>
          <div className="dtrCnt">
            <div className="leftCnt">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="29" viewBox="0 0 28 29" fill="none">
                  <path d="M25.6484 13.0101L20.7156 17.3151L22.1932 23.7245C22.2714 24.0595 22.2491 24.4102 22.1291 24.7327C22.009 25.0551 21.7966 25.335 21.5184 25.5374C21.2401 25.7398 20.9084 25.8557 20.5647 25.8705C20.2209 25.8854 19.8804 25.7986 19.5857 25.621L13.9956 22.2304L8.41744 25.621C8.12275 25.7986 7.78225 25.8854 7.4385 25.8705C7.09476 25.8557 6.76302 25.7398 6.48478 25.5374C6.20653 25.335 5.99411 25.0551 5.87408 24.7327C5.75406 24.4102 5.73175 24.0595 5.80994 23.7245L7.28541 17.3217L2.3515 13.0101C2.09054 12.785 1.90184 12.4879 1.80906 12.156C1.71628 11.8242 1.72356 11.4723 1.82997 11.1445C1.93638 10.8167 2.1372 10.5277 2.40724 10.3136C2.67727 10.0995 3.00451 9.96989 3.34791 9.94103L9.85135 9.37775L12.3899 3.32275C12.5225 3.00503 12.7461 2.73364 13.0326 2.54275C13.3191 2.35186 13.6557 2.25 13.9999 2.25C14.3442 2.25 14.6808 2.35186 14.9673 2.54275C15.2538 2.73364 15.4774 3.00503 15.6099 3.32275L18.1562 9.37775L24.6574 9.94103C25.0008 9.96989 25.3281 10.0995 25.5981 10.3136C25.8681 10.5277 26.069 10.8167 26.1754 11.1445C26.2818 11.4723 26.2891 11.8242 26.1963 12.156C26.1035 12.4879 25.9148 12.785 25.6538 13.0101H25.6484Z" fill="black"/>
                </svg>
                <span>{detailInfo.averageRating.toFixed(2)}({detailInfo.reviewCount})</span>
              </div>
            </div>
            <div className="line"></div>
            <div className='rightCnt'>
              {reviews.map((review, index) => (
                <div key={index} className="reviewItem">
                  <div className="reviewRating">Rating: {renderStars(review.rating)}</div>
                  <div className="reviewContent">{review.content}</div>
                  <div className="reviewAuthor">{review.author}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Modal>
  );
}
