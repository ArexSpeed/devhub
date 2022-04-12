import { SearchIcon } from './Icons/FontIcons';

const SearchBox = ({ searchValue, setSearchValue, placeholder }) => {
  return (
    <div className="searchbox">
      <div className="searchbox__icon">
        <SearchIcon className="icon-medium secondary-blue" />
      </div>
      <input
        type="text"
        className="searchbox__input"
        placeholder={placeholder}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </div>
  );
};

export default SearchBox;
