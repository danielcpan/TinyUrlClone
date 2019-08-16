import React from 'react';
import Proptypes from 'prop-types';
import { TablePagination } from '@material-ui/core';

const VisitsTableFooter = props => {
  const { visitsLength, rowsPerPage, page, onChangePage, onChangeRowsPerPage } = props;

  return (
    <>
      <TablePagination
      rowsPerPageOptions={[5, 10, 25]}
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
      onChangeRowsPerPage={onChangeRowsPerPage} />
    </>
  )
}

VisitsTableFooter.propTypes = {
  visitsLength: Proptypes.number,
  rowsPerPage: Proptypes.number,
  page: Proptypes.number,
  onChangePage: Proptypes.func,
  onChangeRowsPerPage: Proptypes.func
}

export default VisitsTableFooter