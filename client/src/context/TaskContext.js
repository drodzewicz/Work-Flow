import React, { createContext } from "react";

export const TaskContext = createContext();

export const TaskProvider = ({ values, children }) => {
	return <TaskContext.Provider value={values}>{children}</TaskContext.Provider>;
};
