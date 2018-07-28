import React from 'react';
import PropTypes from 'prop-types';
import Badge from '@material-ui/core/Badge';
import FolderIcon from '@material-ui/icons/Folder';
import AppBar from '@material-ui/core/AppBar';
import { withStyles } from '@material-ui/core/styles';
import ReactFileReader from 'react-file-reader';
import ButtomCustom from '../../components/button';

const styles = () => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgetStyle: {
    marginRight: '10px',
  },
});

const SecondBar = ({
  count,
  classes,
  disable,
  handleFiles,
  onClick,
  onClickSave,
}) => (
  <AppBar position="static" color="default" className={classes.container}>
    <Badge
      className={classes.badgetStyle}
      badgeContent={count}
      color="secondary"
    >
      <FolderIcon style={{ fontSize: 46 }} />
    </Badge>
    <ReactFileReader
      fileTypes={['.xls', '.xlsx']}
      handleFiles={handleFiles}
      multipleFiles={false}
    >
      <ButtomCustom variant="raised" color="primary" text="Upload excel file" />
    </ReactFileReader>
    <ButtomCustom
      disabled={disable}
      onClick={onClickSave}
      variant="raised"
      color="secondary"
      text="Save excel file"
    />
    <ButtomCustom
      onClick={onClick}
      variant="raised"
      color="primary"
      text="Show excel file"
    />
  </AppBar>
);

SecondBar.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  disable: PropTypes.bool.isRequired,
  handleFiles: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  onClickSave: PropTypes.func.isRequired,
};

export default withStyles(styles)(SecondBar);
