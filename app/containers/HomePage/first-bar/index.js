import React from 'react';
import PropTypes from 'prop-types';
import { Detector } from 'react-detect-offline';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Wifi from '@material-ui/icons/Wifi';
import WifiOff from '@material-ui/icons/WifiOff';
import { withStyles } from '@material-ui/core/styles';
import ButtomCustom from '../../../components/button';

const styles = () => ({
  inDetectorContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarStyle: {
    margin: 10,
    color: 'white',
  },
});

const FirstBar = ({ onClick, classes }) => (
  <AppBar position="static" color="default">
    <Detector
      render={({ online }) => (
        <div className={classes.inDetectorContainer}>
          <Avatar
            style={{ backgroundColor: online ? 'green' : 'red' }}
            className={classes.avatarStyle}
          >
            {online ? <Wifi /> : <WifiOff />}
          </Avatar>
          <div>You are currently {online ? 'online' : 'offline'}</div>
          <ButtomCustom
            onClick={onClick}
            variant="raised"
            color="secondary"
            disabled={!online}
            text="Sync with server"
          />
        </div>
      )}
    />
  </AppBar>
);

FirstBar.propTypes = {
  classes: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default withStyles(styles)(FirstBar);
