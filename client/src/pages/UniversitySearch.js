import React, { useState } from 'react';

function UniversitySearch() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // Add search logic here
  };

  return (
    <div className="university-search">
      <h2>Search Universities</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search by university name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default UniversitySearch;
