import { USERS } from "consts";
import * as BaseAPI from "../base";
import { IUser, IBank } from '../../types';
import { formatUsers, formatUser, formatBank, formatDeposits, formatWithdrawals, formatTransfers } from '../../formatters/index';

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

    return user
  } catch (err) {
    console.log("err", err);
    return undefined;
  }
};

export const getUserDeposits = async (dwollaId: string) => {
  try {
    const response = await BaseAPI.getRequest(`${USERS}/${dwollaId}/deposit`);

    return formatDeposits(response) || [];
  } catch (err) {
    console.log("err", err);
    return undefined;
  }
}

export const getUserWithdrawals = async (dwollaId: string) => {
  try {
    const response = await BaseAPI.getRequest(`${USERS}/${dwollaId}/withdraw`);

    return formatWithdrawals(response) || [];
  } catch (err) {
    console.log("err", err);
    return undefined;
  }
}

export const getUserTransfers = async (dwollaId: string) => {
  try {
    const response = await BaseAPI.getRequest(`${USERS}/${dwollaId}/transfer`);

    return formatTransfers(response) || [];
  } catch (err) {
    console.log("err", err);
    return undefined;
  }
}