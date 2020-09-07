import React, { useReducer, createContext } from "react";

export const UserContext = createContext();

const initialState = { user: null, theme: true };

const reducer = (state, { type, payload }) => {
	switch (type) {
		case "LOGIN":
			return { ...state, user: payload.user };
		case "LOGOUT":
			localStorage.removeItem("token");
			return { ...state, user: null };
		case "THEME_DARK":
			return { ...state, theme: false };
		case "THEME_LIGHT":
			return { ...state, theme: true };
		case "THEME_TOGGLE":
			return { ...state, theme: !state.theme };
		default:
			return state;
	}
};

export const UserProvider = ({ children }) => {
	const [user, setUser] = useReducer(reducer, initialState);

	return <UserContext.Provider value={[user, setUser]}>{children}</UserContext.Provider>;
};
