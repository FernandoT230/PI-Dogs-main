import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getDogsByName } from '../../redux/actions';
import style from './searchbar.module.css';

export default function SearchBar() {
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState("");
  
    const handleSearch = (event) => {
      event.preventDefault();
      dispatch(getDogsByName(searchTerm));
    };
  
    return (
      <div>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search by name"
          />
          <button type="submit">Search</button>
        </form>
      </div>
    );
  }