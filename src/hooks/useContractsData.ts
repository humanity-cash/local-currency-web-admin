import { useEffect } from "react";
import { useStore } from "react-hookstore";
import { MockContractsData } from "../mock";
import { CONTRACTS_STORE } from "../store";
import { ConfigurationState, ConfigurationData } from "../types";
import { ConfigurationAPI } from "api";

const useConfigurationState = (): ConfigurationState => {
  const [ConfigurationState, setConfigurationState] = useStore(CONTRACTS_STORE);
  useEffect(() => {
    updateHealthData()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // setConfigurationState((pv: any) => ({ ...pv, data: MockContractsData }));
  }, []);

  const updateHealthData = async () => {
    const health = await ConfigurationAPI.getHealth();
    console.log('health ===> ', health)
    if(!health) {
      setConfigurationState((pv: any) => ({ ...pv, data: [] }));
      return
    }
    const data = [
      createContractsData("Token", health.token, 1324171354, undefined, 1.04),
      createContractsData("Wallet", health.walletFactory, 1403500365, undefined, 0.15),
      createContractsData("Controller", health.controller, 60483973, health.controllerStatus === 'ACTIVE' ? 1 : 0, 0.8)
    ]
    setConfigurationState((pv: any) => ({ ...pv, data: data }));
  }

  const createContractsData = (
    name: string,
    address: string,
    deployedAt: number,
    status: number | undefined,
    version: number
  ): ConfigurationData => {
    return { name, address, deployedAt, status, version };
  };

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  return ConfigurationState;
};

export default useConfigurationState;
