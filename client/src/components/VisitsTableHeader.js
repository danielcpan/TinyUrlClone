import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';

const headerRows = [
  { id: 'ip', align: 'left', label: 'IP' },
  { id: 'city', align: 'left', label: 'City' },
  { id: 'region', align: 'left', label: 'Region' },
  { id: 'country', align: 'left', label: 'Country' },
  { id: 'loc', align: 'left', label: 'Location' },
  { id: 'isUnique', align: 'left', label: 'Unique' },
  { id: 'createdAt', align: 'left', label: 'Date' },
];

const VisitsTableHeader = (props) => {
  const { order, orderBy, onRequestSort } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headerRows.map((row) => (
          <TableCell
            key={row.id}
            align={row.align}
            sortDirection={orderBy === row.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === row.id}
              direction={order}
              onClick={createSortHandler(row.id)}
            >
              {row.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

VisitsTableHeader.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
};

export default VisitsTableHeader;
