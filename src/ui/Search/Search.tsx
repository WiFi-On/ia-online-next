import Input from "../InputText/Input";

const Search = ({ handleSearchChange, SearchText }: SearchProps) => {
  return (
    <div>
      <Input onChange={handleSearchChange} placeholder="Имя, город и тд." />
      <div></div>
    </div>
  );
};

export default Search;
