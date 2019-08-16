import React from 'react';
import Proptypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Paper,
  Typography,
  Toolbar,
  Table,
} from '@material-ui/core';

import VisitsTableHeader from './VisitsTableHeader';
import VisitsTableBody from './VisitsTableBody';
import VisitsTableFooter from './VisitsTableFooter';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    // width: 850,
  },
}));

const VisitsTable = (props) => {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('date');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const { visits } = props;

  function onRequestSort(event, property) {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  }

  function onChangePage(event, newPage) {
    setPage(newPage);
  }

  function onChangeRowsPerPage(event) {
    setRowsPerPage(+event.target.value);
    setPage(0);
  }

  return (
    <Container>
      <Paper className={classes.root}>
        <Toolbar>
          <Typography variant="h6">Visits</Typography>
        </Toolbar>
        <Table className={classes.table} size="small">
          <VisitsTableHeader
            classes={classes}
            order={order}
            orderBy={orderBy}
            onRequestSort={onRequestSort}
          />
          <VisitsTableBody
            visits={visits}
            order={order}
            orderBy={orderBy}
            page={page}
            rowsPerPage={rowsPerPage}
          />
        </Table>
        <VisitsTableFooter
          visitsLength={visits.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={onChangePage}
          onChangeRowsPerPage={onChangeRowsPerPage}
        />
      </Paper>
    </Container>
  );
};

VisitsTableBody.propTypes = {
  visits: Proptypes.array.isRequired,
};

export default VisitsTable;
