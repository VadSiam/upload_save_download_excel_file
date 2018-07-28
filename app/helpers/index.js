import * as XLSX from 'xlsx';

// generate an array of column objects
export const makeCols = refstr => {
  const o = [];
  const C = XLSX.utils.decode_range(refstr).e.c + 1;
  for (let i = 0; i < C; i += 1)
    o[i] = { name: XLSX.utils.encode_col(i), key: i };
  return o;
};

export const saveToLocalStorage = ({ file, object }) => {
  localStorage.clear(); // clear storage;
  localStorage.setItem(file.name, JSON.stringify(object));
  return localStorage.length;
};

export const onExportFile = ({ data, name }) => {
  const ws = XLSX.utils.aoa_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'SheetJS');
  XLSX.writeFile(wb, name);
};

export const getLocalStorageKey = () => localStorage.key(0);

export const getLocalStorageLength = () => localStorage.length;

export const getItemByKey = key => JSON.parse(localStorage.getItem(key));
