import axios from "axios";
import { getSession } from 'services/aws';

/**ENV! */
const CORE_API_URL = "https://api.humanity.cash";
const httpRequest = axios.create({
  baseURL: CORE_API_URL,
});

httpRequest.interceptors.request.use(async function (config) {
  try {
    const session: any = await getSession()
    config.headers.authorization = session.accessToken.jwtToken;
    console.log('token ==========> ', config.headers.authorization)
  } catch (err: any) {
    console.log(`get session error...: ${err}`);
  }
  return config;
});

type Query = string;
type Path = string;
type Body = Record<string,unknown>;

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
