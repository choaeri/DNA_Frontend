import { DatePicker, Modal, Form } from "antd"; // DatePicker와 Modal 추가
import { useContext, useEffect, useState } from "react";
import { axiosInstance } from "../../../../common/func/axios";
import { AppContext } from "../../../../context/AppContext";
import "./AddSchedule.css";
import useLocalStorage from "../../../../utils/useLocalStorage";
import LoginPopup from "../../../LoginPopup/LoginPopup";

const { RangePicker } = DatePicker;

export default function AddSchedule (props) {
  const { isLoginPopup, setIsLoginPopup, detailInfo, errMessageCheck } = useContext(AppContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [scheduledDates, setScheduledDates] = useState([]);
  const { isLoggedIn } = useLocalStorage();
  const [form] = Form.useForm(); // Form 인스턴스 생성

  const showModal = () => {
    if(isLoggedIn) {
      setIsModalVisible(true);
    } else {
      setIsLoginPopup(true);
    };
  };

  const handleOk = async () => {
    if(props.locationId !== null) {
      try {
        const selectedDates = await form.validateFields(); // 선택된 날짜 유효성 검사
        const { dates } = selectedDates; // 선택된 날짜 배열 가져오기
        const createWorkationScheduleRequest = {
          startDate: dates[0].format('YYYY-MM-DD'), // 시작 날짜 포맷
          endDate: dates[1].format('YYYY-MM-DD')    // 종료 날짜 포맷
        };
  
        await axiosInstance.post(`/api/locations/${props.locationId}/workation-schedules`, createWorkationScheduleRequest);
  
        window.location.reload();
      } catch (errorInfo) {
        errMessageCheck(errorInfo.response.data.errorMessage);
      };
    };
  };

  const handleCancel = () => {
    form.resetFields(); // 모달 닫을 때 선택한 날짜 초기화
    setIsModalVisible(false);
  };

  // 날짜 비활성화
  const disabledDate = (current) => {
    const today = new Date().setHours(0, 0, 0, 0);
    const isPastDate = current && current < today;

    // scheduledDates에서 날짜를 Date 객체로 변환하여 비활성화 조건에 추가
    const isScheduledDate = scheduledDates.some(date => {
      const scheduledDate = new Date(date);
      return current.isSame(scheduledDate, 'day'); // moment.js를 사용하는 경우
    });

    return isPastDate || isScheduledDate; // 과거 날짜 또는 예정된 날짜 비활성화
  };

  useEffect(() => {
    const fetchScheduledDates = async () => {
      try {
        const response = await axiosInstance.get("/api/workation-schedules/scheduled-dates");
        setScheduledDates(response.data.scheduledDates);
      } catch (error) {
        errMessageCheck(error.response.data.errorMessage);
      }
    };

    // scheduledDates가 비어있을 때만 데이터를 가져옵니다.
    if (scheduledDates.length === 0) {
      fetchScheduledDates();
    }
  }, []);
  
  return (
    <div className="schedule">
      <button className="schdBtn" onClick={showModal}>
        <span>Add to Schedule</span>
      </button>
      {isLoginPopup && <LoginPopup message={'Please log in to access this feature.'} />}
      {/* Modal 추가 */}
      <Modal
        title="Add to schedule"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form}>
          <Form.Item
            name="dates"
            rules={[
              {
                required: true,
                message: '시작 날짜와 종료 날짜를 선택해주세요!',
              },
              {
                validator: (_, value) => {
                  if (value && value.length === 2) {
                    const [startDate, endDate] = value;
                    if (startDate.isSame(endDate, 'day')) {
                      return Promise.reject(new Error('시작 날짜와 종료 날짜는 같을 수 없습니다.'));
                    }
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <RangePicker 
              disabledDate={disabledDate} // 과거 날짜 비활성화
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}