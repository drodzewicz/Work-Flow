import React, { useReducer, createContext, useEffect } from "react";

export const UserContext = createContext();

const initialState = { user: null, theme: true };

const reducer = (state, { type, payload }) => {
	switch (type) {
		case "LOGIN":
			localStorage.setItem("token", payload.token);
			return { ...state, user: payload.user };
		case "LOGOUT":
			localStorage.removeItem("token");
			return { ...state, user: null };
		case "THEME_DARK":
			localStorage.setItem("theme", "dark");
			return { ...state, theme: false };
		case "THEME_LIGHT":
			localStorage.setItem("theme", "lihgt");
			return { ...state, theme: true };
		case "THEME_TOGGLE":
			localStorage.setItem("theme", state.theme ? "dark" : "light");
			return { ...state, theme: !state.theme };
		default:
			return state;
	}
};

export const UserProvider = ({ children }) => {
	const [user, dispatchUser] = useReducer(reducer, initialState);

	useEffect(() => {
		const localStorageTheme = localStorage.getItem("theme");
		if (!!localStorageTheme) {
			localStorageTheme === "light"
				? dispatchUser({ type: "THEME_LIGHT" })
				: dispatchUser({ type: "THEME_DARK" });
		}
		return () => {};
	}, []);

	return <UserContext.Provider value={[user, dispatchUser]}>{children}</UserContext.Provider>;
};
