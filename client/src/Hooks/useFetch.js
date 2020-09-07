import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const fetchDataLogic = async (url, method, token, payload, setRes) => {
	let headers = {};
	if (!!token) headers = { Authorization: localStorage.getItem("token") };
	setRes((prevState) => ({ ...prevState, isLoading: true }));
	try {
		const response = await axios({ method, url, data: payload, headers });
		setRes({ data: response.data, isLoading: false, error: null });
		return { data: response.data, error: null };
	} catch (error) {
		setRes({ data: null, isLoading: false, error: error.response });
		return { data: null, error: error.response };
	}
};

export const useFetchData = ({ url, method, token, payload }) => {
	const [res, setRes] = useState({ data: null, error: null, isLoading: false });

	useEffect(() => {
		const fetchData = () => fetchDataLogic(url, method, token, payload, setRes)
		fetchData();
		return () => {};
	}, [url, method, token, payload]);

	return res;
};

export const useCallFetchData = ({ url, method, token }) => {
	const [res, setRes] = useState({ data: null, error: null, isLoading: false });

	const callAPI = useCallback(
		async (payload) => {
			return await fetchDataLogic(url, method, token, payload, setRes)
		},
		[url, method, token]
	);
	return [res, callAPI];
};
