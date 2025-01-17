import axiosInstance from "../instance/axiosInstance";

export const createServer = async () => {
  try {
    const response = await axiosInstance.post(`servers/`);
    return response.data;
  } catch (e) {
    throw e;
  }
};
