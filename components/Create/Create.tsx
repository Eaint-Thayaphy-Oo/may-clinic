import React, { useState } from "react";
import styles from "./Create.module.css";

export default function Create() {
  const [name, setName] = useState("");
  const [pawrent, setPawrent] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [status, setStatus] = useState("");
  const [breed, setBreed] = useState("");
  const [birth, setBirth] = useState("");
  const [address, setAddress] = useState("");
  const [township, setTownship] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
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

    fetch("http://localhost:8000/items", {
      method: "POST",
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
      <form className="" onSubmit={handleSubmit}>
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
                        value={gender === "female" ? "female" : "male"}
                        onChange={(e) => setGender(e.target.value)}
                      />
                      Male
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="gender"
                        value={gender === "female" ? "male" : "female"}
                        onChange={(e) => setGender(e.target.value)}
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
                Save
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
