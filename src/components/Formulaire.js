import React, { useState } from "react";
import { useDispatch } from "react-redux";
import StateSelect from "./StateSelect.js";
import DatePicker from "react-datepicker";
import { differenceInYears } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import { addEmployee } from "./actions";
import { Modal } from "my-unique-modal-component"; // Utilisation de l'import nommé

const Formulaire = () => {
  const dispatch = useDispatch();
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

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setDateOfBirth(null);
    setStartDate(new Date());
    setDepartment("");
    setStreet("");
    setCity("");
    setState("AL");
    setZipCode("");
    setErrors({});
  };

  const isOnlyLetters = (str) => /^[A-Za-zÀ-ÖØ-öø-ÿ\s-]+$/.test(str);
  const isOnlyNumbers = (str) => /^[0-9]*$/.test(str);

  const saveEmployee = () => {
    const newErrors = {};
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

    const age = differenceInYears(new Date(), dateOfBirth);
    if (age < 18) {
      setErrorMessage("L'employé doit avoir au moins 18 ans.");
      setErrors({ dateOfBirth: true });
      return;
    }

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

    dispatch(addEmployee(employee));
    setShowModal(true); // Afficher le modal
    setErrorMessage("");
    resetForm();
  };

  const closeModal = () => {
    setShowModal(false); // Fermer le modal
  };

  return (
    <div className="container">
      <h2>Créer un Employé</h2>
      <form id="creer-employe">
        <label htmlFor="first-name">Prénom</label>
        <input
          type="text"
          id="first-name"
          placeholder="Entrez le prénom"
          value={firstName}
          onChange={(e) => {
            if (isOnlyLetters(e.target.value) || e.target.value === "") {
              setFirstName(e.target.value);
              if (e.target.value)
                setErrors((prev) => ({ ...prev, firstName: false }));
            }
          }}
          className={errors.firstName ? "error-border" : ""}
        />

        <label htmlFor="last-name">Nom</label>
        <input
          type="text"
          id="last-name"
          placeholder="Entrez le nom"
          value={lastName}
          onChange={(e) => {
            if (isOnlyLetters(e.target.value) || e.target.value === "") {
              setLastName(e.target.value);
              if (e.target.value)
                setErrors((prev) => ({ ...prev, lastName: false }));
            }
          }}
          className={errors.lastName ? "error-border" : ""}
        />

        <label htmlFor="date-of-birth">Date de Naissance</label>
        <DatePicker
          id="date-of-birth"
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

        <label htmlFor="start-date">Date de Début</label>
        <DatePicker
          id="start-date"
          selected={startDate}
          onChange={(date) => {
            setStartDate(date);
            if (date) setErrors((prev) => ({ ...prev, startDate: false }));
          }}
          dateFormat="MM/dd/yyyy"
          className={errors.startDate ? "error-border" : ""}
        />

        <fieldset className="adresse">
          <legend>Adresse</legend>
          <label htmlFor="street">Rue</label>
          <input
            id="street"
            placeholder="Entrez la rue"
            type="text"
            value={street}
            onChange={(e) => {
              setStreet(e.target.value);
              if (e.target.value)
                setErrors((prev) => ({ ...prev, street: false }));
            }}
            className={errors.street ? "error-border" : ""}
          />

          <label htmlFor="city">Ville</label>
          <input
            id="city"
            placeholder="Entrez la ville"
            type="text"
            value={city}
            onChange={(e) => {
              if (isOnlyLetters(e.target.value) || e.target.value === "") {
                setCity(e.target.value);
                if (e.target.value)
                  setErrors((prev) => ({ ...prev, city: false }));
              }
            }}
            className={errors.city ? "error-border" : ""}
          />

          <label htmlFor="state">État</label>
          <StateSelect
            id="state"
            value={state}
            onChange={(e) => {
              setState(e.target.value);
              if (e.target.value)
                setErrors((prev) => ({ ...prev, state: false }));
            }}
            className={errors.state ? "error-border" : ""}
          />

          <label htmlFor="zip-code">Code Postal</label>
          <input
            id="zip-code"
            placeholder="Entrez le code postal"
            type="text"
            value={zipCode}
            onChange={(e) => {
              if (isOnlyNumbers(e.target.value) || e.target.value === "") {
                setZipCode(e.target.value);
                if (e.target.value)
                  setErrors((prev) => ({ ...prev, zipCode: false }));
              }
            }}
            className={errors.zipCode ? "error-border" : ""}
          />
        </fieldset>

        <label htmlFor="department">Département</label>
        <select
          id="department"
          value={department}
          onChange={(e) => {
            setDepartment(e.target.value);
            if (e.target.value)
              setErrors((prev) => ({ ...prev, department: false }));
          }}
          className={errors.department ? "error-border" : ""}
        >
          <option value="">Sélectionnez un Département</option>
          <option value="Sales">Ventes</option>
          <option value="Marketing">Marketing</option>
          <option value="Engineering">Ingénierie</option>
          <option value="Human Resources">Ressources Humaines</option>
          <option value="Legal">Juridique</option>
        </select>
      </form>
      <button
        className="btnSave"
        type="button"
        aria-label="Enregistrer l'Employé"
        onClick={saveEmployee}
      >
        Enregistrer
      </button>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <Modal show={showModal} onClose={closeModal} message="Employé Créé !" />
    </div>
  );
};

export default Formulaire;
