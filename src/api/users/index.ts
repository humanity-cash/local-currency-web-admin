import { USERS } from "consts";
import * as BaseAPI from "../base";
import { IUser } from '../../types';


export const getAllUsers = async (): Promise<IUser[]> => {
  try {
    const response = await BaseAPI.getRequest(USERS);

    return response.data;
  } catch (err) {
    console.log("err", err);
    return [];
  }
};