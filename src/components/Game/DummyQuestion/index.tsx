import React from "react";

interface DummyQuestionProps {
  question: string;
}

const DummyQuestion: React.FC<DummyQuestionProps> = ({ question }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: "1rem",
        transform: "scaleX(-1)",
        fontSize: "200%",
        fontWeight: 600,
        backgroundColor: "white",
        padding: "2rem 3rem 2rem 3rem",
      }}
    >
      <h2>Q. {question}</h2>
    </div>
  );
};

export default DummyQuestion;
