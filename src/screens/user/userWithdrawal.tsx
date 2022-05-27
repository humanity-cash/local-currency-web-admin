import { FilterTable } from 'components';
import { useState, useEffect, useContext } from 'react';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { IUser } from '../../types';
import { UserContext } from '../../context/user';

interface Column {
  name: keyof IUserWithdrawalColumn;
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
			name: 'user',
			title: 'User',
		},
		{
			name: 'bank',
			title: 'User Bank',
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
			name: 'blocksConfirmed',
			title: 'Blocks Confirmed',
		},
	];

	return columns;
};

interface IUserWithdrawalColumn {
	transactionHash: string;
	user: string;
	createdAt: string;
	amount: string;
	blocksConfirmed: number;
	bank: string;
	status: string;
}
  
export interface UserWithdrawalDataTableProps {
	user: IUser
}

const UserWithdrawalDataTable = (props: UserWithdrawalDataTableProps) => {
	const { user } = props
	const { users } = useContext(UserContext)
	const columns: Column[] = useColumns();
	const [data, setData] = useState<IUserWithdrawalColumn[]>([])

	useEffect(() => {
		if(user.withdraws) {
			setData(
				user.withdraws.map((dp) => {
					const user = users[dp.userId]
					return {
						transactionHash: dp.transactionHash,
						user: `${user.correlationId.includes('business') ? user.businessName : `${user.firstName} ${user.lastName}`}`,
						createdAt: moment(dp.timestamp).format("yyyy-MM-DD HH:mm:ss"),
						amount: dp.value,
						blocksConfirmed: dp.blockNumber,
						bank: user.bank?.name ?? '',
						status: 'Success'
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

export default UserWithdrawalDataTable;