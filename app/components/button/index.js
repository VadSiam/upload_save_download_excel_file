import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  button: {
    height: '50px',
    margin: theme.spacing.unit,
  },
});

const ButtomCustom = ({ disabled, onClick, variant, color, text, classes }) => (
  <Button
    className={classes.button}
    disabled={disabled}
    onClick={onClick}
    variant={variant}
    color={color}
  >
    {text}
  </Button>
);

ButtomCustom.propTypes = {
  classes: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  variant: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default withStyles(styles)(ButtomCustom);
