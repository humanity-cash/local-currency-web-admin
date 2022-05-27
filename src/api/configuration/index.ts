import { HEALTH, ADMIN_PAUSE, ADMIN_UNPAUSE } from "consts";
import * as BaseAPI from "../base";
import { IHealth } from "../../types";

export const getHealth = async (): Promise<IHealth | undefined> => {
  try {
    const response = await BaseAPI.getRequest(HEALTH);

    return response?.data;
  } catch (err) {
    console.log("err", err);
    return undefined;
  }
};

export const pauseAdmin = async (): Promise<string> => {
  try {
    const response = await BaseAPI.postRequest(ADMIN_PAUSE, {});

    console.log(ADMIN_PAUSE, response);
    return response?.data;
  } catch (err) {
    console.log("err", err);
    return JSON.stringify(err);
  }
};

export const unpauseAdmin = async (): Promise<string> => {
  try {
    const response = await BaseAPI.postRequest(ADMIN_UNPAUSE, {});

    console.log(ADMIN_UNPAUSE, response);
    return response?.data;
  } catch (err) {
    console.log("err", err);
    return JSON.stringify(err);
  }
};
