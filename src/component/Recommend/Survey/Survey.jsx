import { useState } from "react";
import Header from "../../Header/Header";
import './Survey.css';
import { Container, Box } from '@mui/material';
import { questions } from "./questions";
import { axiosInstance } from "../../../common/func/axios";
import { notification } from "antd";
import { FrownOutlined, SmileOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export default function Survey () {
  const [step, setStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [dto, setDto] = useState({
    gender: null,
    age: null,
    income: null,
    travelCompanions: null,
    travelPreference: null,
    newOrFamiliar: null,
    comfortVsCost: null,
    relaxationVsActivities: null,
    knownVsUnknown: null,
    photographyImportance: null,
  });
  const navigate = useNavigate();
  
  const handleNext = async () => {
    if (selectedOption === null) {
      notification.open({
        message: "Please select an option before proceeding.",
        icon: <FrownOutlined style={{ color: "#ff3333" }} />,
      });
      return;
    };
    
    if (step < questions.length - 1) {
      setStep(step + 1);
      setSelectedOption(null);
    } else {
      try {
        await axiosInstance.post('/api/recommend/locations', dto);
        notification.open({
          message: "Thank you for completing the survey!",
          icon: <SmileOutlined style={{ color: "#108ee9" }} />,
        });
        navigate("/mypage/recommend");

      } catch (error) {
        const {
          data: { errorMessage },
        } = error.response;

        notification.open({
          message: errorMessage,
          icon: <FrownOutlined style={{ color: "#ff3333" }} />,
        });
      }
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
      setSelectedOption(null);
    }
  };

  const getDtoKey = (questionIndex) => {
    switch (questionIndex) {
      case 0: return 'gender'; // 성별
      case 1: return 'age'; // 나이
      case 2: return 'income'; // 평균 월 소득
      case 3: return 'travelCompanions'; // 여행 동반자 수
      case 4: return 'travelPreference'; // 자연 vs 도시
      case 5: return 'newOrFamiliar'; // 새로운 곳 vs 친숙한 곳
      case 6: return 'comfortVsCost'; // 편안한 여행 vs 저렴한 여행
      case 7: return 'relaxationVsActivities'; // 휴식 vs 활동
      case 8: return 'knownVsUnknown'; // 잘 알려진 곳 vs 덜 알려진 곳
      case 9: return 'photographyImportance'; // 여행 중 사진 촬영 중요성
      default: return null;
    }
  };

  const handleAnswer = (value) => {
    if (questions[step].type === 'input') {
      setDto((prevDto) => ({
        ...prevDto,
        [getDtoKey(step)]: value, // 숫자로 DTO에 저장
      }));
    } else {
      setDto((prevDto) => ({
        ...prevDto,
        [getDtoKey(step)]: value + 1, // 정수형으로 DTO에 저장
      }));
    }
    setSelectedOption(value); // 선택된 옵션 저장
  };

  const renderQuestion = () => {
    const currentQuestion = questions[step];

    if (currentQuestion.type === "input") {
      return (
        <Box>
          <div className="question">
            {currentQuestion.question}
          </div>
          <div className="quesCnt">
            <input
              type="number"
              onChange={(e) => handleAnswer(Number(e.target.value))}
            />
          </div>
        </Box>
      );
    }

    return (
      <Box>
        <div className="question">
          {currentQuestion.question}
        </div>
        <div className="quesCnt" style={currentQuestion.type === "vertical" ? {flexDirection: "column"} : null}>
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              className="quesBtn"
              style={selectedOption === index ? {backgroundColor: "black", color: "white"} : null}
              onClick={() => handleAnswer(index)}
            >
              {option}
            </button>
          ))}
        </div>
      </Box>
    );
  };

  return (
    <div className="Survey">
      <Header />
      <div className="survCnt">
        <div className="header">
          <span className="tit">Recommendation Workation Area</span>
          <span className="exp">Do a test and get recommendations for areas that fit your tendencies (Select one)</span>
        </div>
        <div className="content">
          <Container>
            <Box>
              <div className="questionStep">
                {step + 1} 
                <span>/ {questions.length}</span>
              </div>
              {renderQuestion()}
              <Box className="stepBtnCnt">
                <button 
                  className="backBtn" 
                  onClick={handleBack} 
                  disabled={step === 0} 
                  onMouseOver={(e) => {
                    step === 0
                      ? (e.target.style.color = '#E1E4E9')
                      : (e.target.style.color = '#000');
                  }}
                  onMouseOut={(e) => {
                    e.target.style.color = ''; // 마우스가 벗어났을 때 원래 색상으로 복귀
                  }}
                >
                  Before
                </button>
                <button className="nextBtn" onClick={handleNext}>
                  {step === questions.length - 1 ? "Submit" : "Next"}
                </button>
              </Box>
            </Box>
          </Container>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    boxSizing: 'border-box',
    minHeight: '100vh',
  },
  innerContainer: {
    textAlign: 'center',
    paddingTop: '20px',
    background: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '30px',
    width: '100%',
    maxWidth: '600px',
    marginTop: '100px',  
  },
  button: {
    margin: '5px',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 20px',
    cursor: 'pointer',
    transition: 'background-color 0.3s, transform 0.3s',
  },
  navButton: {
    margin: '0 10px', // 버튼 사이에 간격 추가
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    padding: '10px', // 고정된 높이
    width: '80px', // 고정된 너비
    transition: 'background-color 0.3s, transform 0.3s',
  },
  navigationButtons: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center', // 버튼을 가운데 정렬
  },
  progressBar: {
    width: '100%',
    height: '10px',
    backgroundColor: '#e0e0e0',
    borderRadius: '5px',
    marginTop: '20px',
  },
  progress: {
    height: '100%',
    backgroundColor: '#007bff',
    borderRadius: '5px',
  }
};
