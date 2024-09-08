import { Input, Rate, Button, notification } from "antd";
import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { axiosInstance } from "../../common/func/axios";
import "./WriteReviews.css";
import { Modal } from "@mui/material";

export default function WriteReviews({ scheduleId }) { // scheduleId를 props로 받음
  const { writeReviewsModal, setWriteReviewsModal, errMessageCheck } = useContext(AppContext);
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");

  // const handleSubmit = async (values) => {
  //   try {
  //     await axiosInstance.post(`/api/workation-schedules/${scheduleId}/reviews`, {
  //       rating: values.rating,
  //       content: values.content,
  //     });

  //     console.log(`리뷰: ${values.content}, 별점: ${values.rating}`);
  //     setWriteReviewsModal(false);
  //     form.resetFields(); // 폼 리셋
  //     window.location.reload();
  //   } catch (error) {
  //     errMessageCheck(error.response.data.errorMessage);
  //     console.error("리뷰 제출 중 오류 발생:", error);
  //   }
  // };

  const handleSubmit = async () => {
    if (!rating) {
      notification.error({ message: '별점 내용을 입력해주세요.' });
      return;
    } else if (!content) {
      notification.error({ message: '리뷰 내용을 입력해주세요.' });
      return;
    };

    try {
      await axiosInstance.post(`/api/workation-schedules/${scheduleId}/workation-reviews`, {
        rating,
        content,
      });

      console.log(`리뷰: ${content}, 별점: ${rating}`);
      setWriteReviewsModal(false);
      setRating(0); // 별점 초기화
      setContent(""); // 내용 초기화
      window.location.reload();
    } catch (error) {
      errMessageCheck(error.response.data.errorMessage);
      console.error("리뷰 제출 중 오류 발생:", error);
    }
  };

  return (
    <Modal
      open={writeReviewsModal}
      onClose={() => setWriteReviewsModal(false)}
      centered // 모달을 화면 중앙에 위치
    >
      <section className="modalSection">
        <div className="modalCnt">
          <div className="header">
            <span className="tit">Write a review</span>
            <svg className="closeBtn" onClick={() => setWriteReviewsModal(false)} xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path d="M12.929 13.0713L27.0711 27.2134" stroke="black" strokeWidth="2"/>
              <path d="M27.071 13.0713L12.9289 27.2134" stroke="black" strokeWidth="2"/>
            </svg>
          </div>
          <div className="content">
            <div className="location">
              <div className="lcnCnt">
                
              </div>
            </div>

            <div className="rating">
              <Rate value={rating} onChange={setRating} />
            </div>

            <div className="reviewContent">
              <span>Please tell the workation spot you used and how it was in that area</span>
              <Input
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="It was a good combination of work and relaxation, and the atmosphere in this area was quiet and quiet."
              />
            </div>
            {/* <Form
              form={form}
              onFinish={handleSubmit}
              layout="vertical"
            >
              <Form.Item
                name="rating"
                rules={[{ required: true, message: "별점을 선택해주세요." }]}
              >
                <Rate />
              </Form.Item>

              <Form.Item
                name="content"
                rules={[{ required: true, message: "리뷰 내용을 입력해주세요." }]}
              >
                <Input.TextArea
                  placeholder="It was a good combination of work and relaxation, and the atmosphere in this area was quiet and quiet."
                  rows={5}
                />
              </Form.Item>
              
              <Form.Item>
                <Button className="wrtBtn" type="primary" htmlType="submit">
                  Write a review
                </Button>
              </Form.Item>
            </Form> */}
          </div>
          <div className="submitBtn">
            <Button className="wrtBtn" type="primary" onClick={handleSubmit}>
              Write a review
            </Button>
          </div>
        </div>
      </section>
    </Modal>
  );
}
