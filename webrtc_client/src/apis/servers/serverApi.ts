import axios from "axios";
import axiosInstance from "../instance/axiosInstance";

interface serverDataProps {
  serverName: string;
  serverThumbnail: string | null;
  serverAdminId: number;
}
export const createServer = async (serverData: serverDataProps) => {
  try {
    const response = await axiosInstance.post(`servers`, serverData);
    return response.data;
  } catch (e) {
    throw e;
  }
};

export const getAllServers = async () => {
  try {
    const response = await axiosInstance.get(`servers`);
    return response.data;
  } catch (e) {
    throw e;
  }
};

export const getServersByUserId = async (userId: number) => {
  try {
    const response = await axiosInstance.get(`servers/user/${userId}`);
    return response.data;
  } catch (e) {
    throw e;
  }
};

export const deleteServer = async (serverId: number) => {
  try {
    const response = await axiosInstance.delete(`servers/${serverId}`);
    return response.data;
  } catch (e) {
    throw e;
  }
};

export const getServerById = async (serverId: number) => {
  try {
    const response = await axiosInstance.get(`servers/${serverId}`);
    return response.data;
  } catch (e) {
    throw e;
  }
};

export const subscribeToServerEvents = async (userId: number) => {
  try {
    const response = await axiosInstance.get(`servers/subscribe/${userId}`);
    return response.data;
  } catch (e) {
    throw e;
  }
};

export const inviteUserToServer = async (userId: number, serverId: number) => {
  try {
    const response = await axiosInstance.post(
      `servers/${serverId}/invite/${userId}`
    );
    return response.data;
  } catch (e) {
    throw e;
  }
};

export const acceptServerInvitation = async (
  userId: number,
  serverId: number
) => {
  try {
    const response = await axiosInstance.post(
      `servers/${serverId}/accept/${userId}`
    );
    return response.data;
  } catch (e) {
    throw e;
  }
};
