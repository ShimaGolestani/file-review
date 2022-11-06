import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import { HomeReducer } from "../redux/home/home-reducer";
import { TokenReducer } from "../redux/token/token.reducer";
import { composeWithDevTools } from "redux-devtools-extension";

const rootReducer = combineReducers({
  home: HomeReducer,
  token: TokenReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["token"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export let persistor = persistStore(store);
