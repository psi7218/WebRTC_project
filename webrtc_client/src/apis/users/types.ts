// 패스워드까진 필요 없지 않을까?
export interface Users {
  userId: number;
  username: string;
  email: string;
  password: string;
  profileImage: string;
  friendIds: number[];
}

export interface loginProps {
  email: string;
  password: string;
}
