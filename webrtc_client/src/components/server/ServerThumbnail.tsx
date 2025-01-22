import Image from "next/image";

interface ServerThumbnailProps {
  server: any;
  isActive: boolean;
  onClick: () => void;
}

const serverThumbnail = ({
  server,
  isActive,
  onClick,
}: ServerThumbnailProps) => {
  return (
    <div className="group relative">
      <span onClick={onClick}>
        {server.image ? (
          <Image
            src={server.image}
            alt={server.serverName}
            className="w-12 h-12 object-cover rounded-full overflow-hidden transition-all"
            width={14}
            height={14}
            unoptimized
          />
        ) : (
          <div
            className={`w-12 h-12 text-white overflow-hidden whitespace-nowrap flex items-center justify-center transition-all duration-200
            ${
              isActive
                ? "bg-blue-500 rounded-2xl"
                : "bg-[#363940] rounded-full group-hover:rounded-2xl group-hover:bg-blue-500"
            }`}
          >
            {server.serverName}
          </div>
        )}
      </span>

      <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 hidden group-hover:block">
        <div className="relative">
          <div className="absolute right-full top-1/2 -translate-y-1/2 border-8 border-transparent border-r-[#18191c]" />

          <div className="bg-[#18191c] text-white px-3 py-2 rounded-md whitespace-nowrap text-sm">
            {server.serverName}
          </div>
        </div>
      </div>
    </div>
  );
};

export default serverThumbnail;
