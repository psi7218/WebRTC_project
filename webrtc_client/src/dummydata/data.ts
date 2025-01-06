import { Friend } from "@/types/type";
import { ServerProps } from "@/types/type";

export const servers: ServerProps[] = [
  {
    serverId: 1,
    serverName: "channel123123123",
    serverAdmin: 231124112, // todo: 관리자 한명으로 했지만 추후에 권한을 가진 사람들로 변경
    image: "https://ifh.cc/g/bXNGqc.png",
    channels: [
      {
        channelId: 1,
        name: "channel1",
        type: "chatting",
      },
      {
        channelId: 2,
        name: "channel2",
        type: "voice",
      },
    ],
  },
  {
    serverId: 2,
    serverName: "channel2",
    serverAdmin: 24112,
    image: "https://ifh.cc/g/vBlsty.png",
    channels: [
      {
        channelId: 3,
        name: "channel3",
        type: "chatting",
      },
      {
        channelId: 4,
        name: "channel4",
        type: "voice",
      },
    ],
  },
];

export const friends: Friend[] = [
  {
    id: 1,
    name: "friend1",
    thumbnail: "https://ifh.cc/g/bXNGqc.png",
    status: "online",
    logo_color: "claret",
  },
  {
    id: 2,
    name: "friend2",
    thumbnail: "",
    status: "offline",
    logo_color: "blueviolet",
  },
  {
    id: 3,
    name: "friend3",
    thumbnail: "",
    status: "away",
    logo_color: "black",
  },
];
export const bgcolors = {
  claret: "bg-claret",
  blueviolet: "bg-blueviolet",
  green: "bg-green",
  yellow: "bg-yellow",
  red: "bg-red",
  black: "bg-black",
  white: "bg-white",
};
