import { bgcolors } from "@/dummydata/data";

export interface Friend {
  id: number;
  name: string;
  thumbnail: string;
  status: "online" | "offline" | "away";
  logo_color: BgColorType;
}

export type BgColorType = keyof typeof bgcolors;
