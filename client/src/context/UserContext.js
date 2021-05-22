import React, { useReducer, createContext, useEffect } from "react";

export const UserContext = createContext();

const initialState = { authStatus: null, user: null, currentBoard: { role: null, id: null } };

const reducer = (state, { type, payload }) => {
	switch (type) {
		case "LOGIN_SUCCESS":
			!!payload.token && localStorage.setItem("token", payload.token);
			return { ...state, user: payload.user, authStatus: "success" };
		case "LOGIN_FAIL":
			localStorage.removeItem("token");
			return { ...state, user: null, authStatus: "failed" };
		case "LOGOUT":
			localStorage.removeItem("token");
			return { ...state, user: null, authStatus: null, currentBoard: { role: null, id: null } };
		case "SET_ROLE":
			return { ...state, currentBoard: { role: payload.role, id: payload.boardId } };
		default:
			return state;
	}
};

export const UserProvider = ({ children }) => {
	const [user, dispatchUser] = useReducer(reducer, initialState);

	useEffect(() => {
		return () => {};
	}, []);

	return <UserContext.Provider value={[user, dispatchUser]}>{children}</UserContext.Provider>;
};
