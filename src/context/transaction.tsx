import React, { useEffect, useState } from 'react';
import { ACHAPI, ContractsAPI } from 'api';
import { ACHDataState, BlockchainDataState, OperatorDataState } from '../types';
import moment from 'moment';
import { useContext } from 'react';
import { UserContext } from 'context/user';

export interface ITransactionContext {
  achDataState: ACHDataState | undefined,
  blockchainDataState: BlockchainDataState | undefined,
  operatorDataState: OperatorDataState | undefined,
}

const defaultState: ITransactionContext = {
  achDataState: undefined,
  blockchainDataState: undefined,
  operatorDataState: undefined,
};

export const TransactionContext = React.createContext(defaultState)

const TransactionProvider: React.FunctionComponent = ({ children }) => {
  const {users} = useContext(UserContext)
  const [achDataState, setACHDataState] = useState<ACHDataState | undefined>(undefined)
  const [blockchainDataState, setBlockchainDataState] = useState<BlockchainDataState | undefined>(undefined)
  const [operatorDataState, setOperatorDataState] = useState<OperatorDataState | undefined>(undefined)

  useEffect(() => {
    if(users) {
      getTransactionData()
      getOperatorData()
    }
  }, [users])

  const getTransactionData = async () => {
    const deposits = await ACHAPI.getAllDeposits();
    const withdrawals = await ACHAPI.getAllWithdrawals();
    const data = [...deposits, ...withdrawals]
      .sort((t1, t2) => {
        return t1.timestamp > t2.timestamp ? 1 : -1;
      })
      .map((tx, index) => {
        return {
          userId: tx.userId,
          username: users[tx.userId].correlationId.includes('business') ? users[tx.userId].businessName : `${users[tx.userId].firstName} ${users[tx.userId].lastName}`,
          type: tx.type,
          createdAt: moment(tx.timestamp).format("yyyy-MM-DD HH:mm:ss"),
          confirmedAt: moment(tx.timestamp).format("yyyy-MM-DD HH:mm:ss"),
          amount: tx.value,
          berksharesBank: "Bank Of Country",
          userBank: "Bank Of Country",
          bankAccount: "1G1C1G2343ER",
          status: "Success",
          transactionHash: tx.transactionHash,
        };
      });
      
    setACHDataState((pv: any) => ({ ...pv, data: data }));

    const transfers = await ContractsAPI.getAllTransfers();
    const bTransactions = transfers.map((tx) => {
      if(!users[tx.fromUserId]) {
        console.log(tx.fromUserId)
        return null
      }
      return {
        transactionHash: tx.transactionHash,
        amount: tx.value,
        from: tx.fromAddress,
        to: tx.toAddress,
        fromUser: users[tx.fromUserId].correlationId.includes('business') ? users[tx.fromUserId].businessName : `${users[tx.fromUserId].firstName} ${users[tx.fromUserId].lastName}`,
        toUser: users[tx.toUserId].correlationId.includes('business') ? users[tx.toUserId].businessName : `${users[tx.toUserId].firstName} ${users[tx.toUserId].lastName}`,
        fromId: tx.fromUserId,
        toId: tx.toUserId,
        blocksConfirmed: tx.blockNumber,
        type: tx.type,
        createdAt: moment(tx.timestamp).format("yyyy-MM-DD HH:mm:ss"),
      };
    }).filter((e) => {return e !== null});
    const blockchainData = [...bTransactions].sort((t1, t2) => {
      return t1!.createdAt > t2!.createdAt ? 1 : -1;
    });
    setBlockchainDataState((pv: any) => ({ ...pv, data: blockchainData }));
  }
  
  const getOperatorData = async () => {
    const data = await ACHAPI.getAllOperators();
    setOperatorDataState({data: data})
  }

  const state: ITransactionContext = {
    achDataState,
    blockchainDataState,
    operatorDataState,
  }

  return <TransactionContext.Provider value={state}>{children}</TransactionContext.Provider>
}

export default TransactionProvider