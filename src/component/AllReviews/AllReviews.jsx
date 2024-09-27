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
    <div className="AllReviews">
      <span className='tit'>The Reviews of Travelers<br />from All Over the World</span>
      <div className='cont'>
        {reviews.length > 0 && 
          reviews.map((review) => (
            <div className="card" key={review.reviewId}>
              <span className='locationName'>{review.locationName}</span>
              <div className='info'>
                <div className="reviewRating">{renderStars(review.rating)}</div>
                <span>{new Date(...review.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</span>
              </div>
              <span className='content'>{review.content}</span>
              <div className='userCnt'>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                  <path d="M11.3846 7.88461C11.3846 8.55403 11.1861 9.20841 10.8142 9.765C10.4423 10.3216 9.9137 10.7554 9.29524 11.0116C8.67678 11.2678 7.99625 11.3348 7.3397 11.2042C6.68315 11.0736 6.08006 10.7512 5.60672 10.2779C5.13337 9.80455 4.81102 9.20147 4.68042 8.54492C4.54983 7.88837 4.61685 7.20783 4.87303 6.58938C5.1292 5.97092 5.56301 5.44232 6.11961 5.07041C6.67621 4.6985 7.33059 4.5 8 4.5C8.89734 4.50102 9.75764 4.85794 10.3922 5.49245C11.0267 6.12697 11.3836 6.98727 11.3846 7.88461ZM16 8.5C16 10.0822 15.5308 11.629 14.6518 12.9446C13.7727 14.2602 12.5233 15.2855 11.0615 15.891C9.59966 16.4965 7.99113 16.655 6.43928 16.3463C4.88743 16.0376 3.46197 15.2757 2.34315 14.1569C1.22433 13.038 0.462403 11.6126 0.153721 10.0607C-0.15496 8.50887 0.00346628 6.90034 0.608967 5.43853C1.21447 3.97672 2.23985 2.72729 3.55544 1.84824C4.87103 0.969192 6.41775 0.5 8 0.5C10.121 0.50224 12.1546 1.34581 13.6544 2.84562C15.1542 4.34542 15.9978 6.37895 16 8.5ZM14.7692 8.5C14.7682 7.58887 14.5835 6.6873 14.2261 5.8492C13.8687 5.0111 13.3459 4.25369 12.6891 3.62226C12.0322 2.99083 11.2548 2.49835 10.4032 2.17428C9.55169 1.85021 8.64354 1.70119 7.73308 1.73615C4.11 1.87615 1.22077 4.89385 1.23077 8.51923C1.23425 10.1696 1.84294 11.7614 2.94154 12.9931C3.38894 12.3442 3.95726 11.7876 4.61539 11.3538C4.6715 11.3168 4.7382 11.2991 4.8053 11.3036C4.8724 11.308 4.93619 11.3343 4.98693 11.3785C5.82322 12.1018 6.89198 12.4999 7.99769 12.4999C9.10341 12.4999 10.1722 12.1018 11.0085 11.3785C11.0592 11.3343 11.123 11.308 11.1901 11.3036C11.2572 11.2991 11.3239 11.3168 11.38 11.3538C12.039 11.7874 12.6081 12.3439 13.0562 12.9931C14.1602 11.7569 14.7701 10.1574 14.7692 8.5Z" fill="#808388"/>
                </svg>
                <span className='userName'>{review.username}</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}