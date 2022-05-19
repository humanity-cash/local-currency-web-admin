import { TableTemplate } from 'components';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { UserData } from 'types';
import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../context/user';
import Loading from '../loading';
import FilterTable from '../../components/FilterTable/index';

interface Column {
  name: keyof UserData;
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
			name: 'name',
			keyId: 'userId',
			title: 'Name',
			clickable: true,
			onClick: (value: string) => history.push(`/user/${value}`),
		},
		{ name: 'email', title: 'Email', minWidth: 170 },
		{ name: 'dowllaId', title: 'Dowlla Id', minWidth: 100 },
		{
			name: 'blockchainAddress',
			title: 'Wallet Address',
			format: (value: string) => value,
		},
		{
			name: 'outstandingBalance',
			title: 'Balance',
			format: (value: number) => 'B$ ' + value.toFixed(2),
		},
		{
			name: 'type',
			title: 'Type',
			format: (value: string) => value,
		},
		{
			name: 'createdAt',
			title: 'Created Date',
		}
	];

	return columns;
};

const UsersTable = () => {
	const columns = useColumns();
	const { users, getUsers } = useContext(UserContext);
	const [userData, setUserData] = useState<any[] | undefined>(undefined);

	useEffect(() => {
		// getUsers()
	}, [])

	useEffect(() => {
		if(users) {
			setUserData(Object.keys(users).map((userId, index) => {
				const user = users[userId]
				return {
					name: user.correlationId.includes('business') ? user.businessName : `${user.firstName} ${user.lastName}`,
					userId: user.userId,
					email: user.email,
					dowllaId: user.dwollaId,
					outstandingBalance: user.availableBalance,
					blockchainAddress: user.address,
					address: "Holloway 89832, Boston",
					type: user.correlationId.includes('business') ? 'Business' : 'Personal',
					createdAt: moment(user.createdTimestamp).format("yyyy-MM-DD HH:mm:ss")
				}
			}))
		}
	}, [users])

	if(!userData) {
		return <Loading />
	}

	return (
		<div style={{paddingLeft: '19em', paddingTop: '2em',  paddingRight: '2em'}}>
			<FilterTable rows={userData} columns={columns} />
		</div>
	);

	// return <TableTemplate data={userData} columns={columns} />;
};

export default UsersTable;
