import React, { useState, useEffect } from "react";
import styles from "./List.module.css";
import Image from "next/image";
import { AiOutlineMore } from "react-icons/ai";
import { LuPencil } from "react-icons/lu";
import { FiTrash } from "react-icons/fi";
import Edit from "../Edit/Edit";

export interface DataType {
  id: number;
  name: string;
  status: string;
  pawrent: string;
  breed: string;
  gender: string;
  birth: number;
  phone: number;
  address: string;
  township?: string;
  city?: string;
}

export default function List() {
  const [data, setData] = useState(null);
  const [editModal, setEditModal] = useState(false);
  // const [selectedId, setSelectedId] = useState<number>();
  const [selectedData, setSelectedData] = useState<DataType>();
  const [showDropDown, setShowDropDown] = useState();

  const handleOpenModal = (id) => {
    if (id == showDropDown) {
      setShowDropDown(null);
    } else {
      setShowDropDown(id);
    }
  };

  useEffect(() => {
    fetch("http://localhost:8000/items")
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        setData(resp);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const Removefunction = (id) => {
    // console.log(id);
    if (window.confirm("Do you want to remove?")) {
      fetch("http://localhost:8000/items/" + id, {
        method: "DELETE",
      })
        .then((res) => {
          alert("Removed successfully.");
          window.location.reload();
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };
  return (
    <>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th>
              <input id="" type="checkbox" />
            </th>
            <th>ID</th>
            <th>Name</th>
            <th>Status</th>
            <th>Pawrent</th>
            <th>Breed</th>
            <th>Gender</th>
            <th>Date of Birth</th>
            <th>Contact Phone No.</th>
            <th>Address</th>
            <th>Township</th>
            <th></th>
          </tr>
        </thead>
        <tbody className={styles.bodytable}>
          {data &&
            data.map((item) => (
              <tr key={item.id}>
                <td>
                  <input id="" type="checkbox" />
                </td>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>
                  {item.status == "allergy" ? (
                    <Image
                      src="/images/allergy.png"
                      alt="allergy"
                      width={15}
                      height={15}
                    />
                  ) : (
                    <Image
                      src="/images/picky eater.png"
                      alt="picky"
                      width={15}
                      height={15}
                    />
                  )}
                </td>
                <td>{item.pawrent}</td>
                <td>{item.breed}</td>
                <td>{item.gender}</td>
                <td>{item.birth}</td>
                <td>{item.phone}</td>
                <td>{item.address}</td>
                <td>{item.township}</td>
                <td
                  className={styles.modalId}
                  onClick={() => handleOpenModal(item?.id)}
                >
                  <AiOutlineMore />
                  {showDropDown === item?.id && (
                    <div className={styles.modal}>
                      <button
                        className={styles.button}
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditModal(true);
                          // setSelectedId(item.id);
                          setSelectedData(item);
                        }}
                      >
                        <LuPencil className={styles.pencil} />
                        Edit
                      </button>
                      <button
                        className={styles.button}
                        onClick={() => {
                          Removefunction(item.id);
                        }}
                      >
                        <FiTrash className={styles.delete} />
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {editModal == true ? <Edit item={selectedData} /> : null}
    </>
  );
}
