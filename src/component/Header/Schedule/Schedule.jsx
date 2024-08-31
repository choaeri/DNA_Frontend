import Header from "../Header";
import { axiosInstance } from "../../../common/func/axios";
import { useContext, useEffect, useState } from 'react';
import "./Schedule.css";
import { AppContext } from "../../../context/AppContext";
import WriteReviews from "../../WriteReviewsModal/WriteReviews";
import { Modal } from "@mui/material";

export default function Schedule() {
  const [schedules, setSchedules] = useState([]);
  const { setWriteReviewsModal } = useContext(AppContext);
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);
  const [scheduleToDelete, setScheduleToDelete] = useState(null);
  const [selectedScheduleId, setSelectedScheduleId] = useState(null); // 추가된 상태

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
        console.error("Error fetching schedules:", err);
      }
    };

    fetchSchedules();
  }, []);

  const handleDeleteClick = (scheduleId) => {
    setScheduleToDelete(scheduleId);
    setConfirmDeleteModal(true);
  };

  const handleWriteReviewClick = (scheduleId) => {
    setSelectedScheduleId(scheduleId); // 선택된 스케줄 ID 설정
    setWriteReviewsModal(true); // 모달 열기
  };

  const confirmDelete = async () => {
    try {
      await axiosInstance.delete(`/api/workation-schedules/${scheduleToDelete}`);
      setSchedules(schedules.filter(schedule => schedule.scheduleId !== scheduleToDelete));
      setConfirmDeleteModal(false);
    } catch (err) {
      console.error("Error deleting schedule:", err);
    }
  };

  return (
    <div className="Schedule">
      <WriteReviews scheduleId={selectedScheduleId} /> {/* scheduleId를 props로 전달 */}
      <Header />
      <div className="schdCnt">
        <span>Schedule</span>
        <span>schedules, Date order</span>

        {schedules.map(schedule => (
          <div className="item" key={schedule.scheduleId}>
            <img src={`path/to/image/${schedule.LocationName}.jpg`} alt={schedule.LocationName} />
            <div className="info">
              <span>Location: {schedule.LocationName}</span>
              <span>Start Date: {schedule.startDate}</span>
              <span>End Date: {schedule.endDate}</span>
            </div>
            <button disabled={schedule.hasReview} onClick={() => handleWriteReviewClick(schedule.scheduleId)}>Write a review</button>
            <button className="deleteButton" onClick={() => handleDeleteClick(schedule.scheduleId)}>x</button>
          </div>
        ))}
      </div>

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
