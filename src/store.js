import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import todoReducer from "./reducers/todoSlice";

const persistConfig = {
  key: "root",
  storage,
};
// Create a persisted reducer using the todoReducer and persistConfig

const persistedReducer = persistReducer(persistConfig, todoReducer);

export default function configureAppStore() {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });
  // Initialize the Redux store using the persisted reducer and custom middleware
  const persistor = persistStore(store);
  return { store, persistor };
}
