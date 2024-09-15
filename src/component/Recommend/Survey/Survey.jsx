import { useState } from "react";
import Header from "../../Header/Header";
import './Survey.css';
import { Container, Box } from '@mui/material';

export default function Survey () {
  const questions = [
    {
      question: "What do you want to do the most during your trip",
      options: [
        "Shopping", "City Tour", "Plogging trip (eco-friendly)", "Visiting the filming location of the drama"
      ]
    },
    {
      question: "What do you want to do the most during your trip",
      options: [
        "소득 임금", "월급 100만원 미만", "월급 100만원 미만", "월급 100만원 미만", "월급 100만원 미만"
      ]
    },
    {
      question: "How many times do you travel in a year?",
      type: "input"
    }
  ];
  
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  
  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      console.log("Form completed", answers);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleAnswer = (answer) => {
    setAnswers(prevAnswers => {
      const currentAnswers = prevAnswers[step] || [];
      if (questions[step].type === "input") {
        return {
          ...prevAnswers,
          [step]: [answer]
        };
      } else {
        if (currentAnswers.includes(answer)) {
          return {
            ...prevAnswers,
            [step]: currentAnswers.filter(item => item !== answer)
          };
        } else {
          return {
            ...prevAnswers,
            [step]: [...currentAnswers, answer]
          };
        }
      }
    });
  };

  const renderQuestion = () => {
    const currentQuestion = questions[step];

    if (currentQuestion.type === "input") {
      return (
        <Box>
          <div className="question">
            {currentQuestion.question}
          </div>
          <input
            type="text"
            onChange={(e) => handleAnswer(e.target.value)}
            value={answers[step] || ""}
          />
        </Box>
      );
    }

    return (
      <Box>
        <div className="question">
          {currentQuestion.question}
        </div>
        <div className="quesBtnCnt">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              className="quesBtn"
              style={answers[step]?.includes(option) ? {backgroundColor: "black", color: "white"} : null}
              onClick={() => handleAnswer(option)}
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
};