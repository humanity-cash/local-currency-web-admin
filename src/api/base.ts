import axios from "axios";
import { getSession } from "services/aws";

/**ENV! */
export const CORE_API_URL = "https://baklava.api.humanity.cash";
const httpRequest = axios.create({
  baseURL: CORE_API_URL,
});

httpRequest.interceptors.request.use(async function (config) {
  try {
    const expiration = window.localStorage.getItem("expiration") ?? "";
    const expired = tokenIsExpired(expiration);

    if (expired) {
      const session: any = await getSession();
      config.headers.authorization = session.accessToken.jwtToken;
    } else {
      const accessToken = window.localStorage.getItem("accessToken");
      config.headers.authorization = accessToken;
    }
  } catch (err: any) {
    console.log(`get session error...: ${err}`);
  }
  return config;
});

function tokenIsExpired(tokenExpiry: string): boolean {
  try {
    const now = Math.floor(Date.now() / 1000);
    const expiry = parseInt(tokenExpiry);
    return now >= expiry;
  } catch (err) {
    return true;
  }
}

type Query = string;
type Path = string;
type Body = Record<string, unknown>;

const _getRequest = (query: Query) => () => httpRequest.get(query);
const _postRequest = (path: Path, body: Body) => () =>
  httpRequest.post(path, body);

export const getRequest = (query: Query) => ErrorHandler(_getRequest(query));
export const postRequest = (path: Path, body: Body) =>
  ErrorHandler(_postRequest(path, body));

const ErrorHandler = async (requestHandler: () => void) => {
  try {
    const response = await requestHandler();
    return response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    const readbleError = err?.toJSON().message;
    console.log(`Http Request Error: ${readbleError}`);
    return readbleError;
  }
};
