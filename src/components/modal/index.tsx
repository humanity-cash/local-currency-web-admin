import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useStore } from 'react-hookstore';
import { MODAL_STORE } from 'store';
import { ModalState } from 'types';

const MODAL_COMPONENTS: any = {
  'STOP_CONTRACT': () => 
  	<div>
	  <DialogContentText>Are you sure to stop contract?</DialogContentText>
	</div>,
  'START_CONTRACT': () => 
  	<div>
	  <DialogContentText>Are you sure to start contract?</DialogContentText>
	</div>

};

const Modal = () => {
  const [modalState, setModalState]: [ModalState, any] = useStore(MODAL_STORE);
  const { isOpen, type, title, modalProps, confirmHandler } = modalState
  const ChildComponent = MODAL_COMPONENTS[type];
  const handleClose = () => {
	setModalState({...modalState, isOpen: false})
  };

  const handleConfirm = () => {
	setModalState({...modalState, isOpen: false})
	confirmHandler && confirmHandler()
  };

  return (
		<div>
			<Dialog
				open={isOpen}
				onClose={handleClose}
				aria-labelledby='form-dialog-title'>
				<DialogTitle id='form-dialog-title'>{title}</DialogTitle>
				<DialogContent>
					<ChildComponent {...modalProps} />
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color='primary'>
						Cancel
					</Button>
					<Button onClick={handleConfirm} color='primary'>
						{type === 'STOP_CONTRACT' ? 'Stop Contract' : 'Start Contract'}
					</Button>
				</DialogActions>
			</Dialog>
		</div>
  );
}

export default Modal;