import { OperatorData, IUser, IBank } from '../types';
import {
  AxiosPromiseResponse,
  IACHTransaction,
  ITransaction,
  IBlockchainTransaction,
} from "../types";

const formatTransactionValue = (value: number | string): string => {
  return String((Number(value) / 1000000000000000000).toFixed(2));
};

const formatTransaction = (tx: any): ITransaction => {
  return {
    transactionHash: tx.transactionHash,
    blockNumber: tx.blockNumber,
    timestamp: tx.timestamp * 1000,
    userId: tx.userId,
    operator: tx.operator,
    value: formatTransactionValue(tx.value),
  }
}

export const formatDeposits = (
  response: AxiosPromiseResponse<[]>
): IACHTransaction[] => {
  return response?.data?.map((tx: any) => {
    return {
      ...formatTransaction(tx),
      type: "Deposit"
    };
  });
};

export const formatWithdrawals = (
  response: AxiosPromiseResponse<[]>
): IACHTransaction[] => {
  return response?.data?.map((tx: any) => {
    return {
      ...formatTransaction(tx),
      type: "Withdraw"
    };
  });
};

export const formatOperators = (
  response: AxiosPromiseResponse<[]>
): OperatorData[] => {
  return response?.data?.map((data: any) => {
    return {
      operator: data.operator,
      operatorDisplayName: data.operatorDisplayName,
      totalDeposits: +data.totalDeposits,
      totalWithdrawals: +data.totalWithdrawals,
      currentOutstanding: +data.currentOutstanding,
      deposits: data.deposits.map((tx: any) => {
        return formatTransaction(tx)
      }),
      withdrawals: data.withdrawals.map((tx: any) => {
        return formatTransaction(tx)
      })
    };
  });
};

export const formatTransfers = (
  response: AxiosPromiseResponse<[]>
): IBlockchainTransaction[] => {
  return response?.data?.map((tx: any) => {
    return {
      fromUserId: tx.fromUserId,
      fromAddress: tx.fromAddress,
      toUserId: tx.toUserId,
      toAddress: tx.toAddress,
      value: formatTransactionValue(tx.value),
      transactionHash: tx.transactionHash,
      blockNumber: tx.blockNumber,
      timestamp: tx.timestamp * 1000,
      type: "Transfer",
      fromName: tx.fromName,
      toName: tx.toName,
      fromDwollaUserId: tx.fromDwollaUserId,
      toDwollaUserId: tx.toDwollaUserId,
    };
  });
};

export const formatUser = (data: any): IUser => {
  const detail = data.customer.body
  return {
    userId: data.userId,
    address: data.address,
    createdBlock: data.createdBlock,
    createdTimestamp: data.createdTimestamp,
    availableBalance: data.availableBalance,
    dwollaId: detail.id,
    firstName: detail.firstName,
    lastName: detail.lastName,
    email: detail.email,
    type: detail.type,
    status: detail.status,
    created: detail.created,
    correlationId: detail.correlationId,
    businessName: detail.businessName
  }
}

export const formatUsers = (
  response: AxiosPromiseResponse<[]>
): any => {
  const users: any = {}
  response?.data?.forEach((data) => {
    const user = formatUser(data)
    users[user.userId] = user
  })
  
  return users
};

export const formatBank = (
  res: AxiosPromiseResponse<any>
): IBank | undefined => {
  if (!res.data) return undefined;

  const sources = res.data?.body?._embedded["funding-sources"]

  if (sources?.length > 0) {
    for (let i = 0; i < sources.length; i++) {
      const source = sources[i];
      if (source.type === "bank") {
        return {
          bankName: source.bankName,
          bankAccountType: source.bankAccountType,
          createdAt: source.created,
          name: source.name,
        }
      }
    }
  }
  
  return undefined;
};