import React, { useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./config/Store";
import Loginapp from "./components/loginapp/Loginapp";

function App() {
  return (
    <PersistGate persistor={persistor}>
      <Loginapp />
    </PersistGate>
  );
}

export default App;
