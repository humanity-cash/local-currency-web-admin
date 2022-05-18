import { TableTemplate } from 'components';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { UserData } from 'types';
import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../context/user';
import { IUser } from '../../types';
import Loading from '../loading';

interface Column {
  id: keyof UserData;
  keyId?: string;
  label: string;
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
			id: 'name',
			keyId: 'userId',
			label: 'Name',
			clickable: true,
			onClick: (value: string) => history.push(`/user/${value}`),
		},
		{ id: 'email', label: 'Email', minWidth: 170 },
		{ id: 'dwollaId', label: 'Dwolla Id', minWidth: 100 },
		{
			id: 'outstandingBalance',
			label: 'Balance',
			format: (value: number) => 'B$ ' + value.toFixed(2),
		},
		{
			id: 'blockchainAddress',
			label: 'Wallet Address',
			format: (value: string) => value,
		},
		// {
		// 	id: 'address',
		// 	label: 'address',
		// 	format: (value: string) => value,
		// },
		{
			id: 'type',
			label: 'Type',
			format: (value: string) => value,
		},
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
					dwollaId: user.dwollaId,
					outstandingBalance: user.availableBalance,
					blockchainAddress: user.address,
					address: "Holloway 89832, Boston",
					type: user.correlationId.includes('business') ? 'Business' : 'Personal'
				}
			}))
		}
	}, [users])

	if(!userData) {
		return <Loading />
	}

	return <TableTemplate data={userData} columns={columns} />;
};

export default UsersTable;
