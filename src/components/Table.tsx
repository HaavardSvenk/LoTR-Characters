import React from "react";
import { iCharacter } from "../App";

interface IOwnProps {
  characters: Array<iCharacter>;
  loading: boolean;
  handleSortClick: () => void;
  asc: boolean;
  search: string;
  handleNameClick: (e: any) => void;
}

function Table({
  characters,
  loading,
  handleSortClick,
  asc,
  search,
  handleNameClick,
}: IOwnProps) {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th onClick={handleSortClick}>Name{asc ? "▲" : "▼"}</th>
          <th>Race</th>
          <th>gender</th>
          <th>wikiUrl</th>
          <th>birth</th>
        </tr>
      </thead>
      <tbody>
        {characters
          .filter((character) => {
            return character.name.toLowerCase().includes(search);
          })
          .map((character: iCharacter) => (
            <tr key={character._id}>
              <td
                onClick={() => handleNameClick(character)}
                style={{ cursor: "pointer" }}
              >
                {character.name}
              </td>
              <td>{character.race}</td>
              <td>{character.gender}</td>
              <td>
                {character.wikiUrl ? (
                  <a href={character.wikiUrl} target="_blank" rel="noreferrer">
                    Learn more about {character.name} at LoTR Wiki
                  </a>
                ) : (
                  `No wiki page for ${character.name}`
                )}
              </td>
              <td>{character.birth}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default Table;
