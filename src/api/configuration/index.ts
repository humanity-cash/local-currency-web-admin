import { HEALTH } from "consts";
import * as BaseAPI from "../base";
import { IHealth } from '../../types';

export const getHealth = async (): Promise<IHealth | undefined> => {
  try {
    const response = await BaseAPI.getRequest(HEALTH);

    return response?.data;
  } catch (err) {
    console.log("err", err);
    return undefined;
  }
};