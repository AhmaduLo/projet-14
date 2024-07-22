import React, { createContext, useState } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";

const EmployeeContext = createContext();

// Composant Provider pour fournir le contexte et le store Redux à l'application
const EmployeeProvider = ({ children }) => {
  return (
    // Fournir le store Redux à l'application
    <Provider store={store}>
      {/* PersistGate garantit que l'application n'est rendue qu'après que le state persisté est récupéré et chargé */}
      <PersistGate loading={null} persistor={persistor}>
        {/* Les composants enfants recevront le contexte et le store */}
        {children}
      </PersistGate>
    </Provider>
  );
};

export { EmployeeProvider, EmployeeContext };
