import { USERS } from "consts";
import * as BaseAPI from "../base";
import { IUser, IBank } from '../../types';
import { formatUsers, formatUser, formatBank } from '../../formatters/index';

export const getAllUsers = async (): Promise<any> => {
  try {
    const response = await BaseAPI.getRequest(USERS);

    return formatUsers(response);
  } catch (err) {
    console.log("err", err);
    return {}
  }
};

export const getFundingSource = async (dwollaId: string): Promise<IBank | undefined> => {
  try {
    const response = await BaseAPI.getRequest(`${USERS}/${dwollaId}/funding-sources`);

    return formatBank(response);
  } catch (err) {
    console.log("err", err);
    return undefined;
  }
}

export const getUserDetail = async (dwollaId: string): Promise<IUser | undefined> => {
  try {
    const response = await BaseAPI.getRequest(`${USERS}/${dwollaId}`);
    const user = formatUser(response.data[0]);

    const bank = await getFundingSource(dwollaId)
    user.bank = bank

    return user
  } catch (err) {
    console.log("err", err);
    return undefined;
  }
};