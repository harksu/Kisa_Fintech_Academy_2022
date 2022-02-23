import React from "react";

const SearchInput = ({ handleChange, handleClick }) => { // 그래서 여기서 받는거임 
    return (
        <div>
            <input onChange={handleChange}></input>
            <button onClick={handleClick}>검색</button>
        </div>
    );
};

export default SearchInput;
