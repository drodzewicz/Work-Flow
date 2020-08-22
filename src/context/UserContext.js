import React, { useReducer, createContext } from "react";

export const UserContext = createContext();

const initialState = { username: "Darek", theme: true };

const reducer = (state, { type, payload }) => {
	switch (type) {
		case "LOGIN":
			return { ...state, username: payload.username };
		case "LOGOUT":
			return { ...state, username: null };
		case "THEME_DARK":
			return { ...state, theme: false };
		case "THEME_LIGHT":
			return { ...state, theme: true };
		default:
			return state;
	}
};

export const UserProvider = ({ children }) => {
	const [user, setUser] = useReducer(reducer, initialState);

	return <UserContext.Provider value={[user, setUser]}>{children}</UserContext.Provider>;
};
