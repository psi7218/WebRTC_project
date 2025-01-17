import ChattingUpperDiv from "./ChattingUpperDiv";

const ChattingMainDiv = ({ participantsData }) => {
  return (
    <div className="p-5">
      <ChattingUpperDiv participantsData={participantsData} />
    </div>
  );
};

export default ChattingMainDiv;
