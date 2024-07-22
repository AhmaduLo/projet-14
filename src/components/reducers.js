import { combineReducers } from 'redux';

// Définition du réducteur pour les employés
const employeesReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_EMPLOYEE':
      // Ajoute un nouvel employé à la liste des employés
      return [...state, action.payload];
    default:
      // Retourne l'état inchangé pour toutes les autres actions
      return state;
  }
};

// Combinaison des réducteurs en un seul réducteur racine
export default combineReducers({
  employees: employeesReducer,
});