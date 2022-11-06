import { useContext } from "react";
import { JWTContext } from "../context/JWTContext";

const useAuth = () => useContext(JWTContext);
export default useAuth;
