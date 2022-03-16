import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { persistReducer, persistStore } from "redux-persist";
import reducers from "./reducers";
import sagas from "./sagas";
import storage from "redux-persist/es/storage";

//#region  setup redux

// Middleware: Redux Persist Config
const persistConfig = {
  // Root?
  key: "root",
  // Storage Method (React Native)
  storage: storage,
  // Whitelist (Save Specific Reducers)
  whitelist: ["auth", "config", "menu", "category", "value"],
};

// Middleware: Redux Persist Persisted Reducer
const persistedReducer = persistReducer(persistConfig, reducers);

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

const store = createStore(persistedReducer, applyMiddleware(...middlewares));

// Middleware: Redux Persist Persister
const persistor = persistStore(store);

sagaMiddleware.run(sagas);
//#endregion setup redux

const reduxStore = {
  store,
  persistor,
};

export default reduxStore;
