import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TablePagination,
  TableSortLabel,
  Tooltip,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';

// Sample data fetching logic, to be replaced with actual API call
const fetchContacts = async () => {
  const response = await fetch('http://localhost:5000/api/getContacts');
  const data = await response.json();
  return data;
};

const DataTable = () => {
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState([]);
  const [orderBy, setOrderBy] = useState('firstName');
  const [order, setOrder] = useState('asc');
  const [loading, setLoading] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [currentContact, setCurrentContact] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await fetchContacts();
      setRows(data);
      setLoading(false);
    };

    loadData();
  }, []);

  // Handle sorting
  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle edit dialog open and filling form data
  const handleEdit = (id) => {
    const contactToEdit = rows.find((row) => row.id === id);
    setCurrentContact(contactToEdit);
    setOpenEditDialog(true);
  };

  // Handle edit form submit
  const handleEditSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/updateContact/${currentContact.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(currentContact),
      });

      if (response.ok) {
        const updatedContact = await response.json();
        setRows(rows.map((row) => (row.id === updatedContact.id ? updatedContact : row)));
        setOpenEditDialog(false);
      } else {
        console.error('Failed to update contact');
      }
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/deleteContact/${id}`, {
        method: 'DELETE',
      });
      if (response.status === 204) {
        setRows(rows.filter((row) => row.id !== id));
      } else {
        console.error("Failed to delete contact.");
      }
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  // Sort the rows based on order and orderBy
  const sortedRows = [...rows].sort((a, b) => {
    if (a[orderBy] < b[orderBy]) return order === 'asc' ? -1 : 1;
    if (a[orderBy] > b[orderBy]) return order === 'asc' ? 1 : -1;
    return 0;
  });

  // Paginate the sorted rows
  const paginatedRows = sortedRows.slice(page * 5, page * 5 + 5);

  // Table headers configuration
  const headCells = [
    { id: 'firstName', label: 'First Name' },
    { id: 'lastName', label: 'Last Name' },
    { id: 'email', label: 'Email' },
    { id: 'phone', label: 'Phone Number' },
    { id: 'company', label: 'Company' },
    { id: 'jobTitle', label: 'Job Title' },
    { id: 'actions', label: 'Actions', sortable: false },
  ];

  // Calculate total pages
  const totalPages = Math.ceil(rows.length / 5);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', boxShadow: 3, my: '200px' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {headCells.map((headCell) => (
                <TableCell
                  key={headCell.id}
                  align="left"
                  sortDirection={orderBy === headCell.id ? order : false}
                  sx={{
                    backgroundColor: 'primary.main',
                    color: 'primary.contrastText',
                    fontWeight: 'bold',
                  }}
                >
                  {headCell.sortable !== false ? (
                    <TableSortLabel
                      active={orderBy === headCell.id}
                      direction={orderBy === headCell.id ? order : 'asc'}
                      onClick={() => handleRequestSort(headCell.id)}
                      sx={{
                        '&.MuiTableSortLabel-root': {
                          color: 'primary.contrastText',
                        },
                        '&.MuiTableSortLabel-root:hover': {
                          color: 'primary.contrastText',
                        },
                        '&.Mui-active': {
                          color: 'primary.contrastText',
                        },
                        '& .MuiTableSortLabel-icon': {
                          color: 'primary.contrastText !important',
                        },
                      }}
                    >
                      {headCell.label}
                    </TableSortLabel>
                  ) : (
                    headCell.label
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : (
              paginatedRows.map((row) => (
                <TableRow hover key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell>{row.first_name}</TableCell>
                  <TableCell>{row.last_name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.phone}</TableCell>
                  <TableCell>{row.company}</TableCell>
                  <TableCell>{row.job_title}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Tooltip title="Edit">
                        <IconButton size="small" color="primary" onClick={() => handleEdit(row.id)}>
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton size="small" color="error" onClick={() => handleDelete(row.id)}>
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPage={5}
        component="div"
        count={rows.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[]}
        labelDisplayedRows={({ from, to, count }) => `Page ${page + 1} of ${totalPages}`}
      />

      {/* Edit Dialog */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Edit Contact</DialogTitle>
        <DialogContent>
          {currentContact && (
            <>
              <TextField
                label="First Name"
                value={currentContact.first_name}
                onChange={(e) => setCurrentContact({ ...currentContact, first_name: e.target.value })}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Last Name"
                value={currentContact.last_name}
                onChange={(e) => setCurrentContact({ ...currentContact, last_name: e.target.value })}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Email"
                value={currentContact.email}
                onChange={(e) => setCurrentContact({ ...currentContact, email: e.target.value })}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Phone"
                value={currentContact.phone}
                onChange={(e) => setCurrentContact({ ...currentContact, phone: e.target.value })}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Company"
                value={currentContact.company}
                onChange={(e) => setCurrentContact({ ...currentContact, company: e.target.value })}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Job Title"
                value={currentContact.job_title}
                onChange={(e) => setCurrentContact({ ...currentContact, job_title: e.target.value })}
                fullWidth
                margin="normal"
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleEditSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default DataTable;
