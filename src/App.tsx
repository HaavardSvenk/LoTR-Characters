import React, { useEffect, useState } from "react";
import Table from "./components/Table";
import axios from "axios";
import "./App.css";
import ReactPaginate from "react-paginate";
import SearchBar from "./components/SearchBar";
import Checkboxes from "./components/Checkboxes";

const headers = {
  Accept: "application/json",
  Authorization: "Bearer Jd_gpfWUgD1E6rTHJ99Z",
};

export interface iCharacter {
  id: string;
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
  const [totalCharacters, setTotalCharacters] = useState<number>(0);
  const [asc, setAsc] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [url, setUrl] = useState<string>(
    "https://the-one-api.dev/v2/character?race="
  );

  useEffect(() => {
    getCharacters();
    fetchTotalCharacters(url);
  }, [displayLimit]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchCharacters = async (currentPage: number, newUrl: string = url) => {
    const res = await axios.get(
      `${newUrl}&limit=${displayLimit}&page=${currentPage}`,
      {
        headers: headers,
      }
    );
    return (res.data.docs as Array<iCharacter>).sort((a, b) =>
      a.name > b.name ? 1 : -1
    );
  };

  const getCharacters = async () => {
    setLoading(true);
    const res = await axios.get(`${url}&limit=${displayLimit}&page=1`, {
      headers: headers,
    });
    setCharacters(
      (res.data.docs as Array<iCharacter>).sort((a, b) =>
        a.name > b.name ? 1 : -1
      )
    );
    setLoading(false);
  };

  const fetchTotalCharacters = async (url: string) => {
    const res = await axios.get(url, {
      headers: headers,
    });
    setTotalCharacters(res.data.docs.length);
  };

  const handlePageClick = async (data: { selected: number }) => {
    let currentPage = data.selected + 1;
    console.log(data.selected);

    const charactersFromApi = await fetchCharacters(currentPage);

    setCharacters(charactersFromApi);
    setAsc(true);
  };

  const handleSortClick = () => {
    if (!asc) {
      setCharacters(characters.sort((a, b) => (a.name > b.name ? 1 : -1)));
    } else {
      setCharacters(characters.sort((a, b) => (a.name < b.name ? 1 : -1)));
    }
    setAsc(!asc);
  };

  const handleSearchChange = (e: any) => {
    setSearch(e.target.value);
  };

  const handleCheckbox = async (e: any) => {
    if (e.target.checked) {
      let newUrl = `${url}${e.target.value},`;
      fetchTotalCharacters(newUrl);
      setUrl(newUrl);
      setCharacters(await fetchCharacters(1, newUrl));
    } else {
      let newUrl = url.replace(`${e.target.value},`, "");
      fetchTotalCharacters(newUrl);
      setUrl(newUrl);
      setCharacters(await fetchCharacters(1, newUrl));
    }
  };

  return (
    <div className="App">
      <h1>LoTR Characters</h1>
      <SearchBar handleSearchChange={handleSearchChange} />
      <Checkboxes handleOnClick={handleCheckbox} />
      <Table
        characters={characters}
        loading={loading}
        handleSortClick={handleSortClick}
        asc={asc}
        search={search}
      />
      <ReactPaginate
        pageCount={Math.ceil(totalCharacters / displayLimit)}
        onPageChange={handlePageClick}
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
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
    </div>
  );
};

export default App;
