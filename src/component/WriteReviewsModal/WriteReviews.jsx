import { Modal, Form, Input, Rate, Button } from "antd";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { axiosInstance } from "../../common/func/axios";
import "./WriteReviews.css";

export default function WriteReviews({ scheduleId }) { // scheduleId를 props로 받음
  const { writeReviewsModal, setWriteReviewsModal, errMessageCheck } = useContext(AppContext);
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    try {
      await axiosInstance.post(`/api/workation-schedules/${scheduleId}/reviews`, {
        rating: values.rating,
        content: values.content,
      });

      console.log(`리뷰: ${values.content}, 별점: ${values.rating}`);
      setWriteReviewsModal(false);
      form.resetFields(); // 폼 리셋
      window.location.reload();
    } catch (error) {
      errMessageCheck(error.response.data.errorMessage);
      console.error("리뷰 제출 중 오류 발생:", error);
    }
  };

  return (
    <Modal
      open={writeReviewsModal}
      onCancel={() => setWriteReviewsModal(false)}
      footer={null}
      centered // 모달을 화면 중앙에 위치
    >
      <section className="modalSection">
        <h2 className="modalTitle">리뷰 작성</h2>
        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
        >
          <Form.Item
            name="rating"
            label="별점"
            rules={[{ required: true, message: "별점을 선택해주세요." }]}
          >
            <Rate />
          </Form.Item>

          <Form.Item
            name="content"
            label="리뷰 내용"
            rules={[{ required: true, message: "리뷰 내용을 입력해주세요." }]}
          >
            <Input.TextArea
              placeholder="리뷰를 작성하세요..."
              rows={5}
            />
          </Form.Item>
          
          <Form.Item>
            <Button type="primary" htmlType="submit">
              제출
            </Button>
          </Form.Item>
        </Form>
      </section>
    </Modal>
  );
}
