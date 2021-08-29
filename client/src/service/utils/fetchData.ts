import axios, { Method, AxiosResponse } from "axios";
import { serviceParams } from "types/service/request/general";

export interface callAPIParams extends serviceParams {
  url: string;
  method: Method;
  token?: boolean;
  payload?: any;
  query?: object;
}

function responseHandler<T>(response: AxiosResponse<T>) {
  return {
    data: response.data,
    error: null,
    status: response.status,
  };
}

function errorHandler(error: any) {
  return {
    data: null,
    error: error.response?.data,
    status: error.response?.status,
  };
}

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

async function callAPI<T>({
  url,
  method,
  query,
  token,
  payload,
  setLoading,
  cancelToken,
}: callAPIParams) {
  let headers = {};
  if (!!token) headers = { Authorization: localStorage.getItem("token") };
  !!setLoading && setLoading(true);

  const queryString = parseQueryString(query);
  
  try {
    const res = await axios({
      method,
      headers,
      url: `/api${url}${queryString}`,
      data: payload,
      cancelToken,
    });
    !!setLoading && setLoading(false);
    return responseHandler<T>(res);
  } catch (error) {
    if (!axios.isCancel(error)) {
      !!setLoading && setLoading(false);
    }
    return errorHandler(error);
  }
}

export default callAPI;
