import { Slideshow } from '@material-ui/icons';
import PausePresentationTwoToneIcon from '@material-ui/icons/PausePresentationTwoTone';
import { TableTemplate } from 'components';
import { useConfigurationState } from 'hooks';
import moment from 'moment';
import { useStore } from 'react-hookstore';
import { MODAL_STORE } from 'store';
import { ConfigurationData, ConfigurationState, ModalState } from 'types';

interface Column {
  id: keyof ConfigurationData; 
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: any) => any;
}

interface ActionProps {
	status: boolean
};

const Actions = (props: ActionProps) => {
  const { status } = props;
  const [, setModalState]: [ModalState, any] = useStore(MODAL_STORE);

  const actionController = (status: boolean) => {
    setModalState({
      isOpen: true, 
      type: status ? 'STOP_CONTRACT' : 'START_CONTRACT',
      title: status ? 'Stop Contract' : 'Start Contract',
      confirmHandler: () => {console.log(!status ? 'stop contract...' : 'start contract...')}
    })
  }

  return (
		<div style={{ display: 'inline-flex' }}>
      <div 
        style={{ cursor: 'pointer' }} 
        onClick={
          () => {actionController(status)}
        }
      >
        { status ?
            <PausePresentationTwoToneIcon />
          :
            <Slideshow />
        }
			</div>
		</div>
  );
};

const columns: Column[] = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'version', label: 'Version', minWidth: 170 },
  { id: 'address', label: 'Address', minWidth: 100 },
  {
    id: 'deployedAt',
    label: 'Deployed At',
    minWidth: 170,
    format: (value: number) =>  moment().format(),
  },
  {
    id: 'status',
    label: 'Status',
    minWidth: 170,
    format: (value: number) =>  value === undefined ? '' : value === 1 ? 'ACTIVE' : 'DISABLED'
  },
  {
    id: 'status',
    label: 'Actions',
    minWidth: 170,
    format: (value: number | undefined) => value === undefined ? null : <Actions status={value == 1} />
  },
];


const ContractsTable = () => {
  const state: ConfigurationState = useConfigurationState();

  return (
		<TableTemplate data={state.data} columns={columns} />
 );
}

export default ContractsTable;