import React, { useState } from 'react';

function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const response = await fetch(`http://127.0.0.1:8000/search/?query=${query}`);
    const data = await response.json();
    setResults(data.results);
  };

  return (
    <div className="container">
      <h1>Search Products</h1>
      <input
        type="text"
        placeholder="Search for products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
      />
      {results.map((product, index) => (
        <div className="product" key={index}>
          {product}
        </div>
      ))}
    </div>
  );
}

export default SearchPage;
