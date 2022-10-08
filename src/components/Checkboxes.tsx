import React from "react";

interface IOwnProps {
  handleOnClick: (e: any) => void;
}

const Checkboxes = ({ handleOnClick }: IOwnProps) => {
  return (
    <div>
      <input
        type="checkbox"
        className="Elf"
        value="Elf"
        onClick={handleOnClick}
      />
      <label htmlFor="Elf">Elf</label>
    </div>
  );
};

export default Checkboxes;
