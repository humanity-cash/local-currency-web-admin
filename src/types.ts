import { AxiosResponse } from "axios";

export type AxiosPromiseResponse<T = unknown> = AxiosResponse<T>;

export interface ConfigurationData {
  name: string;
  address: string;
  deployedAt: number;
  status: number | undefined;
  version: number;
}

export interface ConfigurationState {
  data: ConfigurationData[];
}

export interface ModalState {
  type: string;
  isOpen: boolean;
  title: string;
  modalProps: Record<string, unknown>;
  confirmHandler?: () => any;
}

export interface BlockchainDataState {
  data: BlockchainData[];
}

type TransactionStatus = "Pending" | "Success" | "Fail";
type Time = number;
type ACHType = "Funding" | "Redemption";
type Username = string;
type Hash = string;

export interface UserData {
  name: string;
  email: string;
  dwollaId: string;
  outstandingBalance: number;
  lastLogin: Time;
  blockchainAddress: string;
  address: string;
  type: "Business" | "Personal";
  createdAt: string;
}

export interface BlockchainData {
  transactionHash: Hash;
  from: Hash;
  to: Hash;
  fromUser: Username;
  toUser: Username;
  fromId: string;
  toId: string;
  type: "Deposit" | "Withdraw" | "Transfer In" | "Transfer Out";
  createdAt: string;
  amount: string;
  blocksConfirmed: number;
}

export interface ACHData {
  userId: string;
  username: Username;
  type: ACHType;
  createdAt: Time;
  confirmedAt: Time;
  amount: number;
  userBank: string;
  berksharesBank: string;
  bankAccount: string;
  status: TransactionStatus;
  transactionHash: string;
}

export interface OperatorData {
  operator: string;
  operatorDisplayName: string;
  totalDeposits: number;
  totalWithdrawals: number;
  currentOutstanding: number;
  deposits: ITransaction[];
  withdrawals: ITransaction[];
}

export interface ITransaction {
  transactionHash: string;
  blockNumber: number;
  timestamp: number;
  userId: string;
  operator: string;
  value: string;
}

export interface IACHTransaction {
  transactionHash: string;
  blockNumber: number;
  timestamp: number;
  userId: string;
  operator: string;
  value: string;
  type: "Transfer In" | "Transfer Out" | "Deposit" | "Withdraw";
}

export interface IBlockchainTransaction {
  fromUserId: string;
  fromAddress: string;
  toUserId: string;
  toAddress: string;
  value: string;
  transactionHash: string;
  blockNumber: number;
  timestamp: number;
  type: "Transfer In" | "Transfer Out" | "Deposit" | "Withdraw" | "Transfer";
  fromName: string;
  toName: string;
  fromDwollaUserId: string;
  toDwollaUserId: string;
}

export interface IHealth {
  blockNumber: number;
  chainId: number;
  nodeInfo: string;
  token: string;
  controller: string;
  walletCount: string;
  owner: string;
  walletFactory: string;
  controllerStatus: "ACTIVE" | "PAUSED";
}

export interface ACHDataState {
  data: ACHData[];
}

export interface OperatorDataState {
  data: OperatorData[];
}

export interface IBank {
  bankName: string;
  bankAccountType: string;
  createdAt: string;
  name: string;
}

export interface IUser {
  userId: string;
  address: string;
  createdBlock: string;
  createdTimestamp: number;
  availableBalance: number;
  dwollaId: string;
  firstName: string;
  lastName: string;
  email: string;
  type: string;
  status: string;
  created: string;
  correlationId: string;
  businessName: string;
  bank?: IBank | undefined;
  deposits?: IACHTransaction[] | undefined;
  withdraws?: IACHTransaction[] | undefined;
  transfers?: IBlockchainTransaction[] | undefined;
}

export enum UserTables {
  UserDepositTransactions,
  UserWithdrawalTransactions,
  UserTransferTransactions,
}
