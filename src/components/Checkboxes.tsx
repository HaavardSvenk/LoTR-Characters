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
      &emsp;
      <input
        type="checkbox"
        className="Human"
        value="Human"
        onClick={handleOnClick}
      />
      <label htmlFor="Human">Human</label>
      &emsp;
      <input
        type="checkbox"
        className="Hobbit"
        value="Hobbit"
        onClick={handleOnClick}
      />
      <label htmlFor="Hobbit">Hobbit</label>
      &emsp;
      <input
        type="checkbox"
        className="Dwarf"
        value="Dwarf"
        onClick={handleOnClick}
      />
      <label htmlFor="Dwarf">Dwarf</label>
      &emsp;
      <input
        type="checkbox"
        className="Orc"
        value="Uruk-hai,Orc"
        onClick={handleOnClick}
      />
      <label htmlFor="Orc">Orc</label>
    </div>
  );
};

export default Checkboxes;
