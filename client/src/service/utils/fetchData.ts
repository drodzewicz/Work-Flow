import axios, { Method, AxiosResponse } from "axios";

export interface callAPIParams {
  url: string;
  method: Method;
  token?: boolean;
  payload?: any;
  query?: object;
  setLoading: ((state: boolean) => void) | undefined;
}

function responseHandler<T>(response: AxiosResponse<T>) {
  return {
    data: response.data,
    error: null,
    status: response.status,
  };
}

const errorHandler = (error: any) => {
  return {
    data: null,
    error: error.response?.data,
    status: error.response?.status,
  };
};

const parseQueryString = (query?: object) => {
  let queryString = "";
  if (!!query) {
    queryString = Object.entries(query)
      .filter(([_, val]) => val !== undefined)
      .map(([key, val]) => `${key}=${val}`)
      .join("&");
    queryString = "?" + queryString;
  }
  return queryString;
};

async function callAPI<T>({ url, method, query, token, payload, setLoading }: callAPIParams) {
  let headers = {};
  if (!!token) headers = { Authorization: localStorage.getItem("token") };
  !!setLoading && setLoading(true);

  const queryString = parseQueryString(query);

  try {
    const res = await axios({ method, url: `/api${url}${queryString}`, data: payload, headers });
    !!setLoading && setLoading(false);
    return responseHandler<T>(res);
  } catch (error) {
    !!setLoading && setLoading(false);
    return errorHandler(error);
  }
}

export default callAPI;
