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

export const createDMChannel = async (userId: number) => {
  try {
    const response = await axiosInstance.post(`channels/dm/${userId}`);
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
