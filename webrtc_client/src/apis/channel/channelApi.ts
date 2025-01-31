import axios from "axios";
import axiosInstance from "../instance/axiosInstance";

export const getAllChannels = async () => {
  try {
    const response = await axiosInstance.get("channels");
    return response.data;
  } catch (e) {
    throw e;
  }
};

export const createChattingChannel = async (serverId: number) => {
  try {
    const response = await axiosInstance.post(`channels/chatting/${serverId}`);
    return response.data;
  } catch (e) {
    throw e;
  }
};

export const createVoiceChannel = async (serverId: number) => {
  try {
    const response = await axiosInstance.post(`channels/voice/${serverId}`);
    return response.data;
  } catch (e) {
    throw e;
  }
};

export const createDMChannel = async (
  userId: number,
  participantIds: number[]
) => {
  try {
    const response = await axiosInstance.post(`channels/dm/${userId}`, {
      channelName: `DM Channel ${new Date().getTime()}`, // 임시 채널명 생성
      participantIds: participantIds,
    });
    return response.data;
  } catch (e) {
    throw e;
  }
};

// 2. 특정 서버의 모든 채널 조회
export const getChannelsByServer = async (serverId: number) => {
  try {
    const response = await axiosInstance.get(`channels/${serverId}`);
    return response.data;
  } catch (e) {
    throw e;
  }
};

// 채널id로 특정 채널 조회 -> dm 채널
export const getChannelById = async (channelId: number) => {
  try {
    const response = await axiosInstance.get(`channels/dm/${channelId}`);
    return response.data;
  } catch (e) {
    throw e;
  }
};

export const removeUserFromDMChannel = async (
  channelId: number,
  userId: number
) => {
  try {
    const response = await axiosInstance.delete(
      `channels/dm/${channelId}/users/${userId}`
    );
    return response.data;
  } catch (e) {
    throw e;
  }
};

export const connectingVoiceChannel = async (channelId: number) => {
  try {
    // 1. 세션 생성 - 경로 수정
    const sessionResponse = await axiosInstance.post("webrtc/sessions", {
      customSessionId: channelId.toString(), // channelId를 직접 사용
    });
    const sessionId = sessionResponse.data;

    // 2. 연결 토큰 생성 - 경로 수정
    const connectionResponse = await axiosInstance.post(
      `webrtc/sessions/${sessionId}/connections`,
      {
        // 필요한 경우 추가 connection properties를 여기에 설정
      }
    );

    return connectionResponse.data; // token string이 반환됨
  } catch (e) {
    console.error("Error connecting to voice channel:", e);
    throw e;
  }
};
