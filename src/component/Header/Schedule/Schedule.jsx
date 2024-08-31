import Header from "../Header";
import "./Schedule.css";

export default function Schedule () {
  return (
    <div className="Schedule">
      <Header />
      <div className="schdCnt">
        <span>Schedule</span>
        <span>schedules, Date order</span>
        <div className="item">
          <img />
          <div className="info">
                    
          </div>
          <button>Write a review</button>
        </div>
      </div>
    </div>
  );
};