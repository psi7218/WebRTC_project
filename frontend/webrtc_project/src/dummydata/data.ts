import { Friend } from "@/types/type";

export const channels = [
  {
    id: 1,
    name: "channel123123123",
    image: "https://ifh.cc/g/bXNGqc.png",
  },
  {
    id: 2,
    name: "channel2",
    image: "https://ifh.cc/g/vBlsty.png",
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
