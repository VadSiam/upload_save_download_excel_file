import React from 'react';
import PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  modal: {
    top: '10%',
    left: '0%',
    width: '100%',
    backgroundColor: 'white',
    position: 'absolute',
    transform: `translate(-0%, -0%)`,
    margin: theme.spacing.unit,
  },
  body: {
    backgroundColor: 'white',
    outline: '0',
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
      {table}
      {button}
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
