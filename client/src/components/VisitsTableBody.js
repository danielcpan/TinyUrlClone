import React from 'react';
import Proptypes from 'prop-types';
import format from 'date-fns/format';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const VisitsTableBody = (props) => {
  function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = cmp(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
  }

  const {
    visits, order, orderBy, page, rowsPerPage,
  } = props;

  return (
    <TableBody>
      {stableSort(visits, getSorting(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((visit, idx) => (
          <TableRow
            hover
            key={idx}
          >
            <TableCell component="th" scope="row">{visit.ip}</TableCell>
            <TableCell align="left">{visit.city || '*Unknown*'}</TableCell>
            <TableCell align="left">{visit.region || '*Unknown*'}</TableCell>
            <TableCell align="left">{visit.country || '*Unknown*'}</TableCell>
            <TableCell align="left">{visit.loc || '*Unknown*'}</TableCell>
            <TableCell align="left">{(visit.isUnique) ? 'Yes' : 'No'}</TableCell>
            <TableCell align="left">{format(visit.createdAt, 'MMM DD, YYYY')}</TableCell>
          </TableRow>
        ))}
    </TableBody>
  );
};

VisitsTableBody.propTypes = {
  visits: Proptypes.array.isRequired,
  order: Proptypes.string.isRequired,
  orderBy: Proptypes.string.isRequired,
  page: Proptypes.number.isRequired,
  rowsPerPage: Proptypes.number.isRequired,
};

export default VisitsTableBody;
