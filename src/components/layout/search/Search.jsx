import React from "react";
import SearchIcon from "../../../assets/images/search.svg";
import { setSearch } from "../../../redux/home/home-action";
import { useDispatch, useSelector } from "react-redux";

const Search = () => {
  const dispatch = useDispatch();
  const { search } = useSelector((state) => state.home);
  const changeSearch = (e) => {
    dispatch(setSearch(e.target.value));
  };

  return (
    <div>
      <img
        alt=""
        className="absolute right-3 top-0 bottom-1 mt-2 "
        src={SearchIcon}
      />
      <input
        onChange={changeSearch}
        value={search}
        className="bg-search-color h-10 w-full rounded-full  pr-11  text-black"
        type="text"
        placeholder=""
      />
    </div>
  );
};

export default Search;
