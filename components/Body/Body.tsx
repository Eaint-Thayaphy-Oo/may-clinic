"use client";

import React, { useState, useEffect } from "react";
import styles from "./Body.module.css";
import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import Create from "../Create/Create";
import List from "../List/List";
import SearchBar from "../Search/SearchBar";

export default function Body() {
  const [show, setShow] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState(
    "rgba(255, 255, 255,1)"
  );

  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  //for status and breed
  const [statusFilter, setStatusFilter] = useState("all");
  const [breedFilter, setBreedFilter] = useState("all");

  const updateSearchResults = () => {
    const filteredPets = items.filter((item) => {
      return (
        (statusFilter === "all" || item.status === statusFilter) &&
        (breedFilter === "all" || item.breed === breedFilter)
      );
    });

    return filteredPets;
  };

  const handleButtonClick = () => {
    setShow(true);

    setBackgroundColor("rgba(255, 255, 255,0.5)");
  };

  useEffect(() => {
    fetch("http://localhost:8000/items")
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
        setFilteredItems(data);
      });
  }, []);

  const handleSearch = (query) => {
    const filtered = items.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  return (
    <>
      <div className={styles.container} style={{ backgroundColor }}>
        <div className={styles.block}>
          <div className={styles.firstblock}>
            <div>
              <h2 className={styles.header}>Patient List</h2>
              <SearchBar onSearch={handleSearch} />
            </div>
            <div className={styles.select}>
              <select
                className={styles.selectone}
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">Status All</option>
                <option value="allergy">allergy</option>
                <option value="picky">picky eater</option>
              </select>
              <select
                className={styles.selecttwo}
                value={breedFilter}
                onChange={(e) => setBreedFilter(e.target.value)}
              >
                <option value="">Breed All</option>
                <option value="beagle">Beagle</option>
                <option value="spaniel">Spaniel</option>
                <option value="golden">Golden Retriever</option>
              </select>
            </div>
          </div>
          <div>
            {/* {updateSearchResults().length === 0 ? (
              <p>No results found.</p>
            ) : (
              updateSearchResults().map((pet, index) => (
                <p key={index}>
                  {pet.name} - Status: {pet.status}, Breed: {pet.breed}
                </p>
              ))
            )} */}
            {
              updateSearchResults().map((pet, index) => (
                <p key={index}>
                  {pet.name} - Status: {pet.status}, Breed: {pet.breed}
                </p>
              ))
            }
          </div>
          <div className={styles.secondblock}>
            <button
              type="submit"
              className={styles.button}
              onClick={handleButtonClick}
            >
              <FaPlus className={styles.plus} />
              Add new patient
            </button>
            <h4 className={styles.p}>
              Rows per page:
              <select className={styles.selectthree}>
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </select>
            </h4>
          </div>
        </div>
        <List datashow={filteredItems} />
        {show && <Create />}
      </div>
    </>
  );
}
