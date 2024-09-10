// import React, {useState, useEffect, useCallback} from 'react'

// const SearchComponent = () => {
//   return (
//     <div>SearchComponent</div>
//   )
// }

// export default SearchComponent


import React, { useState, useEffect, useCallback } from 'react';


const fetchResults = (query) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const data = ["apple", "banana", "apricot", "grape", "orange", "application"];
            const results = data.filter(item => item.toLowerCase().includes(query.toLowerCase()));
            resolve(results);
        }, 1000); 
    });
};

// Debounce hook
const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
};

const SearchComponent = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const debouncedQuery = useDebounce(query, 500);

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    useEffect(() => {
        if (debouncedQuery) {
            fetchResults(debouncedQuery).then(setResults);
        } else {
            setResults([]);
        }
    }, [debouncedQuery]);

    return (
        <div>
            <h1>Search:</h1>
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Enter text"
            />
            <ul>
                {results.map((result, index) => (
                    <li key={index}>{result}</li>
                ))}
            </ul>
        </div>
    );
};

export default SearchComponent;