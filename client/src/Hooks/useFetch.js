import { useState, useCallback } from "react";
import axios from "axios";

export const useFetchData = ({ url, method }) => {
	const [res, setRes] = useState({ data: null, error: null, isLoading: false });

	const callAPI = useCallback(
		async (payload) => {
			setRes((prevState) => ({ ...prevState, isLoading: true }));
			try {
				const response = await axios({ method, url, data: payload });
				setRes({ data: response.data, isLoading: false, error: null });
			} catch (error) {
				setRes({ data: null, isLoading: false, error: error.response });
			}
		},
		[url, method]
	);
	return [res, callAPI];
};
