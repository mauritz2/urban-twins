import React, { useState } from 'react';

const cities = [
    "New York",
    "Newark",
    "Stockholm",
    "Paris",
    "Nice",
    "Sarajevo",
    "Prague"
]

const SearchBox = ({ placeholder, label}) => {
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const handleChange = (event) => {
        const value = event.target.value;
        setInputValue(value);

        if (value.length > 0) {
            const filteredSuggestions = cities.filter(city =>city.toLowerCase().startsWith(value.toLowerCase())
            );   
            setSuggestions(filteredSuggestions);
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setInputValue(suggestion);
        setSuggestions([]);
    };

    return (
        <div>
            <label htmlFor="search-box">{label}</label>
            <input
                type="text"
                placeholder={placeholder}
                value={inputValue}
                onChange={handleChange}
            />
           {suggestions.length > 0 && (
            <ul className="suggestions-list">
                {suggestions.map((suggestion, index) => (
                    <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                        {suggestion}
                    </li>
                ))}
            </ul>
           )}
        </div>
    );
};

export default SearchBox;