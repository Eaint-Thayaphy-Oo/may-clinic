import React, { useState, useEffect } from "react";
import styles from "./Edit.module.css"

export default function Edit({ item }) {
  // console.log(item);
  const [id, setId] = useState(item.id);
  const [name, setName] = useState(item.name);
  const [pawrent, setPawrent] = useState(item.pawrent);
  const [gender, setGender] = useState(item.gender);
  const [phone, setPhone] = useState(item.phone);
  const [city, setCity] = useState(item.city);
  const [status, setStatus] = useState(item.status);
  const [breed, setBreed] = useState(item.breed);
  const [birth, setBirth] = useState(item.birth);
  const [address, setAddress] = useState(item.address);
  const [township, setTownship] = useState(item.township);

  useEffect(() => {
    fetch(`http://localhost:8000/items/`)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        setId(resp.id);
        setName(resp.name);
        setPawrent(resp.pawrent);
        setGender(resp.gender);
        setPhone(resp.phone);
        setCity(resp.city);
        setStatus(resp.status);
        setBreed(resp.breed);
        setBirth(resp.birth);
        setAddress(resp.address);
        setTownship(resp.township);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [item]);

  const handlesubmit = (e) => {
    e.preventDefault();
    const data = {
      id,
      name,
      pawrent,
      gender,
      phone,
      city,
      status,
      breed,
      birth,
      address,
      township,
    };

    fetch("http://localhost:8000/items/" + item.id, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => {
        alert("Saved successfully.");
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
                  <input type="hidden" value={id}></input>
                  <input
                    type="text"
                    name="name"
                    className={styles.inputone}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className={styles.inputone}>
                  <label className={styles.label}>Pawrent</label>
                  <input
                    type="text"
                    name="pawrent"
                    className={styles.inputone}
                    placeholder=""
                    value={pawrent}
                    onChange={(e) => setPawrent(e.target.value)}
                  />
                </div>
                <div className={styles.gender}>
                  <label className={styles.label}>Gender</label>
                  <div className="">
                    <label>
                      <input
                        type="radio"
                        name="gender"
                        value={gender}
                        checked={gender}
                        onChange={(e) => setGender(e.target.value)}
                      />
                      Male
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="gender"
                        value={gender}
                        checked={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className={styles.female}
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
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className={styles.inputone}>
                  <label className={styles.label}>City</label>
                  <select
                    name="city"
                    className={styles.selectfour}
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
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
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
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
                    value={breed}
                    onChange={(e) => setBreed(e.target.value)}
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
                    value={birth}
                    onChange={(e) => setBirth(e.target.value)}
                  />
                </div>
                <div className="">
                  <label className={styles.label}>Address</label>
                  <input
                    type="text"
                    name="address"
                    className={styles.inputone}
                    placeholder=""
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className="">
                  <label className={styles.label}>Township</label>
                  <select
                    name="township"
                    className={styles.selectfour}
                    value={township}
                    onChange={(e) => setTownship(e.target.value)}
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
