import { FilterTable } from 'components';
import { useState, useEffect, useContext } from 'react';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { IUser } from '../../types';
import { UserContext } from '../../context/user';

interface Column {
  name: keyof IUserTransferColumn;
  title: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: any) => any;
  onClick?: (value: any) => any;
  clickable?: boolean;
}

const useColumns = () => {
	const history = useHistory();
	const columns: Column[] = [
		{
			name: 'transactionHash',
			title: 'Hash',
			clickable: true,
			onClick: (value: string) => history.push(`/transaction/bc/${value}`),
		},
		{
			name: 'fromName',
			title: 'From',
		},
		{
			name: 'toName',
			title: 'To',
		},
		{
			name: 'fromAddress',
			title: 'From Address',
		},
		{
			name: 'toAddress',
			title: 'To Address',
		},
		{
			name: 'type',
			title: 'Type',
		},
		{
			name: 'amount',
			title: 'Amount',
			format: (value: number) => 'B$ ' + value,
		},
		{
			name: 'createdAt',
			title: 'Created At',
			format: (value: number) => moment().format(),
		},
		{
			name: 'blockNumber',
			title: 'Blocks Confirmed',
		},
	];

	return columns;
};

interface IUserTransferColumn {
	transactionHash: string;
	fromName: string;
	toName: string;
	fromAddress: string;
	toAddress: string;
	type: string;
	amount: string;
	createdAt: string;
	blockNumber: number;
}
  
export interface UserTransferDataTableProps {
	user: IUser
}

const UserTransferDataTable = (props: UserTransferDataTableProps) => {
	const { user } = props
	const { users } = useContext(UserContext)
	const columns: Column[] = useColumns();
	const [data, setData] = useState<IUserTransferColumn[]>([])

	useEffect(() => {
		if(user.transfers) {
			setData(
				user.transfers.map((tx) => {
					return {
						transactionHash: tx.transactionHash,
						fromName: tx.fromName,
						toName: tx.toName,
						fromAddress: tx.fromAddress,
						toAddress: tx.toAddress,
						type: tx.type,
						amount: tx.value,
						createdAt: moment(tx.timestamp).format("yyyy-MM-DD HH:mm:ss"),
						blockNumber: tx.blockNumber
					}
				})
			)
		}
	}, [user])

	return (
		<div style={{paddingLeft: '19em', paddingTop: '2em',  paddingRight: '2em'}}>
			<FilterTable rows={data} columns={columns} />
		</div>
	);
}

export default UserTransferDataTable;