import { createStore } from "redux";
import rootReducer from "./reducers";
import { persistStore, persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";

// Configuration pour redux-persist
const persistConfig = {
  key: "root", // Clé pour stocker le state persisté
  storage: storageSession, // Utilisation de sessionStorage pour stocker les données
};

// Création d'un réducteur persisté en utilisant la configuration définie et le réducteur racine
const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
