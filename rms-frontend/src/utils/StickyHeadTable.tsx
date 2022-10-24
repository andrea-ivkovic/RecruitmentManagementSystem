import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useState } from 'react';
import { companyUserDTO } from '../auth/auth.model';
import '../App.css';
import axios, { AxiosResponse } from 'axios';
import { urlAccounts } from '../endpoints';
import { useNavigate } from 'react-router-dom';

interface Column {
  id: 'firstName' | 'lastName' | 'email' | 'roleButton' | 'deleteAccount';
  label: string;
  minWidth?: number;
  align?: 'right' | 'center';
}

const columns: readonly Column[] = [
  { id: 'firstName', label: 'First Name', minWidth: 170 },
  { id: 'lastName', label: 'Last Name', minWidth: 170 },
  {
    id: 'email',
    label: 'Email address',
    minWidth: 170
  },
  {
    id: 'roleButton',
    label: '',
    minWidth: 170,
    align: 'center'
  },
  {
    id: 'deleteAccount',
    label: '',
    minWidth: 170,
    align: 'center'
  },
];

interface Data {
  firstName: string;
  lastName: string;
  email: string;
  roleButton?: React.ReactElement;
  deleteAccount?: React.ReactElement;
}



const rows: Data[] = [
];

export default function StickyHeadTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [users, setUsers] = useState<Data[]>([]);

  const navigate = useNavigate();

  React.useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    axios.get(`${urlAccounts}/allUsers`)
      .then((response: AxiosResponse<companyUserDTO[]>) => {
        for (let i = 0; i < response.data.length; i++) {
          rows[i] = createData(response.data[i]);
        }
        setUsers(rows);
      });
  }

  async function removeAdminRole(userId: string) {
    await axios.put(`${urlAccounts}/removeAdminRole`, JSON.stringify(userId), {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  async function assignAdminRole(userId: string) {
    await axios.put(`${urlAccounts}/assignAdminRole`, JSON.stringify(userId), {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  async function deleteUser(userId: string) {
    await axios.delete(`${urlAccounts}/${userId}`);
  }


  function createData(
    value: companyUserDTO
  ): Data {
    const firstName = value.firstName;
    const lastName = value.lastName;
    const email = value.email;
    var roleButton = <></>;
    if (value.role === 'companyAdmin') {
      roleButton = <button
        onClick={() => {
          removeAdminRole(value.userId);
          navigate(0);
        }}
        className='remove-admin-role-button'>Remove Admin Role</button>;
    }
    else {
      roleButton = <button
        onClick={() => {
          assignAdminRole(value.userId);
          navigate(0);
        }}
        className='assign-admin-role-button'>Assign Admin Role</button>;
    }
    const deleteAccount = <button
    onClick={() => {
      deleteUser(value.userId);
      navigate(0);
    }}
    className='delete-account-button'>Delete Account</button>
    return { firstName, lastName, email, roleButton, deleteAccount };
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '80%', overflow: 'hidden', margin: 'auto' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead >
            <TableRow >
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {users
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}