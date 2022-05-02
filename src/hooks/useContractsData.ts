import { useEffect } from "react";
import { useStore } from "react-hookstore";
import { CONTRACTS_STORE } from "../store";
import { IHealth } from "../types";
import { ConfigurationAPI } from "api";

const useConfigurationData = (): IHealth => {
  const [healthData, setHealthData] = useStore(CONTRACTS_STORE);
  useEffect(() => {
    updateHealthData()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // setConfigurationState((pv: any) => ({ ...pv, data: MockContractsData }));
  }, []);

  const updateHealthData = async () => {
    const health = await ConfigurationAPI.getHealth();
    setHealthData(health)
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  return healthData;
};

export default useConfigurationData;
