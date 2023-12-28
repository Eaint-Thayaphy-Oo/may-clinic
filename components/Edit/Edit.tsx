import React, { useState, useEffect } from "react";
import styles from "./Edit.module.css";

export default function Edit({ item }) {
  const [originalValues, setOriginalValues] = useState({}); // State to store original values
  const [editedValues, setEditedValues] = useState({
    id: item.id,
    name: item.name,
    pawrent: item.pawrent,
    gender: item.gender,
    phone: item.phone,
    city: item.city,
    status: item.status,
    breed: item.breed,
    birth: item.birth,
    address: item.address,
    township: item.township,
  });

  useEffect(() => {
    setOriginalValues({
      id: item.id,
      name: item.name,
      pawrent: item.pawrent,
      gender: item.gender,
      phone: item.phone,
      city: item.city,
      status: item.status,
      breed: item.breed,
      birth: item.birth,
      address: item.address,
      township: item.township,
    });
  }, [item]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handlesubmit = (e) => {
    e.preventDefault();

    if (
      !editedValues.name ||
      !editedValues.pawrent ||
      !editedValues.gender ||
      !editedValues.phone ||
      !editedValues.city ||
      !editedValues.status ||
      !editedValues.breed ||
      !editedValues.birth ||
      !editedValues.address ||
      !editedValues.township
    ) {
      alert("Please fill in all the required fields");
      return;
    }

    const hasChanges = Object.keys(originalValues).some(
      (key) => originalValues[key] !== editedValues[key]
    );

    if (!hasChanges) {
      alert("No changes made. Update a field to save changes.");
      window.location.reload();
      return;
    }

    const data = {
      id: editedValues.id,
      name: editedValues.name,
      pawrent: editedValues.pawrent,
      gender: editedValues.gender,
      phone: editedValues.phone,
      city: editedValues.city,
      status: editedValues.status,
      breed: editedValues.breed,
      birth: editedValues.birth,
      address: editedValues.address,
      township: editedValues.township,
    };

    fetch("http://localhost:8000/items/" + item.id, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => {
        alert("Saved successfully.");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <>
      <form className="" onSubmit={handlesubmit}>
        <div className={styles.modalblock}>
          <div className="">
            <h1 className={styles.text}>Add new patient</h1>
            <h2 className={styles.textone}>
              Enter new patient information below
            </h2>
            <div className={styles.blockone}>
              <div className={styles.blocktwo}>
                <div className={styles.inputone}>
                  <label className={styles.label}>Pet Name</label>
                  {/* <input type="hidden" value={id}></input> */}
                  <input
                    type="text"
                    name="name"
                    className={styles.inputone}
                    value={editedValues.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className={styles.inputone}>
                  <label className={styles.label}>Pawrent</label>
                  <input
                    type="text"
                    name="pawrent"
                    className={styles.inputone}
                    placeholder=""
                    value={editedValues.pawrent}
                    onChange={handleInputChange}
                  />
                </div>
                <div className={styles.gender}>
                  <label className={styles.label}>Gender</label>
                  <div className="">
                    <label>
                      <input
                        type="radio"
                        name="gender"
                        checked={editedValues.gender}
                        value={editedValues.gender}
                        onChange={handleInputChange}
                      />
                      Male
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="gender"
                        checked={editedValues.gender}
                        value={editedValues.gender}
                        onChange={handleInputChange}
                      />
                      Female
                    </label>
                  </div>
                </div>
                <div className={styles.inputone}>
                  <label className={styles.label}>Contact Phone No.</label>
                  <input
                    type="text"
                    name="phone"
                    className={styles.inputone}
                    value={editedValues.phone}
                    onChange={handleInputChange}
                  />
                </div>
                <div className={styles.inputone}>
                  <label className={styles.label}>City</label>
                  <select
                    name="city"
                    className={styles.selectfour}
                    value={editedValues.city}
                    onChange={handleInputChange}
                  >
                    <option value="">please choose city</option>
                    <option value="yangon">Yangon</option>
                    <option value="insein">Insein</option>
                    <option value="dagon">Dagon</option>
                  </select>
                </div>
              </div>
              <div>
                <div className={styles.blockthree}>
                  <label className={styles.label}>Status</label>
                  <select
                    name="status"
                    className={styles.selectfour}
                    value={editedValues.status}
                    onChange={handleInputChange}
                  >
                    <option>please choose status</option>
                    <option value="allergy">Allergy</option>
                    <option value="picky">Picky Eater</option>
                  </select>
                </div>
                <div className="">
                  <label className={styles.label}>Breed</label>
                  <select
                    name="breed"
                    className={styles.selectfour}
                    value={editedValues.breed}
                    onChange={handleInputChange}
                  >
                    <option value="">Breed All</option>
                    <option value="beagle">Beagle</option>
                    <option value="spaniel">Spaniel</option>
                    <option value="golden">Golden Retriever</option>
                  </select>
                </div>
                <div>
                  <label className={styles.label}>Date of Birth</label>
                  <input
                    className={styles.selectfour}
                    id=""
                    name="birth"
                    type="date"
                    placeholder=""
                    value={editedValues.birth}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="">
                  <label className={styles.label}>Address</label>
                  <input
                    type="text"
                    name="address"
                    className={styles.inputone}
                    placeholder=""
                    value={editedValues.address}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="">
                  <label className={styles.label}>Township</label>
                  <select
                    name="township"
                    className={styles.selectfour}
                    value={editedValues.township}
                    onChange={handleInputChange}
                  >
                    <option value="city">please choose city</option>
                    <option value="yangon">Yangon</option>
                    <option value="mandalay">Mandalay</option>
                    <option value="shan">Shan</option>
                  </select>
                </div>
              </div>
            </div>
            <div className={styles.buttontype}>
              <button type="submit" className={styles.savebtn}>
                Update
              </button>
              <button type="submit" className={styles.cancelbtn}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
