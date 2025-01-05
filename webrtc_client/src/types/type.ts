import { bgcolors } from "@/dummydata/data";

export interface Friend {
  id: number;
  name: string;
  thumbnail: string;
  status: "online" | "offline" | "away";
  logo_color: BgColorType;
}

export type BgColorType = keyof typeof bgcolors;

interface ChannelProps {
  id: number;
  name: string;
  type: "chatting" | "voice";
}
export interface ServerProps {
  id: number;
  name: string;
  serverAdmin: number;
  image: string;
  channels: ChannelProps[];
}
