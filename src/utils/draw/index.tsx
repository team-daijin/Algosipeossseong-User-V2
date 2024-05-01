import * as posenet from "@tensorflow-models/posenet";

// [ 주어진 키포인트를 캔버스에 원으로 표시하는 함수 ]
export const drawKeypoints = (
  // 포즈의 키포인트 배열
  keypoints: posenet.Keypoint[],
  // 최소 신뢰도 임계값
  minConfidence: number,
  // 캔버스 컨텍스트
  ctx: CanvasRenderingContext2D,
  // 스케일 (옵션)
  scale: number = 1
): void => {
  // 원의 반지름을 조금 크게 설정
  const radius = 1.5 * scale;
  keypoints.forEach((keypoint: posenet.Keypoint) => {
    if (keypoint.score >= minConfidence) {
      // 최소 신뢰도 이상인 키포인트만 표시
      const { x, y } = keypoint.position;
      ctx.beginPath();
      // 키포인트 위치에 원 그리기
      ctx.arc(x * scale, y * scale, radius, 0, 2 * Math.PI);
      // 색상 설정
      ctx.fillStyle = "blue";
      // 채우기
      ctx.fill();
    }
  });
};

// [ 주어진 키포인트들을 연결하여 스켈레톤을 그리는 함수 ]
export const drawSkeleton = (
  // 포즈의 키포인트 배열
  keypoints: posenet.Keypoint[],
  // 최소 신뢰도 임계값
  minConfidence: number,
  // 캔버스 컨텍스트x
  ctx: CanvasRenderingContext2D,
  // 스케일 (옵션)
  scale: number = 1
): void => {
  // 선의 두께를 조금 두껍게 설정
  const lineWidth = 1.5 * scale;
  const adjacentKeyPoints = posenet.getAdjacentKeyPoints(
    keypoints,
    minConfidence
  ); // 연결할 키포인트 쌍 찾기

  adjacentKeyPoints.forEach(([keypointA, keypointB]) => {
    drawSegment(
      toTuple(keypointA.position),
      toTuple(keypointB.position),
      ctx,
      scale,
      lineWidth
    ); // 연결된 키포인트들을 선으로 연결하여 그리기
  });
};

// [ 포즈를 그릴 때 사용하는 튜플 형식으로 변환하는 함수 ]
const toTuple = ({ y, x }: { x: number; y: number }): [number, number] => {
  return [y, x];
};

// [ 두 점을 연결하는 선을 그리는 함수 ]
const drawSegment = (
  [ay, ax]: [number, number], // 시작점 좌표
  [by, bx]: [number, number], // 끝점 좌표
  ctx: CanvasRenderingContext2D, // 캔버스 컨텍스트
  scale: number, // 스케일
  lineWidth: number // 선의 두께
): void => {
  ctx.beginPath();
  ctx.moveTo(ax * scale, ay * scale); // 시작점으로 이동
  ctx.lineTo(bx * scale, by * scale); // 끝점까지 선 그리기
  ctx.lineWidth = lineWidth; // 선의 두께 설정
  ctx.strokeStyle = "blue"; // 선의 색상 설정
  ctx.stroke(); // 선 그리기
};
