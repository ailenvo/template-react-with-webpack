import storage from "redux-persist/lib/storage";
import { IUser } from "../../models/user/user.models";

export const USER_TOKEN_KEY = "userToken";
const USER_KEY = "user";
const FCM_TOKEN_KEY = "fcmToken";

const getExpiryEpoch = (seconds: number) => {
  var t = new Date();
  t.setSeconds(t.getSeconds() + seconds);
  return t.getSeconds();
};

const storeToken = async (token: string) => {
  await storage.setItem(USER_TOKEN_KEY, token);
};

const getAccessToken = async () => {
  const tokenString = await storage.getItem(USER_TOKEN_KEY);

  return tokenString;
};

const clear = async () => {
  await storage.removeItem(USER_TOKEN_KEY);
  await storage.removeItem(USER_KEY);
};

const hasValidToken = async () => {
  const tokenString = await storage.getItem(USER_TOKEN_KEY);
  return Boolean(tokenString);
};

const storeUser = async (user: IUser) => {
  await storage.setItem(USER_KEY, JSON.stringify(user));
};

const getUser = async () => {
  const user = await storage.getItem(USER_KEY);
  if (!user) {
    return null;
  }
  return JSON.parse(user) as IUser;
};

const storeFCMToken = async (token: string) => {
  await storage.setItem(FCM_TOKEN_KEY, token);
};

const getFCMToken = async () => {
  const token = await storage.getItem(FCM_TOKEN_KEY);
  return token || "";
};

const authTokens = {
  getExpiryEpoch,
  storeToken,
  getAccessToken,
  hasValidToken,
  clear,
  storeUser,
  getUser,
  storeFCMToken,
  getFCMToken,
};

export default authTokens;
