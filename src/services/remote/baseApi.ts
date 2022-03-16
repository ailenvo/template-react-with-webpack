import axios, { AxiosRequestConfig } from "axios";
import { ROUTE_PATH } from "../../common/constants/app.constant";
import { envConfig } from "../../config/env.config";
import { BaseResponse } from "../../models/common/models.type";
import authTokens from "../local/auth-tokens";

export enum StatusCode {
  Unauthorized = 401,
  Forbidden = 403,
  TooManyRequests = 429,
  InternalServerError = 500,
}

export enum Message {
  NetworkError = "Network Error",
}

type ErrorResponse = {
  Error: any;
  IsResponse: boolean;
};

const baseApi = axios.create({
  baseURL: `${envConfig.API_ENDPOINT}/api`,
  timeout: 20000,
  withCredentials: false,
});

baseApi.interceptors.request.use(
  async (config) => {
    try {
      const token = await authTokens.getAccessToken();

      if (token != null) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log("token: ", token);
      }
      return config;
    } catch (error: any) {
      throw new Error(error);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

baseApi.interceptors.response.use(
  (response) => {
    const data: any = {
      Data: response.data,
      IsSuccess: true,
      IsError: false,
      Error: null,
    };
    return data;
  },
  (error) => {
    if (error.status === 400 && error.data) {
      // toggleNotification({
      //   type: "error",
      //   message: error.data.Message,
      // });
    }

    const errorResponse = handleDataError(error);
    //console.error('errorResponse', errorResponse);
    handleError(errorResponse);

    const data: any = {
      Data: null,
      IsSuccess: false,
      IsError: true,
      Error: errorResponse.Error,
    };
    return data;
  }
);

export function getAuthorizationToken() {
  return baseApi.defaults.headers.common.Authorization;
}

export function removeAuthorizationToken() {
  delete baseApi.defaults.headers.common.Authorization;
}

function handleDataError(error: any) {
  let errorResponse: ErrorResponse = {
    Error: error,
    IsResponse: false,
  };
  // Error Response
  if (error.response && error.response.data) {
    //console.error('ErrorResponse: ', JSON.stringify(error.response.data));
    errorResponse.Error = error.response.data;
    errorResponse.IsResponse = true;
  }
  // Error Handle
  else if (error.message && error.name === "Error") {
  }

  return errorResponse;
}

const handleError = async (errorResponse: ErrorResponse) => {
  const error = errorResponse.Error;
  const isResponse = errorResponse.IsResponse;
  const { code } = error;
  let isAlert = isResponse;
  let message = error.message;

  switch (code) {
    case StatusCode.InternalServerError: {
      message = "Server đang có lỗi. Vui lòng thử lại sau!";
      // Handle InternalServerError
      break;
    }
    case StatusCode.Forbidden: {
      message = "Bạn không có quyền thực hiện chức năng này!";
      // Handle Forbidden
      break;
    }
    case StatusCode.Unauthorized: {
      isAlert = false;

      await authTokens.clear();
      // redirect to login page
      if (window.location.href.indexOf(ROUTE_PATH.LOGIN) === -1) {
        window.location.href = ROUTE_PATH.LOGIN;
      }

      break;
    }
    case StatusCode.TooManyRequests: {
      // Handle TooManyRequests
      break;
    }
  }

  if (isAlert && message) {
    // toggleNotification({
    //   type: "error",
    //   message: message,
    // });
  }
};

// const initApi = async (): Promise<string | null> => {
//   const token = await AsyncStorage.getItem(USER_TOKEN_KEY);

//   if (token != null) {
//     baseApi.defaults.headers.common.Authorization = `Bearer ${token}`;
//   }

//   return token;
// };

const _request = <T = any, R = BaseResponse<T>>(
  config: AxiosRequestConfig
): Promise<R> => {
  return baseApi.request(config);
};

const _get = <T = any, R = BaseResponse<T>>(
  url: string,
  config?: AxiosRequestConfig
): Promise<R> => {
  return baseApi.get<T, R>(url, config);
};

const _post = <T = any, R = BaseResponse<T>>(
  url: string,
  data?: T,
  config?: AxiosRequestConfig
): Promise<R> => {
  return baseApi.post<T, R>(url, data, config);
};

const _put = <T = any, R = BaseResponse<T>>(
  url: string,
  data?: T,
  config?: AxiosRequestConfig
): Promise<R> => {
  return baseApi.put<T, R>(url, data, config);
};

const _delete = <T = any, R = BaseResponse<T>>(
  url: string,
  config?: AxiosRequestConfig
): Promise<R> => {
  return baseApi.delete<T, R>(url, config);
};

const api = {
  request: _request,
  get: _get,
  put: _put,
  post: _post,
  delete: _delete,
};

export default api;
