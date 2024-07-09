import React, { useState } from "react";
import StateSelect from "./StateSelect.js";
import DatePicker from "react-datepicker";
import { differenceInYears } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

const Formulaire = (props) => {
  // Déclaration des états pour chaque champ du formulaire
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [department, setDepartment] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("AL");
  const [zipCode, setZipCode] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({});

  // Fonction pour réinitialiser les champs du formulaire
  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setDateOfBirth(null);
    setStartDate(new Date());
    setDepartment("");
    setStreet("");
    setCity("");
    setState("AL");// Valeur par défaut
    setZipCode("");
    setErrors({});
  };

  // Fonction pour sauvegarder un employé dans le localStorage
  const saveEmployee = () => {
    const newErrors = {};

    // Vérification que tous les champs sont remplis
    if (!firstName) newErrors.firstName = true;
    if (!lastName) newErrors.lastName = true;
    if (!dateOfBirth) newErrors.dateOfBirth = true;
    if (!startDate) newErrors.startDate = true;
    if (!street) newErrors.street = true;
    if (!city) newErrors.city = true;
    if (!state) newErrors.state = true;
    if (!department) newErrors.department = true;
    if (!zipCode) newErrors.zipCode = true;

    if (Object.keys(newErrors).length > 0) {
      setErrorMessage("Veuillez remplir tous les champs.");
      setErrors(newErrors);
      return;
    }

    // Vérification de l'âge (18 ans ou plus)
    const age = differenceInYears(new Date(), dateOfBirth);
    if (age < 18) {
      setErrorMessage("L'employé doit avoir au moins 18 ans.");
      setErrors({ dateOfBirth: true });
      return;
    }

    // Récupération des employés stockés ou initialisation d'un tableau vide
    const employees = JSON.parse(localStorage.getItem("employees")) || [];
    // Création d'un objet représentant l'employé
    const employee = {
      firstName,
      lastName,
      dateOfBirth: dateOfBirth.toLocaleDateString(),
      startDate: startDate.toLocaleDateString(),
      department,
      street,
      city,
      state,
      zipCode,
    };
    // Ajout de l'employé au tableau et stockage dans le localStorage
    employees.push(employee);
    localStorage.setItem("employees", JSON.stringify(employees));
    // Affichage du modal de confirmation
    setShowModal(true);
    // Réinitialisation du message d'erreur
    setErrorMessage("");
    resetForm();
  };

  // Fonction pour fermer le modal et réinitialiser le formulaire
  const closeModal = () => {
    setShowModal(false);
    resetForm();
  };

  return (
    <div className="container">
      <h2>Create Employee</h2>
      <form id="create-employee">
        <label htmlFor="first-name">First Name</label>
        <input
          type="text"
          id="first-name"
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
            if (e.target.value) setErrors((prev) => ({ ...prev, firstName: false }));
          }}
          className={errors.firstName ? "error-border" : ""}
        />

        <label htmlFor="last-name">Last Name</label>
        <input
          type="text"
          id="last-name"
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value);
            if (e.target.value) setErrors((prev) => ({ ...prev, lastName: false }));
          }}
          className={errors.lastName ? "error-border" : ""}
        />

        <label htmlFor="date-of-birth">Date of Birth</label>
        <DatePicker
          selected={dateOfBirth}
          onChange={(date) => {
            setDateOfBirth(date);
            if (date) setErrors((prev) => ({ ...prev, dateOfBirth: false }));
          }}
          dateFormat="MM/dd/yyyy"
          maxDate={new Date()}
          showYearDropdown
          scrollableYearDropdown
          className={errors.dateOfBirth ? "error-border" : ""}
        />

        <label htmlFor="start-date">Start Date</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => {
            setStartDate(date);
            if (date) setErrors((prev) => ({ ...prev, startDate: false }));
          }}
          dateFormat="MM/dd/yyyy"
          className={errors.startDate ? "error-border" : ""}
        />

        <fieldset className="address">
          <legend>Address</legend>
          <label htmlFor="street">Street</label>
          <input
            id="street"
            type="text"
            value={street}
            onChange={(e) => {
              setStreet(e.target.value);
              if (e.target.value) setErrors((prev) => ({ ...prev, street: false }));
            }}
            className={errors.street ? "error-border" : ""}
          />

          <label htmlFor="city">City</label>
          <input
            id="city"
            type="text"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
              if (e.target.value) setErrors((prev) => ({ ...prev, city: false }));
            }}
            className={errors.city ? "error-border" : ""}
          />

          <label htmlFor="state">State</label>
          <StateSelect
            id="state"
            value={state}
            onChange={(e) => {
              setState(e.target.value);
              if (e.target.value) setErrors((prev) => ({ ...prev, state: false }));
            }}
            className={errors.state ? "error-border" : ""}
          />

          <label htmlFor="zip-code">Zip Code</label>
          <input
            id="zip-code"
            type="text"
            value={zipCode}
            onChange={(e) => {
              setZipCode(e.target.value);
              if (e.target.value) setErrors((prev) => ({ ...prev, zipCode: false }));
            }}
            className={errors.zipCode ? "error-border" : ""}
          />
        </fieldset>

        <label htmlFor="department">Department</label>
        <select
          id="department"
          value={department}
          onChange={(e) => {
            setDepartment(e.target.value);
            if (e.target.value) setErrors((prev) => ({ ...prev, department: false }));
          }}
          className={errors.department ? "error-border" : ""}
        >
          <option value="">Select Department</option>
          <option value="Sales">Sales</option>
          <option value="Marketing">Marketing</option>
          <option value="Engineering">Engineering</option>
          <option value="Human Resources">Human Resources</option>
          <option value="Legal">Legal</option>
        </select>
      </form>
      <button type="button" onClick={saveEmployee}>Save</button>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <p>Employee Created!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Formulaire;