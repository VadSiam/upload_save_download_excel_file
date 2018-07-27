/* eslint-disable */
import React from 'react';
// import { FormattedMessage } from 'react-intl';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import ReactFileReader from 'react-file-reader';
import * as XLSX from 'xlsx';
// import messages from './messages';
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
    console.log(JSON.stringify(file[0]));
    this.convertFile(file[0]);
  };

  save = () => {
    const { data, cols, file } = this.state;
    if (file) {
      localStorage.clear(); // clear storage;
      localStorage.setItem(file.name, JSON.stringify(data));
      localStorage.setItem(`${file.name}cols`, JSON.stringify(cols));
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
  };

  render() {
    console.log('state', this.state);
    const { data, cols, open } = this.state;
    const disable = !data.length;
    return (
      <div>
        <Modal
          style={{
            top: '20%',
            left: '20%',
            width: '500px',
            backgroundColor: 'white',
            position: 'absolute',
            transform: `translate(-10%, -20%)`,
          }}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          onClose={this.handleCloseModal}
        >
          <div style={{ backgroundColor: 'white' }}>
            <OutTable data={data} cols={cols} />
            <Button onClick={this.exportFile} variant="raised" color="primary">
              Download excel file
            </Button>
          </div>
        </Modal>
        <ReactFileReader
          fileTypes={['.xls', '.xlsx']}
          handleFiles={this.handleFiles}
          multipleFiles={false}
        >
          <Button variant="raised" color="primary">
            Upload excel file
          </Button>
        </ReactFileReader>
        <Button
          disabled={disable}
          onClick={this.save}
          variant="raised"
          color="default"
        >
          Save excel file
        </Button>
        <Button onClick={this.getSavingData} variant="raised" color="secondary">
          Show excel file
        </Button>
        <OutTable data={data} cols={cols} />
      </div>
    );
  }
}

const OutTable = ({ data, cols }) => (
  <div className="table-responsive">
    <table className="table table-striped">
      <thead>
        {/* <tr>{cols.map(c => <th key={c.key}>{c.name}</th>)}</tr> */}
      </thead>
      <tbody>
        {data.map((r, i) => (
          <tr key={i}>{cols.map(c => <td key={c.key}>{r[c.key]}</td>)}</tr>
        ))}
      </tbody>
    </table>
  </div>
);
