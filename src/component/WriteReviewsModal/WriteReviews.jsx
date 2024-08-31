import { Modal } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

export default function WriteReviews() {
  const {writeReviewsModal, setWriteReviewsModal} = useContext(AppContext);

  return (
    <Modal open={writeReviewsModal} onClose={() => setWriteReviewsModal(false)}>
      <section>
        
      </section>
    </Modal>
  )
}