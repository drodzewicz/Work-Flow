import axios from "axios";

const callAPI = async ({ url, method, token, payload, setLoading }) => {
	let headers = {};
	if (!!token) headers = { Authorization: localStorage.getItem("token") };
	!!setLoading && setLoading(true);
	try {
		const res = await axios({ method, url, data: payload, headers });
        !!setLoading && setLoading(false);
		return { data: res.data, error: null, status: res.status };
	} catch (error) {
		!!setLoading && setLoading(false);
		return { data: null, error: error.response?.data, status: error.response?.status };
	}
};

export default callAPI;
