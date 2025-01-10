import axiosInstance from "./axiosInstance";

interface loginProps {
  email: string;
  password: string;
}
export const login = async (loginProps: loginProps) => {
  try {
    const response = await axiosInstance.post("users/login", loginProps);
    return response.data;
  } catch (e) {
    console.log("오류", e);
    throw e;
  }
};
