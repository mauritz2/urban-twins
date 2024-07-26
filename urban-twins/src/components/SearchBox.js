import React from 'react';

const SearchBox = ({ placeholder, label}) => {
    const handleSearch = (event) => {
        // Handle search logic here
    };

    return (
        <div>
            <label htmlFor="search-box">{label}</label>
            <input id="search-box" type="text" placeholder={placeholder} onChange={handleSearch} />
            {/* Add any additional elements or logic here */}
        </div>
    );
};

export default SearchBox;