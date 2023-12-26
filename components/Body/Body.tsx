"use client";

import React, { useState } from "react";
import styles from "./Body.module.css";
import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import Create from "../Create/Create";
import List from "../List/List";

export default function Body() {
  const [show, setShow] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState(
    "rgba(255, 255, 255,1)"
  );
  const [search, setSearch] = useState("");

  const handleButtonClick = () => {
    setShow(true);

    setBackgroundColor("rgba(255, 255, 255,0.5)");
  };

  let handleSearch = (e) => {
    setSearch(e.target.value);
  };

  let handleSubmit = () => {
    if (search !== "") {
      fetch(`http://localhost:8000/items?search=${search}`)
        .then((res) => res.json())
        .then((res) => console.log(res));
    }
  };

  return (
    <>
      <div className={styles.container} style={{ backgroundColor }}>
        <div className={styles.block}>
          <div className={styles.firstblock}>
            <div>
              <h2 className={styles.header}>Patient List</h2>
              <input
                type="text"
                placeholder="Search table"
                className={styles.input}
                value={search}
                onChange={(e) => handleSearch(e)}
              />
              <CiSearch className={styles.icon} onClick={() => handleSubmit()} />
            </div>
            <div className={styles.select}>
              <select className={styles.selectone}>
                <option value="">Status All</option>
                <option value="allergy">allergy</option>
                <option value="picky">picky eater</option>
              </select>
              <select className={styles.selecttwo}>
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
              <select className={styles.selectthree}>
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </select>
            </h4>
          </div>
        </div>
        <List />
        {show && <Create />}
      </div>
    </>
  );
}
