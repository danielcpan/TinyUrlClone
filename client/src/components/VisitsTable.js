import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import format from 'date-fns/format';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    width: 850,
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const headers = [
  'IP', 
  'City', 
  'Region', 
  'Country', 
  'Location', 
  // 'Organization', 
  'Created At'
]

const VisitsTable = props => {
  const classes = useStyles();
  const { visits } = props

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            {(headers.map(header => <TableCell key={header}>{header}</TableCell> ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {visits.map(visit => (
            <TableRow key={visit.id}>
              <TableCell component="th" scope="row">
                {visit.ip}
              </TableCell>
              <TableCell align="right">{visit.city}</TableCell>
              <TableCell align="right">{visit.region}</TableCell>
              <TableCell align="right">{visit.country}</TableCell>
              <TableCell align="right">{visit.loc}</TableCell>
              {/* <TableCell align="right">{visit.org}</TableCell> */}
              <TableCell align="right">{format(visit.createdAt, 'MMM DD, YYYY')}</TableCell>
              {/* <TableCell align="right">{visit.createdAt}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default VisitsTable;