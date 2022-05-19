import { useState } from 'react'
import { DataTypeProvider, FilteringState, IntegratedFiltering, IntegratedPaging, IntegratedSorting, PagingState, SortingState } from '@devexpress/dx-react-grid';
import {
	Grid,
	PagingPanel,
	Table,
	TableFilterRow,
	TableHeaderRow
} from '@devexpress/dx-react-grid-material-ui';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles({
	tableStriped: {
		'& tbody tr:nth-of-type(odd)': {
			backgroundColor: fade('#aacfef', 0.15),
		},
	},
});

const TableComponentBase = (props: any) => {
	const classes = useStyles()
	return <Table.Table className={classes.tableStriped} {...props} />;
};

const UserBankFormatter = ({ value }: any) => {
	const history = useHistory();
	return (
		<div
			style={{ cursor: 'pointer', textDecoration: 'underline' }}
			onClick={() => history.push(`/bank/${value}`)}>
			{value}
		</div>
	);
}

const UsernameFormatter = ({ value, row, column }: any) => {
	const val = column.keyId ? row[column.keyId] : value
	const history = useHistory();
	return (
		<div
			style={{ cursor: 'pointer', textDecoration: 'underline' }}
			onClick={() => history.push(`/user/${val}`)}>
			{value}
		</div>
	);
}

const UserBankTypeProvider = (props: any) => (
	<DataTypeProvider formatterComponent={UserBankFormatter} {...props} />
);

const UsernameTypeProvider = (props: any) => (
	<DataTypeProvider formatterComponent={UsernameFormatter} {...props} />
);

const TransactionIdFormatter = ({ value }: any) => {
	const history = useHistory();
	return (
		<div
			style={{ cursor: 'pointer', textDecoration: 'underline' }}
			onClick={() => history.push(`/transaction/${value}`)}>
			{value}
		</div>
	);
}

const TransactionIdTypeProvider = (props: any) => (
	<DataTypeProvider formatterComponent={TransactionIdFormatter} {...props} />
);

const FilterTable = ({columns, rows}: any) => {
	const transactionIdColumn = ['transactionId'];
	const usernameColumn = ['username', 'name'];
	const userBankColumn = ['userBank'];
	const berksharesBankColumn = ['berksharesBank'];

	const compareAmount = (a: string, b: string) => {
		return Number(a) < Number(b) ? -1 : 1
	}

	const [integratedSortingColumnExtensions] = useState([
		{ columnName: 'amount', compare: compareAmount },
		{ columnName: 'outstandingBalance', compare: compareAmount },
	]);

	const [tableColumnExtensions] = useState([
	{ columnName: 'subject', width: 300 },
	]);

	return (
		<Paper>
			<Grid rows={rows} columns={columns}>
				<TransactionIdTypeProvider for={transactionIdColumn} />
				<UsernameTypeProvider for={usernameColumn} />
				<UserBankTypeProvider for={userBankColumn} />
				<UserBankTypeProvider for={berksharesBankColumn} />
				<FilteringState defaultFilters={[]} />
				<IntegratedFiltering />
				<SortingState />
				<IntegratedSorting 
					columnExtensions={integratedSortingColumnExtensions}
				/>
				<PagingState defaultCurrentPage={0} pageSize={10} />
				<IntegratedPaging />
				<Table tableComponent={TableComponentBase} />
				<TableHeaderRow showSortingControls/>
				<TableFilterRow />
				<PagingPanel />
			</Grid>
		</Paper>
	);
};

export default FilterTable