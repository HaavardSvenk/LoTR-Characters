interface IOwnProps {
  handleSearchChange: (e: any) => void;
}

const SearchBar = ({ handleSearchChange }: IOwnProps) => {
  return (
    <form className="searchBar">
      <input
        className="input"
        onChange={handleSearchChange}
        placeholder="Search characters"
      />
    </form>
  );
};

export default SearchBar;
