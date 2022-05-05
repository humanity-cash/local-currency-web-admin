import React, { useEffect, useState } from 'react';
import { IUser } from '../types';
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
    setLoading(true)
    const temp = {...users}
    const user = await UserAPI.getUserDetail(dwollaId)
    if(user) {
      temp[user.userId] = user
    }
    setUsers(temp)
    setLoading(false)
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