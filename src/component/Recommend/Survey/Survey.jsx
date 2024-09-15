import React, { useState, useContext } from 'react';
import Header from "../../Header/Header";
import { AppContext } from "../../../context/AppContext";
import { axiosInstance } from "../../../common/func/axios";
import { notification, Spin } from "antd";
import { FrownOutlined, SmileOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const questions = [
  {
    question: "What is your gender?",
    options: [
      "Male",
      "Female", 
    ]
  },
  {
    question: "What is your age?",
    options: [
      "Open-ended (Numbers only)"
    ]
  },
  {
    question: "What is your average monthly income? Please select the appropriate option below.",
    options: [
      "No income",
      "Less than 1 million KRW",
      "1 million ~ less than 2 million KRW",
      "2 million ~ less than 3 million KRW",
      "3 million ~ less than 4 million KRW",
      "4 million ~ less than 5 million KRW",
      "5 million ~ less than 6 million KRW",
      "6 million ~ less than 7 million KRW",
      "7 million ~ less than 8 million KRW",
      "8 million ~ less than 9 million KRW",
      "9 million ~ less than 10 million KRW",
      "10 million KRW or more"
    ]
  },
  {
    question: "How many people are you planning to travel with on your workation in Korea?",
    options: [
      "Open-ended (Numbers only)"
    ]
  },
  {
    question: "When traveling, do you prefer nature or the city?",
    options: [
      "Strongly prefer nature",
      "Prefer nature",
      "Slightly prefer nature",
      "Neutral",
      "Slightly prefer the city",
      "Prefer the city",
      "Strongly prefer the city"
    ]
  },
  {
    question: "Do you prefer new places or familiar places when traveling?",
    options: [
      "Strongly prefer new places",
      "Prefer new places",
      "Slightly prefer new places",
      "Neutral",
      "Slightly prefer familiar places",
      "Prefer familiar places",
      "Strongly prefer familiar places"
    ]
  },
  {
    question: "Do you prefer a comfortable but expensive trip or an inconvenient but cheap trip?",
    options: [
      "Strongly prefer a comfortable but expensive trip",
      "Prefer a comfortable but expensive trip",
      "Slightly prefer a comfortable but expensive trip",
      "Neutral",
      "Slightly prefer an inconvenient but cheap trip",
      "Prefer an inconvenient but cheap trip",
      "Strongly prefer an inconvenient but cheap trip"
    ]
  },
  {
    question: "During your travels, do you prefer relaxation/leisure or activities/experiences?",
    options: [
      "Strongly prefer relaxation/leisure",
      "Prefer relaxation/leisure",
      "Slightly prefer relaxation/leisure",
      "Neutral",
      "Slightly prefer activities/experiences",
      "Prefer activities/experiences",
      "Strongly prefer activities/experiences"
    ]
  },
  {
    question: "Do you prefer less-known destinations or well-known destinations?",
    options: [
      "Strongly prefer less-known destinations",
      "Prefer less-known destinations",
      "Slightly prefer less-known destinations",
      "Neutral",
      "Slightly prefer well-known destinations",
      "Prefer well-known destinations",
      "Strongly prefer well-known destinations"
    ]
  },
  {
    question: "How important is photography during your travels?",
    options: [
      "I think photography is not important",
      "I somewhat think photography is not important",
      "I think photography is slightly unimportant",
      "Neutral",
      "I think photography is slightly important",
      "I think photography is important",
      "I think photography is very important"
    ]
  },
];


export default function Survey() {
  const {errMessageCheck} = useContext(AppContext);
  const [currentQuestion, setCurrentQuestion] = useState(0);
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
  const [selectedOption, setSelectedOption] = useState(null); // 선택된 옵션 상태 추가
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); // 로딩중

  const handleOptionClick = (optionIndex) => {
    setSelectedOption(optionIndex); // 선택된 옵션 저장
    setDto((prevDto) => ({
      ...prevDto,
      [getDtoKey(currentQuestion)]: optionIndex + 1, // 정수형으로 DTO에 저장
    }));
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

  const handleNext = async () => {
    if (selectedOption === null) {
      notification.open({
        message: "Please select an option before proceeding.",
        icon: <FrownOutlined style={{ color: "#ff3333" }} />,
      });
      return;
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null); // 다음 질문으로 넘어갈 때 선택 초기화
    } else {

      setIsLoading(true);  // 로딩 시작

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
      } finally {
      
        setIsLoading(false);  // 로딩 종료
      
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption(null); // 이전 질문으로 돌아갈 때 선택 초기화
    }
  };


  return (
    <div className="Survey" style={styles.container}>
      <Header />
      <Spin 
        spinning={isLoading} 
        size="large" 
        tip={<div className="spinTip" style={{ fontWeight: 'bold', fontSize: '16px' }}>You are being recommended a workation area.<br />Please wait a moment.</div>}
      >
        <div style={styles.innerContainer}>
          <h1>Recommendation Workation Area</h1>
          <p>{`${currentQuestion + 1} / ${questions.length}`}</p>
          <div style={styles.progressBar}>
            <div style={{ ...styles.progress, width: `${((currentQuestion + 1) / questions.length) * 100}%` }} />
          </div>
          <h2>{questions[currentQuestion].question}</h2>
          <div>
            {questions[currentQuestion].options.map((option, index) => (
              <button 
                key={index} 
                onClick={() => handleOptionClick(index)} 
                style={{
                  ...styles.button,
                  backgroundColor: selectedOption === index ? '#007bff' : '#f0f0f0', // 선택된 버튼 색상 변경
                  color: selectedOption === index ? '#fff' : '#000' // 글자색 변경
                }}
              >
                {option}
              </button>
            ))}
          </div>
          <div style={styles.navigationButtons}>
            {currentQuestion > 0 && ( // 첫 질문에서 Previous 버튼 숨김
              <button onClick={handlePrevious} style={styles.navButton}>
                Previous
              </button>
            )}
            {currentQuestion === questions.length - 1 ? (
              <button onClick={handleNext} style={{ ...styles.navButton, backgroundColor: '#28a745' }}>Submit</button>
            ) : (
              <button onClick={handleNext} style={styles.navButton}>Next</button>
            )}
          </div>
        </div>
      </Spin>
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
