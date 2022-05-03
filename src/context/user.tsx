import React, { useEffect, useState } from 'react';
import { IUser } from '../types';
import { UserAPI } from "api";

export enum UserApiStatus {
  Loading,
}

export interface IUserContext {
  loading?: boolean,
  users?: IUser[] | undefined,
  getUsers: any
}

const defaultState: IUserContext = {
  loading: true,
  getUsers: (userId: string) => {console.log(userId)}
};

export const UserContext = React.createContext(defaultState)

const UserProvider: React.FunctionComponent = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState<IUser[] | undefined>(undefined)

  useEffect(() => {
    getUsers()
  }, [])

  const getUsers = async () => {
    setLoading(true)
    const users = await UserAPI.getAllUsers();
    setUsers(users)
    setLoading(false)
  }

  const state: IUserContext = {
    loading,
    users,
    getUsers
  }

  return <UserContext.Provider value={state}>{children}</UserContext.Provider>
}

export default UserProvider