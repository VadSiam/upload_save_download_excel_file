import React from 'react';
import PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  modal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'white',
    position: 'absolute',
  },
  body: {
    backgroundColor: 'white',
    outline: '0',
    padding: '20px',
    borderRadius: '6px',
  },
  closeContainer: {
    display: 'flex',
    flexDirection: 'row-reverse',
  },
  bottomButton: {
    marginTop: '10px',
    marginLeft: '-8px',
  },
});

const ModalCustom = ({ open, onClose, classes, table, button }) => (
  <Modal
    className={classes.modal}
    aria-labelledby="simple-modal-title"
    aria-describedby="simple-modal-description"
    open={open}
    onClose={onClose}
  >
    <div className={classes.body}>
      <div className={classes.closeContainer}>
        <Button
          onClick={onClose}
          variant="fab"
          color="secondary"
          aria-label="Close"
          className={classes.button}
        >
          {/* fontSize can adding only in style */}
          <CloseIcon style={{ fontSize: 46 }} />
        </Button>
      </div>
      {table}
      <div className={classes.bottomButton}>{button}</div>
    </div>
  </Modal>
);

ModalCustom.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  table: PropTypes.object.isRequired,
  button: PropTypes.object.isRequired,
  onClose: PropTypes.func,
};

export default withStyles(styles)(ModalCustom);
