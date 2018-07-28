// /* eslint-disable */
import React from 'react';
import * as XLSX from 'xlsx';
import OutTable from '../../components/table';
import ButtomCustom from '../../components/button';
import ModalCustom from '../../components/modal';
import FirstBar from './first-bar';
import SecondBar from './second-bar';
import {
  makeCols,
  saveToLocalStorage,
  onExportFile,
  getLocalStorageKey,
  getItemByKey,
} from '../../helpers';

export default class HomePage extends React.PureComponent {
  state = {
    data: [],
    cols: [],
    name: '',
    file: null,
    open: false,
    count: 0,
  };

  componentDidMount() {
    this.checkLocalStorage();
  }

  handleFiles = file => {
    this.convertFile(file[0]);
  };

  save = () => {
    const { data, cols, file } = this.state;
    const object = { data, cols };
    if (file) {
      const count = saveToLocalStorage({ file, object });
      this.setState({ count });
      /* eslint-disable no-alert */
      alert('File uploded success.');
    } else {
      alert('Please, upload your excel file.');
    }
  };

  exportFile = () => {
    const { data, name } = this.state;
    onExportFile({ data, name });
  };

  convertFile = file => {
    /* Boilerplate to set up FileReader */
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
    if (rABS) reader.readAsBinaryString(file);
    else reader.readAsArrayBuffer(file);
    reader.onload = e => {
      /* Parse data */
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array' });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      const cols = makeCols(ws['!ref']);
      /* Update state */
      this.setState({ data, cols, file });
    };
  };

  handleCloseModal = () => this.setState({ open: false });

  handleOpenModal = () => this.setState({ open: true });

  getSavingData = () => {
    const key = getLocalStorageKey();
    if (!key) {
      alert('Local Storage empty');
      return null;
    }
    const { data, cols } = getItemByKey(key);
    this.setState({ data, cols, name: key }, this.handleOpenModal);
    return null;
  };

  syncWithServer = () => {
    const key = getLocalStorageKey();
    alert(`This file upload to server ${key}`);
    // Do something action to send file to outside server API
  };

  checkLocalStorage = () => this.setState({ count: localStorage.length });

  render() {
    const { data, cols, open, count } = this.state;
    const disable = !data.length;

    return (
      <div>
        <ModalCustom
          open={open}
          onClose={this.handleCloseModal}
          data={data}
          cols={cols}
          table={<OutTable data={data} cols={cols} />}
          button={
            <ButtomCustom
              onClick={this.exportFile}
              variant="raised"
              color="primary"
              text="Download excel file"
            />
          }
        />
        <FirstBar onClick={this.syncWithServer} />
        <SecondBar
          count={count}
          disable={disable}
          handleFiles={this.handleFiles}
          onClick={this.getSavingData}
          onClickSave={this.save}
        />
        <OutTable data={data} cols={cols} />
      </div>
    );
  }
}
