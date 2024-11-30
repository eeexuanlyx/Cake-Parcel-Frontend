import React from "react";

const Search = (props) => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-center items-center mb-0">
        <input
          type="text"
          value={props.searchTerm}
          onChange={props.handleSearch}
          placeholder="Search for your favourite designs"
          className="w-full md:w-1/2 p-2 border rounded"
        />

        <select
          value={props.filterType}
          onChange={props.handleFilterChange}
          className="p-2 border rounded ml-4"
        >
          <option value="">All Types</option>
          <option value="Custom Cakes">Custom Cakes</option>
          <option value="Cupcakes">Cupcakes</option>
          <option value="Bento Cakes">Bento Cakes</option>
        </select>
      </div>
    </div>
  );
};

export default Search;
