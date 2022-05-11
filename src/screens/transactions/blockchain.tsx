import { FilterTable } from 'components';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { BlockchainData } from 'types';
import { useContext } from 'react';
import { TransactionContext } from '../../context/transaction';
import { UserContext } from 'context/user';
import Loading from 'screens/loading';

interface Column {
  name: keyof BlockchainData;
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
			title: 'Hash',
			clickable: true,
			onClick: (value: string) => history.push(`/transaction/bc/${value}`),
		},
		{
			name: 'fromUser',
			keyId: 'fromId',
			title: 'From',
			clickable: true,
			onClick: (value: string) => history.push(`/user/${value}`),
		},
		{
			name: 'toUser',
			keyId: 'toId',
			title: 'To',
			clickable: true,
			onClick: (value: string) => history.push(`/user/${value}`),
		},
		{
			name: 'from',
			title: 'From Address',
		},
		{
			name: 'to',
			title: 'To Address',
		},
		{
			name: 'type',
			title: 'Type',
			minWidth: 100,
			format: (value: string) => value,
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
			format: (value: number) => value
		},
	];

	return columns;
};


const BlockchainDataTable = () => {
	const columns: Column[] = useColumns();
	const {blockchainDataState} = useContext(TransactionContext)
	const {users} = useContext(UserContext)

	if(!users || !blockchainDataState) {
		return <Loading />
	}

	return (
		<div style={{paddingLeft: '19em', paddingTop: '2em',  paddingRight: '2em'}}>
			<FilterTable rows={blockchainDataState.data} columns={columns} />
		</div>
	);
}

export default BlockchainDataTable;