"use client";

import React, { useState, useEffect } from "react";
import styles from "./Body.module.css";
import { FaPlus } from "react-icons/fa";
import Create from "../Create/Create";
import List from "../List/List";
import SearchBar from "../Search/SearchBar";

export default function Body() {
  const [show, setShow] = useState(false);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [breedFilter, setBreedFilter] = useState("all");
  const [pets, setPets] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [backgroundColor, setBackgroundColor] = useState(
    "rgba(255, 255, 255,1)"
  );

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const displayedItems = filteredItems.slice(startIndex, endIndex);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/items");
        const data = await response.json();
        setPets(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const filteredPets = pets.filter((pet) => {
    return (
      (statusFilter === "all" || pet.status === statusFilter) &&
      (breedFilter === "all" || pet.breed === breedFilter)
    );
  });

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

  // const handleSearch = (query) => {
  //   const filtered = items.filter(
  //     (item) =>
  //       (item.name && item.name.toLowerCase().includes(query.toLowerCase())) ||
  //       (item.pawrent &&
  //         item.pawrent.toLowerCase().includes(query.toLowerCase()))||
  //       (item.address &&
  //         item.address.toLowerCase().includes(query.toLowerCase()))
  //   );
  //   setFilteredItems(filtered);
  // };

  const handleSearch = (query) => {
    const searchFields = [
      "name",
      "pawrent",
      "gender",
      "birth",
      "phone",
      "address",
      "township",
    ];
    const filtered = items.filter((item) =>
      searchFields.some(
        (field) =>
          item[field] && item[field].toLowerCase().includes(query.toLowerCase())
      )
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
              <select
                className={styles.selectthree}
                value={rowsPerPage}
                onChange={(e) => setRowsPerPage(parseInt(e.target.value))}
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </h4>
          </div>
        </div>
        <List datashow={displayedItems} searchByFilter={filteredPets} />
        {show && <Create />}
        <div className={styles.pagination}>
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous Page
          </button>
          <span>{`Page ${currentPage}`}</span>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={endIndex >= filteredItems.length}
          >
            Next Page
          </button>
        </div>
      </div>
    </>
  );
}
