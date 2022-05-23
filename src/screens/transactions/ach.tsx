import { FilterTable } from 'components';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { ACHData } from 'types';
import { iconStatus } from 'utils';
import { useContext } from 'react';
import { TransactionContext } from '../../context/transaction';
import Loading from 'screens/loading';
import { UserContext } from 'context/user';

interface Column {
  name: keyof ACHData
  keyId?: string;
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
			title: 'ID',
			// clickable: true,
			// onClick: (value: string) => history.push(`/transaction/${value}`),
		},
		{ name: 'type', title: 'Type', minWidth: 100 },
		{
			name: 'username',
			title: 'User',
			minWidth: 100,
			keyId: 'userId',
			clickable: true,
		
			onClick: (value: string) => history.push(`/user/${value}`),
		},
		{
			name: 'createdAt',
			title: 'Created At',
			minWidth: 100,
			format: (value: number) => moment().format(),
		},
		{
			name: 'confirmedAt',
			title: 'Confirmed At',
			minWidth: 100,
			format: (value: number) => moment().format(),
		},
		{
			name: 'userBank',
			title: 'User Bank',
			minWidth: 100,
			clickable: true,
			// onClick: (value: string) => history.push(`/bank/${value}`),
		},
		{
			name: 'berksharesBank',
			title: 'Berkshares Bank',
			minWidth: 100,
			clickable: true,
			// onClick: (value: string) => history.push(`/bank/${value}`),
		},
		{
			name: 'amount',
			title: 'Amount',
			minWidth: 100,
			format: (value: number) => value.toLocaleString('en-US') + ' $',
		},
		{
			name: 'status',
			title: 'Status',
			minWidth: 100,
			format: (value: any) => iconStatus(value),
		},
	];

	return columns;
};

const ACHDataTable = () => {
	const {achDataState} = useContext(TransactionContext)
	const {users} = useContext(UserContext)
	const columns = useColumns(); 

	if( !achDataState || !users ) {
		return <Loading />
	}

	return (
		<div
			style={{
				paddingLeft: '19em',
				paddingTop: '2em',
				paddingRight: '2em',
			}}>
			<FilterTable rows={achDataState.data} columns={columns} />
		</div>
	);
}

export default ACHDataTable;