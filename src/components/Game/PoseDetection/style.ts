import styled from "styled-components";

export const Box1 = styled.div`
  position: absolute;
  top: 10%;
  width: 20%;
  height: 100%;
  z-index: 1;
  left: 10%;
`;

export const Box2 = styled.div`
  position: absolute;
  top: 10%;
  width: 20%;
  height: 100%;
  z-index: 1;
  right: 10%;
`;

export const InnerBox = styled.div`
  height: 20%;
  border-radius: 30px;
  border: 4px solid black;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 200%;
  font-weight: 500;
`;
