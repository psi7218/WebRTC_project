import axiosInstance from "../instance/axiosInstance";

export const sendMessage = async () => {
  try {
    const response = await axiosInstance.post(`messages/`);
    return response.data;
  } catch (e) {
    throw e;
  }
};

export const getChannelMessages = async (channelId: number) => {
  try {
    const response = await axiosInstance.get(`messages/channel/${channelId}`);
    return response.data;
  } catch (e) {
    throw e;
  }
};
