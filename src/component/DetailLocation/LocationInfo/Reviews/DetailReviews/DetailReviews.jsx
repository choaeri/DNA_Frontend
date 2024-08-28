import { useContext } from "react";
import { AppContext } from "../../../../../context/AppContext";
import "./DetailReviews.css";
import { Modal } from "@mui/material";

export default function DetailReviews () {
	const {openReviewModal, setOpenReviewModal} = useContext(AppContext);

  return (
    <Modal 
      open={openReviewModal} onClose={() => setOpenReviewModal(false)}
    >
      <section className="dtrSection">
        <div className="dtrModal">
          <div className="dtrHeader">
            <span>Reviews</span>
            <svg className="closeBtn" onClick={() => setOpenReviewModal(false)} xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path d="M12.929 13.0713L27.0711 27.2134" stroke="black" stroke-width="2"/>
              <path d="M27.071 13.0713L12.9289 27.2134" stroke="black" stroke-width="2"/>
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