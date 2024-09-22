import Header from "../Header";
import { axiosInstance } from "../../../common/func/axios";
import { useContext, useEffect, useState } from 'react';
import "./Schedule.css";
import { AppContext } from "../../../context/AppContext";
import WriteReviews from "../../WriteReviewsModal/WriteReviews";
import { Modal } from "@mui/material";
import { Button } from "antd";

export default function Schedule() {
  const { schedules, setSchedules, setWriteReviewsModal, errMessageCheck } = useContext(AppContext);
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);
  const [deleteScheduleId, setDeleteScheduleId] = useState(null);
  const [deleteLocationId, setDeleteLocationId] = useState(null);
  const [selectedSchedule, setSelectedSchedule] = useState(null); // 추가된 상태

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const res = await axiosInstance.get("/api/workation-schedules");
        const data = res.data;
        if (Array.isArray(data)) {
          setSchedules(data);
        } else {
          console.error("Fetched locations data is not an array:", data);
          setSchedules([]);
        }
      } catch (err) {
        errMessageCheck(err.response.data.errorMessage);
        console.error("Error fetching schedules:", err);
      }
    };

    fetchSchedules();
  }, []);

  const handleDeleteClick = (scheduleId, locationId) => {
    setDeleteScheduleId(scheduleId);
    setDeleteLocationId(locationId)
    setConfirmDeleteModal(true);
  };

  const handleWriteReviewClick = (selectedSchedule) => {
    setSelectedSchedule(selectedSchedule);
    setWriteReviewsModal(true); // 모달 열기
  };

  const confirmDelete = async () => {
    try {
      await axiosInstance.delete(`/api/workation-schedules/${deleteScheduleId}`, {
        params: {
            locationId: deleteLocationId 
        }
    });
      setSchedules(schedules.filter(schedule => schedule.scheduleId !== deleteScheduleId));
      setConfirmDeleteModal(false);
    } catch (err) {
      errMessageCheck(err.response.data.errorMessage);
      console.error("Error deleting schedule:", err);
    }
  };

  return (
    <div className="Schedule">
      <Header />
      <div className="schdCnt">
        <div className="header">
          <span className="tit">Schedule</span>
          <span className="exp">schedules, Date order</span>
        </div>

        {schedules.map(schedule => (
          <div className="item" key={schedule.scheduleId}>
            <img src={schedule.locationThumbnail} alt={schedule.locationName} />
            <div className="info">
              <span className="lcnName">{schedule.locationName}</span>
              <span className="date">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                  <path d="M13 2.25H11.75V2C11.75 1.80109 11.671 1.61032 11.5303 1.46967C11.3897 1.32902 11.1989 1.25 11 1.25C10.8011 1.25 10.6103 1.32902 10.4697 1.46967C10.329 1.61032 10.25 1.80109 10.25 2V2.25H5.75V2C5.75 1.80109 5.67098 1.61032 5.53033 1.46967C5.38968 1.32902 5.19891 1.25 5 1.25C4.80109 1.25 4.61032 1.32902 4.46967 1.46967C4.32902 1.61032 4.25 1.80109 4.25 2V2.25H3C2.66848 2.25 2.35054 2.3817 2.11612 2.61612C1.8817 2.85054 1.75 3.16848 1.75 3.5V13.5C1.75 13.8315 1.8817 14.1495 2.11612 14.3839C2.35054 14.6183 2.66848 14.75 3 14.75H13C13.3315 14.75 13.6495 14.6183 13.8839 14.3839C14.1183 14.1495 14.25 13.8315 14.25 13.5V3.5C14.25 3.16848 14.1183 2.85054 13.8839 2.61612C13.6495 2.3817 13.3315 2.25 13 2.25ZM4.25 3.75C4.25 3.94891 4.32902 4.13968 4.46967 4.28033C4.61032 4.42098 4.80109 4.5 5 4.5C5.19891 4.5 5.38968 4.42098 5.53033 4.28033C5.67098 4.13968 5.75 3.94891 5.75 3.75H10.25C10.25 3.94891 10.329 4.13968 10.4697 4.28033C10.6103 4.42098 10.8011 4.5 11 4.5C11.1989 4.5 11.3897 4.42098 11.5303 4.28033C11.671 4.13968 11.75 3.94891 11.75 3.75H12.75V5.25H3.25V3.75H4.25ZM3.25 13.25V6.75H12.75V13.25H3.25Z" fill="#B6B9BE"/>
                </svg>
                {schedule.startDate} - {schedule.endDate}
              </span>
            </div>
            <Button className="wrtBtn" disabled={schedule.hasReview} onClick={() => handleWriteReviewClick(schedule)}>Write a review</Button>
            <svg className="deleteButton" onClick={() => handleDeleteClick(schedule.scheduleId, schedule.locationId)} xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M10.3433 10.6562L21.657 21.97" stroke="#B6B9BE" strokeWidth="1.5"/>
              <path d="M21.6567 10.6562L10.343 21.97" stroke="#B6B9BE" strokeWidth="1.5"/>
            </svg>
          </div>
        ))}
      </div>

      {selectedSchedule ? <WriteReviews selectedSchedule={selectedSchedule} /> : null}
      
      {confirmDeleteModal && <div className="modalOverlay" onClick={() => setConfirmDeleteModal(false)} />}
      <Modal open={confirmDeleteModal} onClose={() => setConfirmDeleteModal(false)}>
        <div className="confirmModal">
          <h2>정말로 삭제하시겠습니까?</h2>
          <button onClick={confirmDelete}>예</button>
          <button onClick={() => setConfirmDeleteModal(false)}>아니요</button>
        </div>
      </Modal>
    </div>
  );
}
