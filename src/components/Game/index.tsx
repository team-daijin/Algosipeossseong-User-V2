"use client";
import { useState, useEffect } from "react";
import Webcam from "react-webcam";
import PoseDetection from "@/components/Game/PoseDetection/index";
const Game = () => {
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<
    string | undefined
  >();

  useEffect(() => {
    // 웹 캠 장치 목록 가져오기
    const getDevices = async () => {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(
        (device) => device.kind === "videoinput"
      );
      setDevices(videoDevices);
      if (videoDevices.length > 0) {
        setSelectedDeviceId(videoDevices[0].deviceId);
      }
    };

    getDevices();
  }, []);

  const handleDeviceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDeviceId(event.target.value);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">웹 캠 입력 기기 선택</h1>
      <select
        className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
        onChange={handleDeviceChange}
        value={selectedDeviceId || ""}
      >
        {devices.map((device) => (
          <option key={device.deviceId} value={device.deviceId}>
            {device.label}
          </option>
        ))}
      </select>
      {selectedDeviceId && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">선택한 웹 캠</h2>
          <div className="w-full h-auto border border-gray-300 rounded-lg overflow-hidden">
            <PoseDetection deviceId={selectedDeviceId} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Game;
