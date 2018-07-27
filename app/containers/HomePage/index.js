// /* eslint-disable */
import React from 'react';
import { Detector } from 'react-detect-offline';
// import Modal from '@material-ui/core/Modal';
import Avatar from '@material-ui/core/Avatar';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import Wifi from '@material-ui/icons/Wifi';
import WifiOff from '@material-ui/icons/WifiOff';
import ReactFileReader from 'react-file-reader';
import * as XLSX from 'xlsx';
import OutTable from '../../components/table';
import ButtomCustom from '../../components/button';
import ModalCustom from '../../components/modal';

/* generate an array of column objects */
const makeCols = refstr => {
  const o = [];
  const C = XLSX.utils.decode_range(refstr).e.c + 1;
  for (let i = 0; i < C; i += 1)
    o[i] = { name: XLSX.utils.encode_col(i), key: i };
  return o;
};

export default class HomePage extends React.PureComponent {
  state = {
    data: [],
    cols: [],
    file: null,
    open: false,
  };

  handleFiles = file => {
    this.convertFile(file[0]);
  };

  save = () => {
    const { data, cols, file } = this.state;
    if (file) {
      localStorage.clear(); // clear storage;
      localStorage.setItem(file.name, JSON.stringify(data));
      localStorage.setItem(`${file.name}cols`, JSON.stringify(cols));
      /* eslint-disable no-alert */
      alert('File uploded success.');
    } else {
      alert('Please, upload your excel file.');
    }
  };

  exportFile = () => {
    const ws = XLSX.utils.aoa_to_sheet(this.state.data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'SheetJS');
    XLSX.writeFile(wb, 'sheetjs.xlsx');
  };

  convertFile = file => {
    /* Boilerplate to set up FileReader */
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
    reader.onload = e => {
      /* Parse data */
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array' });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      /* Update state */
      this.setState({ data, cols: makeCols(ws['!ref']), file });
    };
    if (rABS) reader.readAsBinaryString(file);
    else reader.readAsArrayBuffer(file);
  };

  handleCloseModal = () => this.setState({ open: false });

  handleOpenModal = () => this.setState({ open: true });

  getSavingData = () => {
    const key = localStorage.key(0);
    if (!key) {
      alert('Local Storage empty');
      return null;
    }
    const data = JSON.parse(localStorage.getItem(key));
    const cols = JSON.parse(localStorage.getItem(`${key}cols`));
    this.setState({ data, cols }, this.handleOpenModal);
    return null;
  };

  syncWithServer = () => {
    console.log('sync_srver');
  };

  render() {
    const { data, cols, open } = this.state;
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
        <BottomNavigation>
          <Detector
            render={({ online }) => (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Avatar
                  style={{
                    margin: 10,
                    color: '#fff',
                    backgroundColor: online ? 'green' : 'red',
                  }}
                >
                  {online ? <Wifi /> : <WifiOff />}
                </Avatar>
                <div>You are currently {online ? 'online' : 'offline'}</div>
                <ButtomCustom
                  onClick={this.syncWithServer}
                  variant="raised"
                  color="secondary"
                  disabled={!online}
                  text="Sync with server"
                />
              </div>
            )}
          />
        </BottomNavigation>
        <BottomNavigation>
          <ReactFileReader
            fileTypes={['.xls', '.xlsx']}
            handleFiles={this.handleFiles}
            multipleFiles={false}
          >
            <ButtomCustom
              variant="raised"
              color="primary"
              text="Upload excel file"
            />
          </ReactFileReader>
          <ButtomCustom
            disabled={disable}
            onClick={this.save}
            variant="raised"
            color="secondary"
            text="Save excel file"
          />
          <ButtomCustom
            onClick={this.getSavingData}
            variant="raised"
            color="primary"
            text="Show excel file"
          />
        </BottomNavigation>
        <OutTable data={data} cols={cols} />
      </div>
    );
  }
}
