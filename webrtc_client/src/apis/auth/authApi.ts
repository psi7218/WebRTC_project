import axiosInstance from "../instance/axiosInstance";

interface signUpProps {
  email: string;
  password: string;
  username: string;
  profileColor: string;
}
export const signUp = async (signUpProps: signUpProps) => {
  try {
    const response = await axiosInstance.post(`users`, signUpProps);
    return response.data;
  } catch (e) {
    throw e;
  }
};

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

export const checkDuplicate = async (email: string) => {
  try {
    const response = await axiosInstance.get(
      `users/check-email?email=${email}`
    );
    return response.data;
  } catch (e) {
    throw e;
  }
};
