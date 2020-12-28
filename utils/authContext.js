import { createContext } from "react";

export default createContext({
    user: null,
    authData: null,
    login() {},
    logout() {},
    token: null,
});
