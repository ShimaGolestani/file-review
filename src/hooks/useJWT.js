import { useContext } from "react";
import { JWTContext } from "../context/JWTContext";

const useJWT = () => useContext(JWTContext);

return useJWT;
