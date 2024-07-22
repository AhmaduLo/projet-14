// Définition et exportation de l'action créateur `addEmployee`
export const addEmployee = (employee) => ({
    type: 'ADD_EMPLOYEE', // Type de l'action
    payload: employee, // Charge utile contenant les données de l'employé
  });