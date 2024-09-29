import React, { useContext, useEffect, useState } from "react";
import "./Reviews.css";
import { AppContext } from "../../../../context/AppContext";
import DetailReviews from "./DetailReviews/DetailReviews";
import { axiosInstance } from "../../../../common/func/axios";

export default function Reviews() {
  const { errMessageCheck, setOpenReviewModal, detailInfo } =
    useContext(AppContext);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axiosInstance.get(
          `/api/public/locations/${detailInfo.locationId}/workation-reviews`
        );
        const data = res.data;
        if (data && Array.isArray(data.content)) {
          setReviews(data.content);
        } else {
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="11"
            viewBox="0 0 10 11"
            fill="none"
          >
            <path
              d="M9.16016 4.96789L7.39845 6.50539L7.92618 8.79445C7.95411 8.91412 7.94614 9.03936 7.90327 9.15452C7.8604 9.26968 7.78454 9.36965 7.68517 9.44193C7.58579 9.51421 7.46732 9.5556 7.34455 9.56091C7.22178 9.56622 7.10018 9.53522 6.99493 9.4718L4.99845 8.26086L3.00626 9.4718C2.90101 9.53522 2.7794 9.56622 2.65664 9.56091C2.53387 9.5556 2.4154 9.51421 2.31602 9.44193C2.21665 9.36965 2.14078 9.26968 2.09792 9.15452C2.05505 9.03936 2.04708 8.91412 2.07501 8.79445L2.60196 6.50773L0.839852 4.96789C0.746653 4.88751 0.67926 4.7814 0.646124 4.66287C0.612989 4.54434 0.615587 4.41866 0.653591 4.30161C0.691596 4.18455 0.763316 4.08131 0.859758 4.00485C0.9562 3.92839 1.07307 3.8821 1.19571 3.8718L3.51837 3.67062L4.42501 1.50813C4.47235 1.39465 4.55222 1.29773 4.65453 1.22955C4.75685 1.16138 4.87706 1.125 5.00001 1.125C5.12296 1.125 5.24316 1.16138 5.34548 1.22955C5.4478 1.29773 5.52766 1.39465 5.57501 1.50813L6.48438 3.67062L8.80626 3.8718C8.9289 3.8821 9.04577 3.92839 9.14221 4.00485C9.23865 4.08131 9.31037 4.18455 9.34838 4.30161C9.38638 4.41866 9.38898 4.54434 9.35585 4.66287C9.32271 4.7814 9.25532 4.88751 9.16212 4.96789H9.16016Z"
              fill="#292C30"
            />
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
        <svg
          onClick={() => setOpenReviewModal(true)}
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="17"
          viewBox="0 0 16 17"
          fill="none"
        >
          <path
            d="M11.5306 9.0306L6.5306 14.0306C6.3897 14.1715 6.19861 14.2506 5.99935 14.2506C5.80009 14.2506 5.60899 14.1715 5.4681 14.0306C5.3272 13.8897 5.24805 13.6986 5.24805 13.4993C5.24805 13.3001 5.3272 13.109 5.4681 12.9681L9.93747 8.49997L5.46935 4.0306C5.39958 3.96083 5.34424 3.87801 5.30649 3.78686C5.26873 3.69571 5.2493 3.59801 5.2493 3.49935C5.2493 3.40069 5.26873 3.30299 5.30649 3.21184C5.34424 3.12069 5.39958 3.03786 5.46935 2.9681C5.53911 2.89833 5.62194 2.84299 5.71309 2.80524C5.80424 2.76748 5.90194 2.74805 6.0006 2.74805C6.09926 2.74805 6.19696 2.76748 6.28811 2.80524C6.37926 2.84299 6.46208 2.89833 6.53185 2.9681L11.5318 7.9681C11.6017 8.03786 11.6571 8.12072 11.6948 8.21193C11.7326 8.30313 11.7519 8.4009 11.7518 8.49961C11.7517 8.59832 11.7321 8.69603 11.6941 8.78715C11.6562 8.87827 11.6006 8.961 11.5306 9.0306Z"
            fill="#B6B9BE"
          />
        </svg>
      </div>
      <div className="reviewStats">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="17"
          viewBox="0 0 16 17"
          fill="none"
        >
          <path
            d="M14.656 7.64863L11.8372 10.1086L12.6816 13.7711C12.7263 13.9626 12.7135 14.163 12.6449 14.3472C12.5764 14.5315 12.455 14.6914 12.296 14.8071C12.137 14.9227 11.9474 14.989 11.751 14.9975C11.5546 15.006 11.36 14.9564 11.1916 14.8549L7.99722 12.9174L4.80972 14.8549C4.64133 14.9564 4.44676 15.006 4.25033 14.9975C4.0539 14.989 3.86434 14.9227 3.70534 14.8071C3.54634 14.6914 3.42496 14.5315 3.35638 14.3472C3.28779 14.163 3.27504 13.9626 3.31972 13.7711L4.16285 10.1124L1.34347 7.64863C1.19435 7.52002 1.08652 7.35024 1.03351 7.16059C0.980489 6.97094 0.984646 6.76986 1.04545 6.58257C1.10626 6.39527 1.22101 6.2301 1.37532 6.10776C1.52963 5.98542 1.71662 5.91137 1.91285 5.89488L5.6291 5.573L7.07972 2.113C7.15548 1.93145 7.28325 1.77637 7.44696 1.66729C7.61067 1.55821 7.803 1.5 7.99972 1.5C8.19644 1.5 8.38877 1.55821 8.55248 1.66729C8.71619 1.77637 8.84397 1.93145 8.91972 2.113L10.3747 5.573L14.0897 5.89488C14.2859 5.91137 14.4729 5.98542 14.6272 6.10776C14.7816 6.2301 14.8963 6.39527 14.9571 6.58257C15.0179 6.76986 15.0221 6.97094 14.9691 7.16059C14.916 7.35024 14.8082 7.52002 14.6591 7.64863H14.656Z"
            fill="#1D2024"
          />
        </svg>
        <span className="avg">
          {detailInfo.averageRating === 0
            ? detailInfo.averageRating.toFixed(0)
            : detailInfo.averageRating.toFixed(2)}
        </span>
        <span className="count">({detailInfo.reviewCount})</span>
      </div>
      <div className="reviewList">
        {reviews.slice(0, 3).map((review, index) => (
          <div key={index} className="reviewItem">
            <div className="reviewUser">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M17.0769 11.0769C17.0769 12.081 16.7792 13.0626 16.2213 13.8975C15.6634 14.7324 14.8705 15.3831 13.9429 15.7674C13.0152 16.1516 11.9944 16.2522 11.0095 16.0563C10.0247 15.8604 9.1201 15.3769 8.41008 14.6668C7.70006 13.9568 7.21653 13.0522 7.02063 12.0674C6.82474 11.0826 6.92528 10.0618 7.30954 9.13407C7.6938 8.20638 8.34452 7.41347 9.17942 6.85561C10.0143 6.29776 10.9959 6 12 6C13.346 6.00153 14.6365 6.5369 15.5882 7.48868C16.54 8.44046 17.0754 9.73091 17.0769 11.0769ZM24 12C24 14.3734 23.2962 16.6934 21.9776 18.6668C20.6591 20.6402 18.7849 22.1783 16.5922 23.0865C14.3995 23.9948 11.9867 24.2324 9.65892 23.7694C7.33115 23.3064 5.19295 22.1635 3.51472 20.4853C1.83649 18.807 0.693605 16.6689 0.230582 14.3411C-0.232441 12.0133 0.00519941 9.60051 0.913451 7.4078C1.8217 5.21508 3.35977 3.34094 5.33316 2.02236C7.30655 0.703788 9.62663 0 12 0C15.1816 0.00335979 18.2319 1.26872 20.4816 3.51843C22.7313 5.76814 23.9966 8.81843 24 12ZM22.1538 12C22.1524 10.6333 21.8753 9.28095 21.3392 8.0238C20.803 6.76665 20.0189 5.63053 19.0336 4.68338C18.0484 3.73624 16.8822 2.99753 15.6049 2.51142C14.3275 2.02531 12.9653 1.80179 11.5996 1.85423C6.165 2.06423 1.83116 6.59077 1.84616 12.0288C1.85137 14.5044 2.76441 16.8922 4.41231 18.7396C5.08342 17.7662 5.9359 16.9314 6.92308 16.2808C7.00725 16.2252 7.10731 16.1987 7.20795 16.2054C7.3086 16.212 7.40429 16.2515 7.48039 16.3177C8.73483 17.4027 10.338 17.9998 11.9965 17.9998C13.6551 17.9998 15.2583 17.4027 16.5127 16.3177C16.5888 16.2515 16.6845 16.212 16.7851 16.2054C16.8858 16.1987 16.9858 16.2252 17.07 16.2808C18.0584 16.931 18.9121 17.7659 19.5842 18.7396C21.2403 16.8854 22.1551 14.4861 22.1538 12Z"
                  fill="black"
                />
              </svg>
              <div className="reviewUsername">{review.username}</div>
            </div>
            <div className="reviewInfo">
              <div className="reviewRating">{renderStars(review.rating)}</div>
              <div className="reviewDate">
                {new Date(...review.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                })}
              </div>
            </div>
            <div className="reviewContent">{review.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
