import axiosInstance from "../instance/axiosInstance";
import { loginProps } from "./types";

export const login = async (loginProps: loginProps) => {
  try {
    const response = await axiosInstance.post("users/login", loginProps);
    return response.data;
  } catch (e) {
    throw e;
  }
};

export const getAllUsers = async () => {
  try {
    const response = await axiosInstance.get(`/users`);
    return response.data;
  } catch (e) {
    throw e;
  }
};

export const searchUsers = async (keyword: string) => {
  try {
    const response = await axiosInstance.get(`/users/search`, {
      params: { keyword },
    });
    return response.data;
  } catch (e) {
    throw e;
  }
};

export const getUserById = async (userId: number) => {
  try {
    const response = await axiosInstance.get(`/users/${userId}`);
    return response.data;
  } catch (e) {
    throw e;
  }
};

export const addFriend = async (userId: number, friendId: number) => {
  try {
    const response = await axiosInstance.post(
      `api/users/${userId}/friends/${friendId}`
    );
    return response.data;
  } catch (e) {
    throw e;
  }
};
