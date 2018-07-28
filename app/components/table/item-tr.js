import React from 'react';
import PropTypes from 'prop-types';
import WrapTD from './wrap-td';

const ItemTR = ({ data, cols }) => (
  <tbody>
    {data.map(row => (
      // actually we  need to use unique key like id
      <tr key={Math.random()}>
        <ItemTD cols={cols} row={row} />
      </tr>
    ))}
  </tbody>
);

export default ItemTR;

ItemTR.propTypes = {
  data: PropTypes.array.isRequired,
  cols: PropTypes.array.isRequired,
};

const ItemTD = ({ cols, row }) =>
  cols.map(c => <WrapTD key={c.key}>{row[c.key]}</WrapTD>);
