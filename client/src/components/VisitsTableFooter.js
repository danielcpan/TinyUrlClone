import React from 'react';
import Proptypes from 'prop-types';
import { TablePagination } from '@material-ui/core';

const VisitsTableFooter = (props) => {
  const {
    visitsLength, rowsPerPage, page, onChangePage, onChangeRowsPerPage,
  } = props;

  return (
    <>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={visitsLength}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          'aria-label': 'previous page',
        }}
        nextIconButtonProps={{
          'aria-label': 'next page',
        }}
        onChangePage={onChangePage}
        onChangeRowsPerPage={onChangeRowsPerPage}
      />
    </>
  );
};

VisitsTableFooter.propTypes = {
  visitsLength: Proptypes.number.isRequired,
  rowsPerPage: Proptypes.number.isRequired,
  page: Proptypes.number.isRequired,
  onChangePage: Proptypes.func.isRequired,
  onChangeRowsPerPage: Proptypes.func.isRequired,
};

export default VisitsTableFooter;
