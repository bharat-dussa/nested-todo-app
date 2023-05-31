import React from "react";

const PrimaryButton = ({
  setShowTodoModal,
  text,
}: {
  setShowTodoModal: (value: React.SetStateAction<boolean>) => void;
  text: string;
}) => {
  return (
    <button
      className="rounded-md bg-primary-600 py-2 px-5 text-white"
      onClick={() => setShowTodoModal(true)}
    >
      {text}
    </button>
  );
};

export default PrimaryButton;
