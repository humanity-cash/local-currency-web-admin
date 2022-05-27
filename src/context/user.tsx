import React, { useEffect, useState } from 'react';
import { UserAPI } from "api";

export enum UserApiStatus {
  Loading,
}

export interface IUserContext {
  loading?: boolean,
  users?: any | undefined,
  getUsers: any,
  getUserDetail: any
}

const defaultState: IUserContext = {
  loading: true,
  getUsers: () => {console.log("get users")},
  getUserDetail: (dwollaId: string) => {console.log(dwollaId)}
};

export const UserContext = React.createContext(defaultState)

const UserProvider: React.FunctionComponent = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState<any | undefined>(undefined)

  useEffect(() => {
    getUsers()
  }, [])

  const getUsers = async () => {
    setLoading(true)
    const users = await UserAPI.getAllUsers();
    setUsers(users)
    setLoading(false)
  }

  const getUserDetail = async (dwollaId: string) => {
    const temp = {...users}
    const user = await UserAPI.getUserDetail(dwollaId)
    const bank = await UserAPI.getFundingSource(dwollaId)
    const deposits = await UserAPI.getUserDeposits(dwollaId)
    const withdrawals = await UserAPI.getUserWithdrawals(dwollaId)
    const transfers = await UserAPI.getUserTransfers(dwollaId)

    if(user) {
      user.bank = bank
      user.deposits = deposits
      user.withdraws = withdrawals
      user.transfers = transfers
      temp[user.userId] = user
    }
    
    setUsers(temp)
  }

  const state: IUserContext = {
    loading,
    users,
    getUsers,
    getUserDetail
  }

  return <UserContext.Provider value={state}>{children}</UserContext.Provider>
}

export default UserProvider