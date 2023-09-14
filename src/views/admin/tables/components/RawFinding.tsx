import React from "react";
import Card from "components/card";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import { Button, TablePagination } from '@mui/material';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import aws from "assets/img/avatars/aws.png";


function RawFinding(props: { row: any }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5); // Number of rows per page

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <Card extra={"w-full h-full sm:overflow-auto overflow-auto px-6"}>
      <header className="relative flex items-center justify-between pt-4">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          Raw Findings
        </div>
      </header>
      <TableContainer style={{ width: '100%' }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow key={'8'}>
              {/* <TableCell padding="checkbox" /> */}
              <TableCell align="center"><div className="font-bold">SEVERITY</div></TableCell>
              <TableCell align="center"><div className="font-bold">TIME</div></TableCell>
              <TableCell align="center"><div className="font-bold">SOURCE</div></TableCell>
              <TableCell align="center"><div className="font-bold">DESCRIPTION</div></TableCell>
              <TableCell align="center"><div className="font-bold">ASSET ANALYST</div></TableCell>
              <TableCell align="center"><div className="font-bold">STATUS</div></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.row.raw.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((rowData: any, i: number) => (
              <>
                <TableRow key={i+'111'}>
                  <TableCell component="th" scope="row" align="center">
                    <Button size="small" variant="contained" color={rowData.severity === 'low' ? "primary" : (rowData.severity === 'high' ? "warning" : (rowData.severity === 'critical' ? 'error' : 'info'))}>{rowData.severity || ''}</Button>
                  </TableCell>
                  <TableCell align="center">{rowData.finding_created || ''}</TableCell>
                  <TableCell align="center">
                  <div className="flex items-center">
                    <div className="w-10">
                      <img src={aws} className="h-10 w-10 mr-2 mt-1 rounded-full cursor-pointer" />
                    </div>
                    <div>
                      <p className="text-sm text-navy-700 dark:text-white">
                      {rowData.source_security_tool_name || ''}
                      </p>
                    </div>

                  </div>
                    </TableCell>
                  <TableCell align="center">{rowData.description || ''}</TableCell>
                  <TableCell align="center">{rowData.asset || ''}</TableCell>
                  <TableCell align="center"><Button size="small" variant="contained">{rowData.status==='in_progress' ? 'In Progress' : rowData.status}</Button></TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={props.row.raw.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Card>
  );
}

export default RawFinding;
