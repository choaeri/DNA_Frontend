import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from "../../../../../context/AppContext";
import "./DetailReviews.css";
import { Modal } from "@mui/material";
import { axiosInstance } from "../../../../../common/func/axios";


export default function DetailReviews () {
  const {errMessageCheck, openReviewModal, setOpenReviewModal, detailInfo} = useContext(AppContext);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axiosInstance.get('/api/public/workation-reviews/all', {
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

  return (
    <Modal 
      open={openReviewModal} onClose={() => setOpenReviewModal(false)}
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
              <button className="writeBtn">
                <span>Write a review</span>
              </button>
            </div>
            <div className="line"></div>
          </div>
        </div>
      </section>
    </Modal>
  )
}