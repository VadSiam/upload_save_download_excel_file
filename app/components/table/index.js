import React from 'react';
import PropTypes from 'prop-types';
import WrapTable from './wrap-table';
import ItemTR from './item-tr';

const OutTable = ({ data, cols }) => (
  <WrapTable>
    <tbody>
      <ItemTR data={data} cols={cols} />
    </tbody>
  </WrapTable>
);

OutTable.propTypes = {
  data: PropTypes.array.isRequired,
  cols: PropTypes.array.isRequired,
};

export default OutTable;
