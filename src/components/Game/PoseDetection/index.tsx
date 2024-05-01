import React, { useRef, useEffect, useState } from "react";
import * as S from "./style";
import * as tf from "@tensorflow/tfjs";
import * as posenet from "@tensorflow-models/posenet";
import { drawKeypoints, drawSkeleton } from "@/utils/draw/index";
import DummyQuestion from "@/components/Game/DummyQuestion/index";

interface PoseDetectionProps {
  deviceId: string;
}

interface Position {
  top: number;
  left?: number;
  right?: number;
  show: boolean;
}

interface KeypointWithPosition extends posenet.Keypoint {
  position: { x: number; y: number };
}

const PoseDetection: React.FC<PoseDetectionProps> = ({ deviceId }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [positions, setPositions] = useState<{
    answer1: Position;
    answer2: Position;
  }>({
    answer1: { top: 0, left: 20, show: false },
    answer2: { top: 0, right: 20, show: false },
  });
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questions] = useState([
    "임신기간은 성관계 한 날로부터 40주(280일)이다.",
    "경구피임약 복용시, 기형아를 낳을 확률이 높다.",
    "드로즈 팬타는 정자 활성을 높인다.",
    "레깅스의 장시간 착용은 생리통을 유발할 수 있다.",
    "가벼운 운동으로 생리통을 예방할 수 있다.",
    "생리중에 반신욕을 하면 몸에 좋다.",
  ]);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [lastDetectionTime, setLastDetectionTime] = useState(0);

  useEffect(() => {
    const runPoseDetection = async () => {
      await tf.setBackend("webgl");

      const video = videoRef.current;
      const canvas = canvasRef.current;

      if (video && canvas) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { deviceId: { exact: deviceId } },
        });
        video.srcObject = stream;

        const net = await posenet.load();

        video.onloadedmetadata = async () => {
          video.play();
          const { videoWidth, videoHeight } = video;
          canvas.width = videoWidth;
          canvas.height = videoHeight;

          setPositions({
            answer1: { top: 0, left: 20, show: true },
            answer2: { top: 0, right: 20, show: true },
          });

          const poseDetectionFrame = async () => {
            try {
              //@ts-ignore
              const poses = await net.estimatePoses(video, {
                flipHorizontal: false,
                maxDetections: 1,
              });

              const ctx = canvas.getContext("2d");
              if (ctx) {
                ctx.clearRect(0, 0, videoWidth, videoHeight);
                poses.forEach((pose) => {
                  drawKeypoints(
                    pose.keypoints as KeypointWithPosition[],
                    0.6,
                    ctx
                  );
                  drawSkeleton(
                    pose.keypoints as KeypointWithPosition[],
                    0.6,
                    ctx
                  );

                  const currentTime = Date.now();
                  if (currentTime - lastDetectionTime >= 30000) {
                    // 30 seconds have passed since the last detection
                    setLastDetectionTime(currentTime + 20000); // Add 20 seconds

                    const answer1Box = document.querySelector(".answer1-box");
                    const answer2Box = document.querySelector(".answer2-box");
                    if (answer1Box && answer2Box) {
                      const answer1Rect = answer1Box.getBoundingClientRect();
                      const answer2Rect = answer2Box.getBoundingClientRect();

                      if (isDumbbellCurlPoseDetected(pose, "right")) {
                        console.log("yes");
                        handleAnswerSelection("yes");
                      } else if (isDumbbellCurlPoseDetected(pose, "left")) {
                        console.log("no");
                        handleAnswerSelection("no");
                      } else {
                        console.log("선택 안함");
                      }
                      // 웹 캠 화면의 바닥에 닿았는지 확인
                      if (answer1Rect.top >= 605 && answer2Rect.top >= 605) {
                        resetElementPositions();
                        goToNextQuestion();
                      }
                    }
                  }
                });
              } else {
                console.error("Canvas context not available!");
              }
            } catch (error) {
              console.error("Pose detection error:", error);
            }

            requestAnimationFrame(poseDetectionFrame);
          };

          poseDetectionFrame();
        };
      }
    };

    runPoseDetection();
  }, [deviceId]);

  useEffect(() => {
    const animateDown = () => {
      setPositions((prevPositions) => ({
        ...prevPositions,
        answer1: {
          ...prevPositions.answer1,
          top: prevPositions.answer1.top + 1,
        },
        answer2: {
          ...prevPositions.answer2,
          top: prevPositions.answer2.top + 1,
        },
      }));
    };

    const animationId = setInterval(animateDown, 5);

    return () => clearInterval(animationId);
  }, []);

  useEffect(() => {
    if (questionIndex > 5) {
      setShowScore(true);
    }
  }, [questionIndex]);

  const resetElementPositions = () => {
    // 웹 캠 화면의 바닥에 닿으면 요소의 위치를 초기화하여 맨 위로 올림
    setPositions({
      answer1: { top: 0, left: 20, show: true },
      answer2: { top: 0, right: 20, show: true },
    });
  };
  const goToNextQuestion = () => {
    setQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handleAnswerSelection = (selectedAnswer: string) => {
    // 해당 답이 맞는지 여부 확인
    const isCorrect = selectedAnswer === "yes"; // 예시로 answer1이 정답일 때를 가정

    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }
    goToNextQuestion();
  };

  const isDumbbellCurlPoseDetected = (pose: posenet.Pose, side: string) => {
    const keyPoints = pose.keypoints as KeypointWithPosition[];

    // 필요한 관절들을 찾음
    const elbow = keyPoints.find((kp) => kp.part === `${side}Elbow`);
    const shoulder = keyPoints.find((kp) => kp.part === `${side}Shoulder`);
    const wrist = keyPoints.find((kp) => kp.part === `${side}Wrist`);

    if (
      elbow &&
      shoulder &&
      wrist &&
      elbow.score > 0.8 &&
      shoulder.score > 0.8 &&
      wrist.score > 0.8
    ) {
      // 팔꿈치, 어깨, 손목이 검출되었고 신뢰도가 일정 수준 이상일 경우
      // 덤벨 컬 동작 판단을 위한 기준 값을 설정
      const elbowShoulderDistance = Math.sqrt(
        Math.pow(elbow.position.x - shoulder.position.x, 2) +
          Math.pow(elbow.position.y - shoulder.position.y, 2)
      );
      const elbowWristDistance = Math.sqrt(
        Math.pow(elbow.position.x - wrist.position.x, 2) +
          Math.pow(elbow.position.y - wrist.position.y, 2)
      );

      // 팔이 완전히 폈다고 판단하기 위한 각도 계산
      const elbowShoulderAngle = Math.atan2(
        shoulder.position.y - elbow.position.y,
        shoulder.position.x - elbow.position.x
      );
      const wristElbowAngle = Math.atan2(
        wrist.position.y - elbow.position.y,
        wrist.position.x - elbow.position.x
      );
      const angleDiff = Math.abs(elbowShoulderAngle - wristElbowAngle);

      // 팔이 완전히 평타운 상태에서 덤벨 컬 동작이 종료되는 상황을 판별
      if (elbowShoulderDistance > elbowWristDistance && angleDiff < 0.4) {
        return true;
      }
    }
    return false;
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "55%",
        transform: "scaleX(-1)",
      }}
    >
      <video
        ref={videoRef}
        width="100%"
        height="100%"
        style={{
          top: 0,
          left: 0,
          position: "relative",
        }}
      />

      {!showScore && (
        <>
          <div
            style={{
              display: positions.answer1.show ? "flex" : "none",
              alignContent: "center",
              justifyContent: "center",
              textAlign: "center",
              margin: 0,
            }}
          >
            <DummyQuestion question={questions[questionIndex]} />
          </div>
          <S.Box1
            className="answer1-box"
            style={{
              top: positions.answer1.top,
              left: positions.answer1.left || 0,
              display: positions.answer1.show ? "" : "none",
              transform: "scaleX(-1)",
            }}
          >
            <S.InnerBox>answer1</S.InnerBox>
          </S.Box1>
          <S.Box2
            className="answer2-box"
            style={{
              top: positions.answer2.top,
              right: positions.answer2.right || 0,
              display: positions.answer2.show ? "" : "none",
              transform: "scaleX(-1)",
            }}
          >
            <S.InnerBox>answer2</S.InnerBox>
          </S.Box2>
        </>
      )}

      {showScore && (
        <div
          style={{
            position: "absolute",
            top: "1rem",
            transform: "scaleX(-1)",
            backgroundColor: "white",
            padding: "3rem 7rem 3rem 7rem",
            fontSize: "250%",
            fontWeight: 600,
          }}
        >
          <h2>점수: {score}</h2>
        </div>
      )}

      <canvas
        ref={canvasRef}
        width="100%"
        height="100%"
        style={{
          position: "absolute",
          top: "-10%",
          left: "3%",
          width: "600%",
          height: "auto",
        }}
      />
    </div>
  );
};

export default PoseDetection;
