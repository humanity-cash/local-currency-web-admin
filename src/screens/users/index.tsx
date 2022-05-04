import { TableTemplate } from 'components';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { UserData } from 'types';
import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../context/user';

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
			keyId: 'blockchainAddress',
			label: 'Name',
			minWidth: 170,
			clickable: true,
			onClick: (value: string) => history.push(`/user/${value}`),
		},
		{ id: 'email', label: 'Email', minWidth: 170 },
		{ id: 'dowllaId', label: 'Dowlla Id', minWidth: 100 },
		{
			id: 'outstandingBalance',
			label: 'Balance',
			minWidth: 170,
			format: (value: number) => value.toFixed(2) + ' B$',
		},
		{
			id: 'lastLogin',
			label: 'Last Login',
			minWidth: 240,
			format: (value: number) => value,
		},
		{
			id: 'blockchainAddress',
			label: 'Wallet Address',
			minWidth: 170,
			format: (value: string) => value,
		},
		{
			id: 'address',
			label: 'address',
			minWidth: 170,
			format: (value: string) => value,
		},
		{
			id: 'type',
			label: 'Type',
			minWidth: 170,
			format: (value: string) => value,
		},
	];

	return columns;
};

const UsersTable = () => {
	const columns = useColumns();
	const { users } = useContext(UserContext);
	const [userData, setUserData] = useState<any[] | undefined>(undefined);

	useEffect(() => {
		if(!users) {
			setUserData(undefined)
		} else {
			setUserData(users.map((user, index) => {
				return {
					name: "John Doe",
					email: "email@email.com",
					dowllaId: user.userId,
					outstandingBalance: user.availableBalance,
					lastLogin: moment(user.createdTimestamp * 1000).format("yyyy-MM-DD HH:mm:ss"),
					blockchainAddress: user.address,
					address: "Holloway 89832, Boston",
					type: "Personal/Business"
				}
			}))
		}
	}, [users])

	if(!userData) {
		return null
	}

	return <TableTemplate data={userData} columns={columns} />;
};

export default UsersTable;
