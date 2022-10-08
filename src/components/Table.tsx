import React from "react";
import { iCharacter } from "../App";

interface IOwnProps {
  characters: Array<iCharacter>;
  loading: boolean;
  handleSortClick: () => void;
  asc: boolean;
  search: string;
}

function Table({
  characters,
  loading,
  handleSortClick,
  asc,
  search,
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
            <tr>
              <td key={character.id}>{character.name}</td>
              <td key={character.id}>{character.race}</td>
              <td key={character.id}>{character.gender}</td>
              <td key={character.id}>
                <a href={character.wikiUrl} target="_blank" rel="noreferrer">
                  Learn more about {character.name} at LoTR Wiki
                </a>
              </td>
              <td key={character.id}>{character.birth}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default Table;
