import React from "react";
import Card from "components/card";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import { IconButton, Button, Collapse, TablePagination, TableContainer, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Progress from "components/progress";
import avatar from "assets/img/avatars/profile.jpg";
import RawFinding from "./RawFinding";
import VisibilityIcon from '@mui/icons-material/Visibility';


function GroupFinding(props: { rawList: any, groupList: any, mergedArray: any }) {
  const [isExpanded, setIsExpanded] = React.useState(-1);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5); // Number of rows per page
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState<{ [key: string]: any }>({});

  // modal function
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setData({})
    setOpen(false);
  };

  // pagination function 
  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };
 
  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // view data
  const viewData = (data: any) => {
    setData(data.group)
    handleClickOpen()
  }
  return (
    <Card extra={"w-full h-full sm:overflow-auto overflow-auto px-6"}>
      <header className="relative flex items-center justify-between pt-4">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          Group Findings
        </div>
      </header>
      <TableContainer style={{ width: '100%',height:'580px' }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow key={'7'}>
              {/* <TableCell padding="checkbox" /> */}
              <TableCell></TableCell>
              <TableCell align="center"><div className="font-bold">SEVERITY</div></TableCell>
              <TableCell align="center"><div className="font-bold">TIME</div></TableCell>
              <TableCell align="center"><div className="font-bold">SLA</div></TableCell>
              <TableCell align="center"><div className="font-bold">DESCRIPTION</div></TableCell>
              <TableCell align="center"><div className="font-bold">SECURITY ANALYST</div></TableCell>
              <TableCell align="center"><div className="font-bold">OWNER</div></TableCell>
              <TableCell align="center"><div className="font-bold">WORKFLOW</div></TableCell>
              <TableCell align="center"><div className="font-bold">STATUS</div></TableCell>
              <TableCell align="center"><div className="font-bold"># OF FINDINGS</div></TableCell>
              <TableCell align="center"><div className="font-bold">COMMUNICATIONS</div></TableCell>
              <TableCell align="center"><div className="font-bold">ACTION</div></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.mergedArray.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any, i: number) => (
              <>
                <TableRow key={i+'11'}>
                  <TableCell align="center">
                    {row.matched ? <IconButton onClick={() => {
                      if (isExpanded === i) {
                        setIsExpanded(-1)
                      } else {
                        setIsExpanded(i)
                      }
                    }
                    }>
                      {isExpanded === i ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton> : <></>}
                  </TableCell>
                  <TableCell component="th" scope="row" align="center">
                    <Button size="small" variant="contained" color={row.group.severity === 'low' ? "primary" : (row.group.severity === 'high' ? "warning" : (row.group.severity === 'critical' ? 'error' : 'info'))}>{row.group.severity}</Button>
                  </TableCell>
                  <TableCell align="center">{row.group.grouped_finding_created}</TableCell>
                  <TableCell align="center">{row.group.sla}</TableCell>
                  <TableCell align="center">{row.group.description}</TableCell>
                  <TableCell align="center"><div className="flex items-center">
                    <div className="w-8">
                      <img src={avatar} className="h-6 w-6 mr-2 rounded-full cursor-pointer" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-navy-700 dark:text-white">
                        {row.group.security_analyst}
                      </p>
                    </div>

                  </div></TableCell>
                  <TableCell align="center"><div className="flex items-center">
                    <div className="w-8">
                      <img src={avatar} className="h-6 w-6 mr-2 rounded-full cursor-pointer" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-navy-700 dark:text-white">
                        {row.group.owner}
                      </p>
                    </div>

                  </div></TableCell>
                  <TableCell align="center">{row.group.workflow}</TableCell>
                  <TableCell>
                    <Button size="small" variant="contained" style={{ width: '130px' }}>{row.group.status === 'in_progress' ? 'In Progress' : row.group.status}</Button>
                    <div className="flex items-center mt-3">
                      <Progress width="w-[108px]" value={row.group.progress * 100} color={'orange'} />
                    </div></TableCell>
                  <TableCell align="center"><Button size="small" variant="contained">1</Button></TableCell>
                  <TableCell align="center">{ }</TableCell>
                  <TableCell align="center"><IconButton onClick={() => viewData(row)}><VisibilityIcon /></IconButton></TableCell>

                </TableRow>
                <TableRow key={i+'1'}>
                  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12} align="center">
                    <Collapse in={isExpanded === i} timeout="auto" unmountOnExit>
                      <RawFinding row={row} />
                    </Collapse>
                  </TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={props.groupList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="xs" // Set the maximum width to control the dialog width
        fullWidth // Make the dialog take up the full width
      >
        <DialogTitle><div className="font-bold">Finding Data</div></DialogTitle>
        <DialogContent>
          <div className="flex">
            <div className="flex-none w-40 h-8 font-bold">
              Severity:
            </div>
            <div className="flex-initial w-60">
              {data.severity}
            </div>
          </div>
          <div className="flex">
            <div className="flex-none w-40 h-8 font-bold">
              Time:
            </div>
            <div className="flex-initial w-60">
              {data.grouped_finding_created}
            </div>
          </div>
          <div className="flex">
            <div className="flex-none w-40 h-8 font-bold">
              Sla:
            </div>
            <div className="flex-initial w-60">
              {data.sla}
            </div>
          </div>
          <div className="flex">
            <div className="flex-none w-40 h-8 font-bold">
              Description:
            </div>
            <div className="flex-initial w-60 break-words">
              {data.description}
            </div>
          </div>
          <div className="flex">
            <div className="flex-none w-40 h-8 font-bold">
              Security Analyst:
            </div>
            <div className="flex-initial w-60 break-words">
              {data.security_analyst}
            </div>
          </div>
          <div className="flex">
            <div className="flex-none w-40 h-8 font-bold">
              Owner:
            </div>
            <div className="flex-initial w-60 break-words">
              {data.owner}
            </div>
          </div>
          <div className="flex">
            <div className="flex-none w-40 h-8 font-bold">
              Workflow:
            </div>
            <div className="flex-initial w-60 break-words">
              {data.workflow}
            </div>
          </div>
          <div className="flex">
            <div className="flex-none w-40 h-8 font-bold">
              Status:
            </div>
            <div className="flex-initial w-60 break-words">
              {data.status === 'in_progress' ? 'In Progress' : data.status}
            </div>
          </div>

        </DialogContent>
        <DialogActions className="mb-3 mr-3">
          <Button onClick={handleClose} variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}

export default GroupFinding;
