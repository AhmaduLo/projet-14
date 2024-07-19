import React, { useState, useEffect } from "react";
import Formulaire from "./Formulaire";
import ListeEmployer from "./ListeEmployer";
import { getEmployees, addEmployee } from "./EmployeeManager";

const EmployeeManager = () => {
  const [employees, setEmployees] = useState([]);

  // Charger les employés depuis le fichier employeesData.js lors du premier rendu
  useEffect(() => {
    setEmployees(getEmployees());
  }, []);

  // Ajouter un employé
  const handleAddEmployee = (employee) => {
    addEmployee(employee);
    setEmployees(getEmployees());
  };

  return (
    <div className="container">
      <Formulaire addEmployee={handleAddEmployee} />
      <ListeEmployer employees={employees} />
    </div>
  );
};

export default EmployeeManager;