import React, { useState } from "react";
import StateSelect from "./StateSelect.js";
import DatePicker from "react-datepicker";
import { differenceInYears } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

const Formulaire = (props) => {
  // Déclaration des états pour chaque champ du formulaire
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [dateDeNaissance, setDateDeNaissance] = useState(null);
  const [dateDebut, setDateDebut] = useState(new Date());
  const [departement, setDepartement] = useState("");
  const [rue, setRue] = useState("");
  const [ville, setVille] = useState("");
  const [etat, setEtat] = useState("AL"); // Valeur par défaut pour le champ État
  const [codePostal, setCodePostal] = useState("");
  const [afficherModal, setAfficherModal] = useState(false);
  const [messageErreur, setMessageErreur] = useState("");
  const [erreurs, setErreurs] = useState({});

  // Fonction pour réinitialiser les champs du formulaire
  const reinitialiserFormulaire = () => {
    setPrenom("");
    setNom("");
    setDateDeNaissance(null);
    setDateDebut(new Date());
    setDepartement("");
    setRue("");
    setVille("");
    setEtat("AL"); // Réinitialiser le champ État à sa valeur par défaut
    setCodePostal("");
    setErreurs({});
  };

  // Fonction pour sauvegarder un employé dans le localStorage
  const sauvegarderEmploye = () => {
    const nouvellesErreurs = {};
    if (!prenom) nouvellesErreurs.prenom = true;
    if (!nom) nouvellesErreurs.nom = true;
    if (!dateDeNaissance) nouvellesErreurs.dateDeNaissance = true;
    if (!dateDebut) nouvellesErreurs.dateDebut = true;
    if (!rue) nouvellesErreurs.rue = true;
    if (!ville) nouvellesErreurs.ville = true;
    if (!etat) nouvellesErreurs.etat = true;
    if (!departement) nouvellesErreurs.departement = true;
    if (!codePostal) nouvellesErreurs.codePostal = true;

    if (Object.keys(nouvellesErreurs).length > 0) {
      setMessageErreur("Veuillez remplir tous les champs.");
      setErreurs(nouvellesErreurs);
      return;
    }

    const age = differenceInYears(new Date(), dateDeNaissance);
    if (age < 18) {
      setMessageErreur("L'employé doit avoir au moins 18 ans.");
      setErreurs({ dateDeNaissance: true });
      return;
    }

    const employes = JSON.parse(localStorage.getItem("employes")) || [];
    const employe = {
      prenom,
      nom,
      dateDeNaissance: dateDeNaissance.toLocaleDateString(),
      dateDebut: dateDebut.toLocaleDateString(),
      departement,
      rue,
      ville,
      etat,
      codePostal,
    };
    employes.push(employe);
    localStorage.setItem("employes", JSON.stringify(employes));
    setAfficherModal(true);
    setMessageErreur("");
    reinitialiserFormulaire();
  };

  // Fonction pour fermer le modal et réinitialiser le formulaire
  const fermerModal = () => {
    setAfficherModal(false);
    reinitialiserFormulaire();
  };

  return (
    <div className="container">
      <h2>Créer un Employé</h2>
      <form id="creer-employe">
        <label htmlFor="prenom">Prénom</label>
        <input
          type="text"
          id="prenom"
          placeholder="Entrez le prénom"
          value={prenom}
          onChange={(e) => {
            setPrenom(e.target.value);
            if (e.target.value)
              setErreurs((prev) => ({ ...prev, prenom: false }));
          }}
          className={erreurs.prenom ? "error-border" : ""}
        />

        <label htmlFor="nom">Nom</label>
        <input
          type="text"
          id="nom"
          placeholder="Entrez le nom"
          value={nom}
          onChange={(e) => {
            setNom(e.target.value);
            if (e.target.value) setErreurs((prev) => ({ ...prev, nom: false }));
          }}
          className={erreurs.nom ? "error-border" : ""}
        />

        <label htmlFor="date-de-naissance">Date de Naissance</label>
        <DatePicker
          id="date-de-naissance"
          selected={dateDeNaissance}
          onChange={(date) => {
            setDateDeNaissance(date);
            if (date)
              setErreurs((prev) => ({ ...prev, dateDeNaissance: false }));
          }}
          dateFormat="MM/dd/yyyy"
          maxDate={new Date()}
          showYearDropdown
          scrollableYearDropdown
          className={erreurs.dateDeNaissance ? "error-border" : ""}
        />

        <label htmlFor="date-debut">Date de Début</label>
        <DatePicker
          id="date-debut"
          selected={dateDebut}
          onChange={(date) => {
            setDateDebut(date);
            if (date) setErreurs((prev) => ({ ...prev, dateDebut: false }));
          }}
          dateFormat="MM/dd/yyyy"
          className={erreurs.dateDebut ? "error-border" : ""}
        />

        <fieldset className="adresse">
          <legend>Adresse</legend>
          <label htmlFor="rue">Rue</label>
          <input
            id="rue"
            placeholder="Entrez la rue"
            type="text"
            value={rue}
            onChange={(e) => {
              setRue(e.target.value);
              if (e.target.value)
                setErreurs((prev) => ({ ...prev, rue: false }));
            }}
            className={erreurs.rue ? "error-border" : ""}
          />

          <label htmlFor="ville">Ville</label>
          <input
            id="ville"
            placeholder="Entrez la ville"
            type="text"
            value={ville}
            onChange={(e) => {
              setVille(e.target.value);
              if (e.target.value)
                setErreurs((prev) => ({ ...prev, ville: false }));
            }}
            className={erreurs.ville ? "error-border" : ""}
          />

          <label htmlFor="etat">État</label>
          <StateSelect
            id="etat"
            value={etat}
            onChange={(e) => {
              setEtat(e.target.value);
              if (e.target.value)
                setErreurs((prev) => ({ ...prev, etat: false }));
            }}
            className={erreurs.etat ? "error-border" : ""}
          />

          <label htmlFor="code-postal">Code Postal</label>
          <input
            id="code-postal"
            placeholder="Entrez le code postal"
            type="text"
            value={codePostal}
            onChange={(e) => {
              setCodePostal(e.target.value);
              if (e.target.value)
                setErreurs((prev) => ({ ...prev, codePostal: false }));
            }}
            className={erreurs.codePostal ? "error-border" : ""}
          />
        </fieldset>

        <label htmlFor="departement">Département</label>
        <select
          id="departement"
          value={departement}
          onChange={(e) => {
            setDepartement(e.target.value);
            if (e.target.value)
              setErreurs((prev) => ({ ...prev, departement: false }));
          }}
          className={erreurs.departement ? "error-border" : ""}
        >
          <option value="">Sélectionnez un Département</option>
          <option value="Ventes">Ventes</option>
          <option value="Marketing">Marketing</option>
          <option value="Ingénierie">Ingénierie</option>
          <option value="Ressources Humaines">Ressources Humaines</option>
          <option value="Juridique">Juridique</option>
        </select>
      </form>
      <button
        className="btnSave"
        type="button"
        aria-label="Enregistrer l'Employé"
        onClick={sauvegarderEmploye}
      >
        Enregistrer
      </button>
      {messageErreur && <p className="error-message">{messageErreur}</p>}
      {afficherModal && (
        <div className="modal" role="dialog" aria-modal="true">
          <div className="modal-content">
            <span
              className="close"
              onClick={fermerModal}
              role="button"
              aria-label="Fermer"
            >
              &times;
            </span>
            <p>Employé Créé !</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Formulaire;
