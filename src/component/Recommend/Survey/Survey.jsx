import { useState } from "react";
import Header from "../../Header/Header";
import './Survey.css';
import { Container, Box, Input, TextField } from '@mui/material';
import { questions } from "./questions";
import { axiosInstance } from "../../../common/func/axios";
import { notification, Spin } from "antd";
import { FrownOutlined, SmileOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export default function Survey () {
  const [step, setStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // 로딩중
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
      setIsLoading(true);  // 로딩 시작
      try {
        await axiosInstance.post('/api/recommend/locations', dto);
        notification.open({
          message: "Thank you for completing the survey!",
          icon: <SmileOutlined style={{ color: "#108ee9" }} />,
        });
        navigate("/mypage/recommendAreas");
      } catch (error) {
        const {
          data: { errorMessage },
        } = error.response;

        notification.open({
          message: errorMessage,
          icon: <FrownOutlined style={{ color: "#ff3333" }} />,
        });
      } finally {
        setIsLoading(false);  // 로딩 종료
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
            <Input
              type="number"
              onChange={(e) => handleAnswer(Number(e.target.value))}
              style={{
                WebkitAppearance: 'none',
                MozAppearance: 'textfield'
              }}
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
      <Spin 
        spinning={isLoading} 
        size="large" 
        tip={<div className="spinTip" style={{ fontWeight: 'bold', fontSize: '16px' }}>You are being recommended a workation area.<br />Please wait a moment.</div>}
      >
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
                <div className="stepBar">
                  <div className="bar" style={{ width: `${((step + 1) / questions.length) * 100}%` }} />
                </div>
                {renderQuestion()}
                <Box className="stepBtnCnt">
                  <button 
                    className="backBtn" 
                    onClick={handleBack} 
                    disabled={step === 0} 
                    onMouseOver={(e) => {
                      step === 0
                        ? (e.target.style.color = '#676868')
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
      </Spin>
    </div>
  );
}