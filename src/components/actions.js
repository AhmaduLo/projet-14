export const addEmployee = (employee) => ({
  type: "ADD_EMPLOYEE", // Type de l'action
  payload: employee, // Charge utile contenant les données de l'employé
});
