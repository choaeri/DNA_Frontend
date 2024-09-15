const questions = [
  {
    question: "What is your gender?",
    options: [
      "Male",
      "Female", 
    ],
    type: "horizontal"
  },
  {
    question: "What is your age?",
    type: "input"
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
    ],
    type: "vertical"
  },
  {
    question: "How many people are you planning to travel with on your workation in Korea?",
    type: "input"
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
    ],
    type: "vertical"
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
    ],
    type: "vertical"
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
    ],
    type: "vertical"
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
    ],
    type: "vertical"
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
    ],
    type: "vertical"
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
    ],
    type: "vertical"
  },
];

export { questions };