import { createStore } from "redux";
import rootReducer from "./reducers";
import { persistStore, persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session"; // Utilisation de sessionStorage

// Configuration pour redux-persist
const persistConfig = {
  key: "root", // Clé pour stocker le state persisté
  storage: storageSession, // Utilisation de sessionStorage pour stocker les données
};

// Création d'un réducteur persisté en utilisant la configuration définie et le réducteur racine
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Création du store Redux en utilisant le réducteur persisté
export const store = createStore(persistedReducer);
// Création d'un persistor pour gérer le persisting du store
export const persistor = persistStore(store);
