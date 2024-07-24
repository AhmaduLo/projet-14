import React, { useState } from "react";
import { useSelector } from "react-redux";

const ListeEmployer = () => {
  const employees = useSelector((state) => state.employees); // Récupérer les employés depuis Redux
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage, setEmployeesPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [searchTerm, setSearchTerm] = useState("");

  // Fonction pour trier les employés en fonction d'une clé
  const sortEmployees = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    } else if (
      sortConfig.key === key &&
      sortConfig.direction === "descending"
    ) {
      direction = "ascending";
    }
    // Mise à jour de la configuration de tri
    setSortConfig({ key, direction });
  };

  // Création d'une liste triée des employés en fonction de la configuration de tri
  const sortedEmployees = React.useMemo(() => {
    let sortableEmployees = [...employees];
    if (sortConfig.key !== null) {
      sortableEmployees.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    // Filtrer les employés en fonction du terme de recherche
    return sortableEmployees.filter((employee) =>
      Object.values(employee).some((val) =>
        val.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [employees, sortConfig, searchTerm]);

  // Calcul des employés à afficher sur la page actuelle
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = sortedEmployees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

  // Changer de page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
 
  // Déterminer le nombre total de pages
  const totalPages = Math.ceil(sortedEmployees.length / employeesPerPage);

  // Fonction pour passer à la page suivante
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Fonction pour revenir à la page précédente
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const getArrowClass = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "ascending"
        ? "sort-arrow asc"
        : "sort-arrow desc";
    }
    return "sort-arrow";
  };

  return (
    <div className="container1">
      <h2>Employee List</h2>
      <div className="controls">
        <label>
          Show{" "}
          <select
            value={employeesPerPage}
            onChange={(e) => {
              setEmployeesPerPage(Number(e.target.value));
              setCurrentPage(1); // Reset to first page
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>{" "}
          entries
        </label>
        {/* Champ de recherche */}
        <label>
          Search:{" "}
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </label>
      </div>
      {employees.length === 0 ? (
        <p>La liste est vide.</p>
      ) : (
        <>
          <table className="employee-table">
            <thead>
              <tr>
                <th onClick={() => sortEmployees("firstName")}>
                  <span className={getArrowClass("firstName")}>First Name</span>
                </th>
                <th onClick={() => sortEmployees("lastName")}>
                  <span className={getArrowClass("lastName")}>Last Name</span>
                </th>
                <th onClick={() => sortEmployees("startDate")}>
                  <span className={getArrowClass("startDate")}>Start Date</span>
                </th>
                <th onClick={() => sortEmployees("department")}>
                  <span className={getArrowClass("department")}>
                    Department
                  </span>
                </th>
                <th onClick={() => sortEmployees("dateOfBirth")}>
                  <span className={getArrowClass("dateOfBirth")}>
                    Date of Birth
                  </span>
                </th>
                <th onClick={() => sortEmployees("street")}>
                  <span className={getArrowClass("street")}>Street</span>
                </th>
                <th onClick={() => sortEmployees("city")}>
                  <span className={getArrowClass("city")}>City</span>
                </th>
                <th onClick={() => sortEmployees("state")}>
                  <span className={getArrowClass("state")}>State</span>
                </th>
                <th onClick={() => sortEmployees("zipCode")}>
                  <span className={getArrowClass("zipCode")}>Zip Code</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {currentEmployees.map((employee, index) => (
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
          <div className="pagination">
            <button onClick={prevPage} disabled={currentPage === 1}>
              Previous
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={currentPage === index + 1 ? "active" : ""}
              >
                {index + 1}
              </button>
            ))}
            <button onClick={nextPage} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
          {/* Affichage du nombre d'entrées affichées */}
          <div className="entries-info">
            Showing {indexOfFirstEmployee + 1} to{" "}
            {Math.min(indexOfLastEmployee, sortedEmployees.length)} of{" "}
            {sortedEmployees.length} entries
          </div>
        </>
      )}
    </div>
  );
};

export default ListeEmployer;
