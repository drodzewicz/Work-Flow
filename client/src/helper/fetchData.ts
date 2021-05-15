import axios, { Method } from "axios";

interface callAPIParams {
  url: string;
  method: Method;
  token?: boolean;
  payload?: any;
  setLoading?: (state: boolean) => void;
}

const callAPI = async ({ url, method, token, payload, setLoading }: callAPIParams) => {
  let headers = {};
  if (!!token) headers = { Authorization: localStorage.getItem("token") };
  !!setLoading && setLoading(true);
  try {
    const res = await axios({ method, url: `/api${url}`, data: payload, headers });
    !!setLoading && setLoading(false);
    return { data: res.data, error: null, status: res.status };
  } catch (error) {
    !!setLoading && setLoading(false);
    return { data: null, error: error.response?.data, status: error.response?.status };
  }
};

export default callAPI;
