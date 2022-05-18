import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import moment from 'moment';
import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ACHTransactionsTable } from 'screens/transactions';
import BlockchainDataTable from 'screens/transactions/blockchain';
import { UserTables } from 'types';
import { UserContext } from '../../context/user';
import { IUser } from '../../types';
import UserDepositDataTable from './userDeposit';
import UserWithdrawalDataTable from './userWithdrawal';
import UserTransferDataTable from './userTransfers';

const useButtonsStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			paddingLeft: '10em',
			'& > *': {
				margin: theme.spacing(1),
			},
		},
	})
);

const outlined = 'outlined';
const contained = 'contained';
type ButtonStyles = typeof outlined | typeof contained;

const UserTableButtons = ({
	setTableType,
	currentTable,
}: {
	setTableType: any;
	currentTable: UserTables;
}) => {
	const classes = useButtonsStyles();
	const [style, setStyle] = useState<{ deposit: ButtonStyles; withdrawal: ButtonStyles;  transfer: ButtonStyles }>(
		{ deposit: outlined, withdrawal: contained, transfer: contained }
	);

	useEffect(() => {
		if (currentTable === 0) {
			setStyle({ deposit: contained, withdrawal: outlined, transfer: outlined });
		} else if (currentTable === 1) {
			setStyle({ deposit: outlined, withdrawal: contained, transfer: outlined });
		} else {
			setStyle({ deposit: outlined, withdrawal: outlined, transfer: contained });
		}
	}, [currentTable]);

	return (
		<div className={classes.root}>
			<ButtonGroup
				color='primary'
				aria-label='outlined primary button group'>
				<Button
					variant={style.deposit}
					onClick={() => {
						console.log('here')
						setTableType(UserTables.UserDepositTransactions);
					}}>
					Deposits
				</Button>
				<Button
					variant={style.withdrawal}
					onClick={() =>
						setTableType(UserTables.UserWithdrawalTransactions)
					}>
					Withdrawals
				</Button>
				<Button
					variant={style.transfer}
					onClick={() =>
						setTableType(UserTables.UserTransferTransactions)
					}>
					Transfers
				</Button>
			</ButtonGroup>
		</div>
	);
};

const useStyles = makeStyles({
	wrapper: {
		paddingTop: '1em',
		paddingLeft: '20em',
		display: 'grid',
		gridTemplateColumns: '0.5fr 1fr',
		gridRowGap: '1.2em',
	},
	achTitle: {
		paddingLeft: '1em',
		paddingTop: '0.5em',
		display: 'grid',
		fontSize: '24px'
	},
	fs18: {
		fontSize: '18px',
	},
	bctitle: {
		fontSize: '34px',
		alignItems: 'left',
		textDecoration: 'underline',
	},
	title: {
		fontSize: '34px',
		alignItems: 'left',
	},
	prop: {
		color: 'gray',
	},
});

interface RouteParams {
	id: string
}

const User = () => {
	const params = useParams<RouteParams>();
	const { users, getUserDetail } = useContext(UserContext);
	const [detailUser, setDetailUser] = useState<IUser | undefined>(undefined)
	const [tableType, setTableType] = useState<UserTables>(UserTables.UserDepositTransactions);
	const classes = useStyles();
	const address = 'Tufnell Park 32';

	useEffect(() => {
		getUserDetail(users[params.id].dwollaId)
	}, [])

	useEffect(() => {
		setDetailUser(users[params.id])
	}, [users])

	if(!detailUser) {
		return null
	}

	return (
		<div>
			<div className={classes.wrapper}>
				{/* <div className={classes.title}>{`User: ${detailUser.correlationId.includes('business') ? detailUser.businessName : `${detailUser.firstName} ${detailUser.lastName}`}`}</div> */}
				<div className={classes.title}>User</div>
				<div></div>
				<div className={classes.fs18}>
					<span className={classes.prop}>First Name: </span>
					{detailUser.firstName}
				</div>
				<div className={classes.fs18}>
					<span className={classes.prop}>Last Name: </span>
					{detailUser.lastName}
				</div>
				<div className={classes.fs18}>
					<span className={classes.prop}>Email: </span>
					{detailUser.email}
				</div>
				<div className={classes.fs18}>
					<span className={classes.prop}>Address:</span>
					{` ${address}`}
				</div>
				<div className={classes.fs18}>
					<span className={classes.prop}>Dwolla Id:</span>
					{` ${detailUser.dwollaId}`}
				</div>
				<div className={classes.fs18}>
					<span className={classes.prop}>Created At:</span>
					{` ${moment(detailUser.created).format('yyyy-MM-DD HH:mm:ss')}`}
				</div>
				<div className={classes.fs18}>
					<span className={classes.prop}>Bank:</span>
					{` ${detailUser.bank?.bankName ?? ''}`}
				</div>
				<div className={classes.fs18}>
					<span className={classes.prop}>Outstanding:</span>
					{` B$ ${detailUser.availableBalance}`}
				</div>
			</div>
			<div className={classes.achTitle}>
				<UserTableButtons
					setTableType={setTableType}
					currentTable={tableType}
				/>
			</div>
			<div>
				{tableType === 0 ? (
					<UserDepositDataTable user={detailUser}/>
				) : tableType === 1 ?(
					<UserWithdrawalDataTable user={detailUser}/>
				) : <UserTransferDataTable user={detailUser}/>}
			</div>
		</div>
	);
};

export default User;
