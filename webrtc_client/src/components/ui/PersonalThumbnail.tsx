import Image from "next/image";

import white_logo from "../../../public/assets/discord-mark-white.png";
import { BgColorType } from "@/types/type";

interface PersonalThumbnailProps {
  logo_color: BgColorType;
  thumbnail: string;
}

const PersonalThumbnail: React.FC<PersonalThumbnailProps> = ({
  logo_color,
  thumbnail,
}) => {
  return (
    <div
      style={{ backgroundColor: logo_color }}
      className={`rounded-full w-9 h-9 flex justify-center items-center overflow-hidden`}
    >
      {thumbnail && thumbnail.length > 0 ? (
        <Image
          src={thumbnail}
          alt="프로필 이미지"
          width={24}
          height={24}
          className="object-cover w-full h-full"
        />
      ) : (
        <Image src={white_logo} alt="기본 로고" className="w-6 h-4" />
      )}
    </div>
  );
};

export default PersonalThumbnail;
