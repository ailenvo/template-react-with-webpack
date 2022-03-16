export interface ENV {
  CUSTOM_NODE_ENV: string;
  API_ENDPOINT: string;
  PUPLIC_KEY_PAYMENT: string;
  PRIVATE_KEY_PAYMENT: string;
}

export const envConfig: ENV = {
  CUSTOM_NODE_ENV: process.env.REACT_APP_CUSTOM_NODE_ENV ?? "",
  API_ENDPOINT: process.env.REACT_APP_API_ENDPOINT ?? "",
  PUPLIC_KEY_PAYMENT: process.env.REACT_APP_PUPLIC_KEY_PAYMENT ?? "",
  PRIVATE_KEY_PAYMENT: process.env.REACT_APP_PRIVATE_KEY_PAYMENT ?? "",
};
