import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../../context/AppContext";
import "./WorkationDetail.css";
import { Modal } from "@mui/material";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { axiosInstance } from "../../../../common/func/axios";
import { locationMatch } from "../../../../common/func/match";

const locationImg = [
  "/img/workation1.webp",
  "/img/workation2.webp",
  "/img/workation3.webp",
  "/img/workation4.webp",
  "/img/workation5.webp",
];
export default function WorkationDetail(props) {
  const {
    isWorkationBookmarked,
    workationModal,
    setWorkationModal,
    onClickLike,
    errMessageCheck,
  } = useContext(AppContext);
  const [office, setOffice] = useState(null);

  const generateRandomTelNumber = () => {
    const randomPart1 = Math.floor(1000 + Math.random() * 9000); // 1000 ~ 9999
    const randomPart2 = Math.floor(1000 + Math.random() * 9000); // 1000 ~ 9999
    return `033-${randomPart1}-${randomPart2}`;
  };

  const telNumber = generateRandomTelNumber();

  useEffect(() => {
    const fetchOffice = async () => {
      try {
        const res = await axiosInstance.get(
          `/api/public/workation-offices/${props.officeId}`
        );
        const data = res.data;
        setOffice(data);
      } catch (err) {
        errMessageCheck(err.response.data.errorMessage);
      }
    };
    fetchOffice();
  }, [props.officeId, errMessageCheck]);

  return (
    <Modal
      open={workationModal}
      onClose={() => setWorkationModal(false)}
      centered
    >
      <section className="wknSection">
        <div className="wknCnt">
          <div className="header">
            <svg
              className="closeBtn"
              onClick={() => setWorkationModal(false)}
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
            >
              <path
                d="M12.929 13.0713L27.0711 27.2134"
                stroke="black"
                strokeWidth="2"
              />
              <path
                d="M27.071 13.0713L12.9289 27.2134"
                stroke="black"
                strokeWidth="2"
              />
            </svg>
          </div>
          <div className="content">
            <span className="lcnName">{locationMatch[props.locationName]}</span>
            <div className="facName">
              <span>{props.officeName}</span>
              {isWorkationBookmarked &&
              isWorkationBookmarked[props.officeId] !== undefined ? (
                isWorkationBookmarked[props.officeId] ? (
                  <HeartFilled
                    className="bmBtn"
                    onClick={(e) =>
                      onClickLike(e, props.officeId, "Workation Office")
                    }
                    style={{ color: "red", cursor: "pointer" }}
                  />
                ) : (
                  <HeartOutlined
                    className="bmBtn"
                    onClick={(e) =>
                      onClickLike(e, props.officeId, "Workation Office")
                    }
                    style={{ color: "black", cursor: "pointer" }}
                  />
                )
              ) : null}
            </div>
            <div className="facImg">
              <div className="leftImage">
                <img src={locationImg[0]} alt={locationImg[0]} />
              </div>
              <div className="rightImages">
                <div className="rightRow">
                  {locationImg.slice(1, 3).map((img, idx) => (
                    <img key={idx} src={img} alt={img} />
                  ))}
                </div>
                <div className="rightRow">
                  {locationImg.slice(3).map((img, idx) => (
                    <img key={idx} src={img} alt={img} />
                  ))}
                </div>
              </div>
            </div>
            <div className="facInfo">
              <div className="item">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M8 3.75C7.4561 3.75 6.92442 3.91128 6.47218 4.21346C6.01995 4.51563 5.66747 4.94512 5.45933 5.44762C5.25119 5.95012 5.19673 6.50305 5.30284 7.0365C5.40895 7.56995 5.67086 8.05995 6.05546 8.44454C6.44005 8.82914 6.93005 9.09105 7.4635 9.19716C7.99695 9.30327 8.54988 9.24881 9.05238 9.04067C9.55488 8.83253 9.98437 8.48005 10.2865 8.02782C10.5887 7.57558 10.75 7.0439 10.75 6.5C10.7492 5.77091 10.4592 5.07192 9.94363 4.55637C9.42808 4.04082 8.72909 3.75083 8 3.75ZM8 7.75C7.75277 7.75 7.5111 7.67669 7.30554 7.53934C7.09998 7.40199 6.93976 7.20676 6.84515 6.97835C6.75054 6.74995 6.72579 6.49861 6.77402 6.25614C6.82225 6.01366 6.9413 5.79093 7.11612 5.61612C7.29093 5.4413 7.51366 5.32225 7.75614 5.27402C7.99861 5.22579 8.24995 5.25054 8.47835 5.34515C8.70676 5.43976 8.90199 5.59998 9.03934 5.80554C9.17669 6.0111 9.25 6.25277 9.25 6.5C9.25 6.83152 9.1183 7.14946 8.88388 7.38388C8.64946 7.6183 8.33152 7.75 8 7.75ZM8 0.75C6.47551 0.751654 5.01394 1.35799 3.93596 2.43596C2.85799 3.51394 2.25165 4.97551 2.25 6.5C2.25 11.335 7.3525 14.9625 7.57 15.1144C7.69604 15.2026 7.84616 15.2499 8 15.2499C8.15384 15.2499 8.30396 15.2026 8.43 15.1144C9.39642 14.4021 10.2806 13.5846 11.0662 12.6769C12.8219 10.6606 13.75 8.52312 13.75 6.5C13.7483 4.97551 13.142 3.51394 12.064 2.43596C10.9861 1.35799 9.52449 0.751654 8 0.75ZM9.95625 11.6694C9.36033 12.3539 8.70576 12.985 8 13.5556C7.29424 12.985 6.63967 12.3539 6.04375 11.6694C5 10.4606 3.75 8.58187 3.75 6.5C3.75 5.37283 4.19777 4.29183 4.9948 3.4948C5.79183 2.69777 6.87283 2.25 8 2.25C9.12717 2.25 10.2082 2.69777 11.0052 3.4948C11.8022 4.29183 12.25 5.37283 12.25 6.5C12.25 8.58187 11 10.4606 9.95625 11.6694Z"
                    fill="#292C30"
                  />
                </svg>
                <span className="exp">
                  {office && office.address
                    ? office.address
                    : "주소가 없습니다."}
                </span>
              </div>
              <div className="item">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M8 1.25C6.66498 1.25 5.35994 1.64588 4.2499 2.38758C3.13987 3.12928 2.27471 4.18349 1.76382 5.41689C1.25292 6.65029 1.11925 8.00749 1.3797 9.31686C1.64015 10.6262 2.28303 11.829 3.22703 12.773C4.17104 13.717 5.37377 14.3598 6.68314 14.6203C7.99252 14.8808 9.34971 14.7471 10.5831 14.2362C11.8165 13.7253 12.8707 12.8601 13.6124 11.7501C14.3541 10.6401 14.75 9.33502 14.75 8C14.748 6.2104 14.0362 4.49466 12.7708 3.22922C11.5053 1.96378 9.78961 1.25199 8 1.25ZM8 13.25C6.96165 13.25 5.94662 12.9421 5.08326 12.3652C4.2199 11.7883 3.547 10.9684 3.14964 10.0091C2.75228 9.04978 2.64831 7.99418 2.85088 6.97578C3.05345 5.95738 3.55347 5.02191 4.28769 4.28769C5.02192 3.55346 5.95738 3.05345 6.97578 2.85088C7.99418 2.6483 9.04978 2.75227 10.0091 3.14963C10.9684 3.54699 11.7883 4.2199 12.3652 5.08326C12.9421 5.94661 13.25 6.96165 13.25 8C13.2485 9.39193 12.6949 10.7264 11.7107 11.7107C10.7264 12.6949 9.39193 13.2485 8 13.25ZM12.25 8C12.25 8.19891 12.171 8.38968 12.0303 8.53033C11.8897 8.67098 11.6989 8.75 11.5 8.75H8C7.80109 8.75 7.61032 8.67098 7.46967 8.53033C7.32902 8.38968 7.25 8.19891 7.25 8V4.5C7.25 4.30109 7.32902 4.11032 7.46967 3.96967C7.61032 3.82902 7.80109 3.75 8 3.75C8.19892 3.75 8.38968 3.82902 8.53033 3.96967C8.67098 4.11032 8.75 4.30109 8.75 4.5V7.25H11.5C11.6989 7.25 11.8897 7.32902 12.0303 7.46967C12.171 7.61032 12.25 7.80109 12.25 8Z"
                    fill="#292C30"
                  />
                </svg>
                <span className="exp">
                  {office && office.businessHours
                    ? office.businessHours
                    : "운영 시간이 없습니다."}
                </span>
              </div>
              <div className="item">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M13 2.25H3C2.53587 2.25 2.09075 2.43437 1.76256 2.76256C1.43437 3.09075 1.25 3.53587 1.25 4V10.75C1.25 11.2141 1.43437 11.6592 1.76256 11.9874C2.09075 12.3156 2.53587 12.5 3 12.5H7.25V13.25H6C5.80109 13.25 5.61032 13.329 5.46967 13.4697C5.32902 13.6103 5.25 13.8011 5.25 14C5.25 14.1989 5.32902 14.3897 5.46967 14.5303C5.61032 14.671 5.80109 14.75 6 14.75H10C10.1989 14.75 10.3897 14.671 10.5303 14.5303C10.671 14.3897 10.75 14.1989 10.75 14C10.75 13.8011 10.671 13.6103 10.5303 13.4697C10.3897 13.329 10.1989 13.25 10 13.25H8.75V12.5H13C13.2298 12.5 13.4574 12.4547 13.6697 12.3668C13.882 12.2788 14.0749 12.1499 14.2374 11.9874C14.3999 11.8249 14.5288 11.632 14.6168 11.4197C14.7047 11.2074 14.75 10.9798 14.75 10.75V4C14.75 3.77019 14.7047 3.54262 14.6168 3.3303C14.5288 3.11798 14.3999 2.92507 14.2374 2.76256C14.0749 2.60006 13.882 2.47116 13.6697 2.38321C13.4574 2.29527 13.2298 2.25 13 2.25ZM3 3.75H13C13.0663 3.75 13.1299 3.77634 13.1768 3.82322C13.2237 3.87011 13.25 3.9337 13.25 4V8.5H2.75V4C2.75 3.9337 2.77634 3.87011 2.82322 3.82322C2.87011 3.77634 2.9337 3.75 3 3.75ZM13 11H3C2.9337 11 2.87011 10.9737 2.82322 10.9268C2.77634 10.8799 2.75 10.8163 2.75 10.75V10H13.25V10.75C13.25 10.8163 13.2237 10.8799 13.1768 10.9268C13.1299 10.9737 13.0663 11 13 11Z"
                    fill="#292C30"
                  />
                </svg>
                <span className="exp">
                  {
                    "Meeting Room, Independent Video Conferencing Facility, Monitor, Multifunction Device"
                  }
                </span>
              </div>
              <div className="item">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M14 9.67521L11.0569 8.35584L11.0456 8.35084C10.8543 8.26836 10.6454 8.23516 10.4379 8.25427C10.2305 8.27338 10.0312 8.34418 9.85813 8.46021C9.83388 8.47645 9.81051 8.49398 9.78813 8.51271L8.39375 9.70021C7.58125 9.25959 6.74188 8.42709 6.30063 7.62459L7.49188 6.20834C7.51103 6.18548 7.52877 6.16148 7.545 6.13646C7.65799 5.96406 7.72659 5.76639 7.74469 5.56106C7.76279 5.35572 7.72984 5.1491 7.64875 4.95959C7.64683 4.95596 7.64516 4.9522 7.64375 4.94834L6.325 2.00021C6.21676 1.75367 6.03201 1.54852 5.7981 1.41513C5.5642 1.28175 5.29357 1.22721 5.02625 1.25959C4.11899 1.37877 3.28612 1.82413 2.68322 2.5125C2.08031 3.20086 1.74859 4.08515 1.75 5.00021C1.75 10.1008 5.89938 14.2502 11 14.2502C11.9151 14.2516 12.7994 13.9199 13.4877 13.317C14.1761 12.7141 14.6214 11.8812 14.7406 10.974C14.773 10.7067 14.7185 10.436 14.5851 10.2021C14.4517 9.96821 14.2466 9.78346 14 9.67521ZM11 12.7502C8.94534 12.7477 6.97554 11.9304 5.52267 10.4776C4.0698 9.02468 3.25249 7.05488 3.25 5.00021C3.24857 4.4824 3.42437 3.97968 3.74818 3.5756C4.07199 3.17152 4.52432 2.8904 5.03 2.77896L6.20625 5.40396L5.00875 6.83021C4.9894 6.85328 4.97145 6.87749 4.955 6.90271C4.83697 7.08306 4.76758 7.29086 4.75356 7.50594C4.73954 7.72102 4.78138 7.93607 4.875 8.13021C5.46375 9.33521 6.67688 10.5402 7.89438 11.1302C8.08982 11.2229 8.30595 11.2632 8.52165 11.2473C8.73736 11.2315 8.94525 11.1599 9.125 11.0396C9.14917 11.0233 9.17234 11.0055 9.19438 10.9865L10.5963 9.79459L13.2213 10.9702C13.1098 11.4759 12.8287 11.9282 12.4246 12.252C12.0205 12.5758 11.5178 12.7516 11 12.7502Z"
                    fill="#292C30"
                  />
                </svg>
                <span className="exp">
                  {telNumber}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Modal>
  );
}
