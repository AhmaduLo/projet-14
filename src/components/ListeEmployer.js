import React, { useState, useEffect } from "react";

const ListeeEmployer = (props) => {
  const [employees, setEmployees] = useState([]);

  // Utilisation de useEffect pour charger les employés depuis le localStorage lorsque le composant est monté
  useEffect(() => {
    // Récupération des employés stockés dans le localStorage ou initialisation d'un tableau vide
    const storedEmployees = JSON.parse(localStorage.getItem("employees")) || [];
    // Mise à jour de l'état employees avec les données récupérées
    setEmployees(storedEmployees);
  }, []); // Le tableau vide [] indique que cet effet doit s'exécuter une seule fois après le montage du composant

  return (
    <div className="container1">
      <h2>Employee List</h2>
      {employees.length === 0 ? (
        // Affichage d'un message si la liste des employés est vide
        <p>La liste est vide.</p>
      ) : (
        // Affichage du tableau des employés si la liste n'est pas vide
        <table className="employee-table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Start Date</th>
              <th>Department</th>
              <th>Date of Birth</th>
              <th>Street</th>
              <th>City</th>
              <th>State</th>
              <th>Zip Code</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              // Création d'une ligne pour chaque employé dans le tableau
              <tr key={index}>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.startDate}</td>
                <td>{employee.department}</td>
                <td>{employee.dateOfBirth}</td>
                <td>{employee.street}</td>
                <td>{employee.city}</td>
                <td>{employee.state}</td>
                <td>{employee.zipCode}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ListeeEmployer;
