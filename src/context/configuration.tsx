import React, { useEffect, useState } from 'react';
import { IHealth } from '../types';
import { ConfigurationAPI } from "api";

export enum ConfigurationStatus {
  Loading,
}

export interface IConfiguration {
  loading?: boolean,
  healthData?: IHealth | undefined,
  updateHealthData: any,
  onPause: any,
}

const defaultState: IConfiguration = {
  loading: true,
  updateHealthData: () => {console.log('setHealthData')},
  onPause: () => {console.log('onPause')}
};

export const ConfigurationContext = React.createContext(defaultState)

const ConfigurationProvider: React.FunctionComponent = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const [healthData, setHealthData] = useState<IHealth | undefined>(undefined)

  useEffect(() => {
    updateHealthData()
  }, [])

  const updateHealthData = async () => {
    setLoading(true)
    const health = await ConfigurationAPI.getHealth();
    setHealthData(health)
    setLoading(false)
  }

  const onPause = async (isPaused: boolean) => {
    setLoading(true)
    if(isPaused) {
      await ConfigurationAPI.unpauseAdmin()
    } else {
      await ConfigurationAPI.pauseAdmin()
    }
    updateHealthData()
  }

  const state: IConfiguration = {
    loading,
    healthData,
    updateHealthData,
    onPause
  }

  return <ConfigurationContext.Provider value={state}>{children}</ConfigurationContext.Provider>
}

export default ConfigurationProvider