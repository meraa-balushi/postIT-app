import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Uses localStorage by default
import { combineReducers } from "redux";

import usersReducer from "../Features/UserSlice";
import postReducer from "../Features/PostSlice";

// Redux Persist config
const persistConfig = {
  key: "reduxstore", // The key to identify the persisted state in storage
  storage, // The storage method (localStorage)
};

// Combine all your reducers into one reducer
const rootReducer = combineReducers({
  users: usersReducer, // Manage users slice of the state
  posts: postReducer, // Manage posts slice of the state
});

// Create the persisted reducer using redux-persist
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store using the persisted reducer
const store = configureStore({
  reducer: persistedReducer, // Use the persisted reducer in the store
});

// Create persistore for rehydration
const persistore = persistStore(store); // Create persistore for rehydration

// Export the store and persistore
export { store, persistore };
