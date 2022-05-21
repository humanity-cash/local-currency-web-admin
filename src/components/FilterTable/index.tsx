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
import TableCell from '@material-ui/core/TableCell';
import { Input } from '@material-ui/core';

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

const UnitsFilterCell = ({ filter, onFilter }: any) => {
	const [focused, setFocused] = useState(false);

	return (
		<TableCell >
		<Input
			style={{width: '100%'}}
			type={focused ? 'date' : 'text'}
			value={filter ? filter.value : ''}
			onChange={e => onFilter(e.target.value ? { value: e.target.value } : null)}
			placeholder="Filter..."
			onFocus={() => setFocused(true)}
			onBlur={() => setFocused(false)}
		/>
		</TableCell>
	);

}
  
  const FilterCell = (props: any) => {
	const { column } = props;
	if (column.name === 'createdAt' || column.name === 'confirmedAt') {
	  return <UnitsFilterCell {...props} />;
	}
	return <TableFilterRow.Cell {...props} />;
  };
  
  
const FilterTable = ({columns, rows}: any) => {
	const transactionIdColumn = ['coming_soon'];
	const usernameColumn = ['username', 'name', 'fromUser', 'toUser'];
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
				<TableFilterRow 
					cellComponent={FilterCell}
				/>
				<PagingPanel />
			</Grid>
		</Paper>
	);
};

export default FilterTable