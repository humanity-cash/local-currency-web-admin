import { useContext } from 'react';
import { Slideshow } from '@material-ui/icons';
import PausePresentationTwoToneIcon from '@material-ui/icons/PausePresentationTwoTone';
import moment from 'moment';
import { useStore } from 'react-hookstore';
import { MODAL_STORE } from 'store';
import { ConfigurationData, ModalState } from 'types';
import {Paper, Grid, Switch, FormControlLabel} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { ConfigurationContext } from '../../context/configuration';


const useStyles = makeStyles({
  titleWrapper: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
  },
	wrapper: {
    padding: '24px',
    paddingLeft: '18em',
		display: 'grid',
  },
  title: {
    textAlign: 'center'
  },
  itemTitle: {
		display: 'grid',
    padding: '12px',
    fontSize: '16px',
  },
  itemDetail: {
		display: 'grid',
    padding: '12px',
    fontSize: '14px',
    color: 'gray'
  },
  activeSwitch: {
    position: 'absolute',
    right: 40,
    top: 20
  }
});

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
  const { healthData, onPause } = useContext(ConfigurationContext)
	const classes = useStyles();

  if( !healthData ) {
    return null   // need update to loading
  }

  return (
		<div className={classes.wrapper}>
      <Paper>
        <div className={classes.titleWrapper}>
          <h1 className={classes.title}>Smart Contracts Configuration</h1>
          <div
            className={classes.activeSwitch}
          >
            <FormControlLabel
              control={
                <Switch 
                  checked={healthData.controllerStatus === 'ACTIVE'}
                  color="primary"
                  onChange={(e) => {
                    if(window.confirm(`Are you sure to ${healthData.controllerStatus === 'ACTIVE' ? 'pause' : 'active'} contracts?`)) {
                      onPause(healthData.controllerStatus !== 'ACTIVE')
                    }
                  }}
                />
              }
              label={healthData.controllerStatus}
              labelPlacement="start"
            />
          </div>
        </div>
        <Grid container>
          <Grid className={classes.itemTitle} item xs={4} lg={2}>
            <div>Block Number</div>
          </Grid>
          <Grid className={classes.itemDetail} item xs={8} lg={4}>
            <div>{healthData.blockNumber}</div>
          </Grid>
          <Grid className={classes.itemTitle} item xs={4} lg={2}>
            <div>Chain Id</div>
          </Grid>
          <Grid className={classes.itemDetail} item xs={8} lg={4}>
            <div>{healthData.chainId}</div>
          </Grid>
          <Grid className={classes.itemTitle} item xs={4} lg={2}>
            <div>Node Info</div>
          </Grid>
          <Grid className={classes.itemDetail} item xs={8} lg={4}>
            <div>{healthData.nodeInfo}</div>
          </Grid>
          <Grid className={classes.itemTitle} item xs={4} lg={2}>
            <div>Token</div>
          </Grid>
          <Grid className={classes.itemDetail} item xs={8} lg={4}>
            <div>{healthData.token}</div>
          </Grid>
          <Grid className={classes.itemTitle} item xs={4} lg={2}>
            <div>Controller</div>
          </Grid>
          <Grid className={classes.itemDetail} item xs={8} lg={4}>
            <div>{healthData.controller}</div>
          </Grid>
          <Grid className={classes.itemTitle} item xs={4} lg={2}>
            <div>Wallet Count</div>
          </Grid>
          <Grid className={classes.itemDetail} item xs={8} lg={4}>
            <div>{healthData.walletCount}</div>
          </Grid>
          <Grid className={classes.itemTitle} item xs={4} lg={2}>
            <div>Owner</div>
          </Grid>
          <Grid className={classes.itemDetail} item xs={8} lg={4}>
            <div>{healthData.owner}</div>
          </Grid>
          <Grid className={classes.itemTitle} item xs={4} lg={2}>
            <div>Wallet Factory</div>
          </Grid>
          <Grid className={classes.itemDetail} item xs={8} lg={4}>
            <div>{healthData.walletFactory}</div>
          </Grid>
        </Grid>
      </Paper>
    </div>
 );
}

export default ContractsTable;