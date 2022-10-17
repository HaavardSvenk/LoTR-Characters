/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useEffect, useState } from "react";
import Table from "./components/Table";
import axios from "axios";
import "./App.css";
import ReactPaginate from "react-paginate";
import SearchBar from "./components/SearchBar";
import Checkboxes from "./components/Checkboxes";
import ItemsPerPage from "./components/ItemsPerPage";
import Modal from "./components/Modal";

const headers = {
  Accept: "application/json",
  Authorization: "Bearer Jd_gpfWUgD1E6rTHJ99Z",
};

export interface iCharacter {
  _id: string;
  name: string;
  race: string;
  gender: string;
  wikiUrl: string;
  birth: string;
}

const App = () => {
  const [characters, setCharacters] = useState([] as Array<iCharacter>);
  const [loading, setLoading] = useState<boolean>(false);
  const [displayLimit, setDisplayLimit] = useState<number>(10);
  const [pages, setPages] = useState<number>(0);
  const [asc, setAsc] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [url, setUrl] = useState<string>(
    "https://the-one-api.dev/v2/character?race="
  );
  const [page, setPage] = useState<number>(1);
  const [opemModal, setOpenModal] = useState<boolean>(false);
  const [modalName, setModalName] = useState<string>("");
  const [modalQuote, setModalQuote] = useState<string>("");

  useEffect(() => {
    fetchCharacters();
  }, [displayLimit, page]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchCharacters = async (newUrl: string = url) => {
    const res = await axios.get(
      `${newUrl}&limit=${displayLimit}&page=${page}&sort=name:asc`,
      {
        headers: headers,
      }
    );
    setPages(res.data.pages);
    setCharacters(res.data.docs as Array<iCharacter>);
  };

  const fetchQuotes = async (id: string) => {
    const res = await axios.get(
      `https://the-one-api.dev/v2/character/${id}/quote`,
      {
        headers: headers,
      }
    );
    res.data.docs.length > 0
      ? setModalQuote(getRandom(res.data.docs).dialog)
      : setModalQuote("No quotes for this character");
  };

  const getRandom = (list: Array<any>) => {
    return list[Math.floor(Math.random() * list.length)];
  };

  const handleNameClick = (character: iCharacter) => {
    setOpenModal(true);
    setModalName(character.name);
    fetchQuotes(character._id);
  };

  const handlePageClick = async (data: { selected: number }) => {
    let currentPage = data.selected + 1;
    setPage(currentPage);

    setAsc(true);
  };

  const sortByName = (chars: Array<iCharacter>) => {
    return chars.sort((a, b) =>
      asc ? (a.name < b.name ? 1 : -1) : a.name > b.name ? 1 : -1
    );
  };

  const handleSortClick = () => {
    setCharacters(sortByName(characters));
    setAsc(!asc);
  };

  const handleSearchChange = (e: any) => {
    setSearch(e.target.value);
  };

  const handleCheckbox = async (e: any) => {
    if (e.target.checked) {
      let newUrl = `${url}${e.target.value},`;
      setUrl(newUrl);
      await fetchCharacters(newUrl);
    } else {
      let newUrl = url.replace(`${e.target.value},`, "");
      setUrl(newUrl);
      await fetchCharacters(newUrl);
    }
  };

  return (
    <div className="App">
      <h1>LoTR Characters</h1>
      <Modal
        open={opemModal}
        onClose={() => setOpenModal(false)}
        modalName={modalName}
        modalQuote={modalQuote}
      />
      <SearchBar handleSearchChange={handleSearchChange} />
      <Checkboxes handleOnClick={handleCheckbox} />
      <Table
        characters={characters}
        loading={loading}
        handleSortClick={handleSortClick}
        asc={asc}
        search={search}
        handleNameClick={handleNameClick}
      />
      <ReactPaginate
        pageCount={pages}
        onPageChange={handlePageClick}
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        marginPagesDisplayed={4}
        pageRangeDisplayed={5}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
      <ItemsPerPage setDisplayLimit={setDisplayLimit} />
    </div>
  );
};

export default App;
