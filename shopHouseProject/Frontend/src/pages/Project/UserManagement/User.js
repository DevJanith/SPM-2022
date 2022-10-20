import DeleteIcon from '@mui/icons-material/Delete';
import ApproveIcon from '@mui/icons-material/DoneAll';
import EditIcon from '@mui/icons-material/Edit';
import ViewIcon from '@mui/icons-material/Visibility';
import {
    Card, Checkbox, Chip, Container, Grid, Stack, Table, TableBody,
    TableCell, TableContainer,
    TablePagination, TableRow, Typography
} from '@mui/material';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import { filter } from 'lodash';
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { fetchUsers, userDelete } from '../../../api';
import Page from '../../../components/Page';
import Scrollbar from '../../../components/Scrollbar';
import SearchNotFound from '../../../components/SearchNotFound';
import { ItemListHead, ItemListToolbar } from '../../../sections/@dashboard/item';
import Tooltip from '@mui/material/Tooltip';

const TABLE_HEAD = [
    { id: 'name', label: 'Name', alignRight: false, align: "left" },
    { id: 'email', label: 'Email (User-Name)', alignRight: false, align: "left" },
    { id: 'type', label: 'Type', alignRight: false, align: "left" },
    { id: 'states', label: 'Status', alignRight: false, align: "center" },
    { id: 'action', label: 'Action', alignRight: true, align: "center" },
];



function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    if (query) {
        return filter(array, (_user) => _user.userDetails.userName.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
    return stabilizedThis.map((el) => el[0]);
}

export default function User() {

    const dispatch = useDispatch();
    let navigate = useNavigate()

    const [successData, setSuccessData] = useState()
    const [errorData, setErrorData] = useState()
    const [isSuccess, setIsSuccess] = useState(false)
    const [isPending, setIsPending] = useState(false)
    const [isError, setIsError] = useState(false)

    const [successDeleteData, setSuccessDeleteData] = useState()
    const [errorDeleteData, setErrorDeleteData] = useState()
    const [isDeleteSuccess, setIsDeleteSuccess] = useState(false)
    const [isDeletePending, setIsDeletePending] = useState(false)
    const [isDeleteError, setIsDeleteError] = useState(false)

    const [successViewData, setSuccessViewData] = useState()
    const [errorViewData, setErrorViewData] = useState()
    const [isViewSuccess, setIsViewSuccess] = useState(false)
    const [isViewPending, setIsViewPending] = useState(false)
    const [isViewError, setIsViewError] = useState(false)

    const [successEditData, setSuccessEditData] = useState()
    const [errorEditData, setErrorEditData] = useState()
    const [isEditSuccess, setIsEditSuccess] = useState(false)
    const [isEditPending, setIsEditPending] = useState(false)
    const [isEditError, setIsEditError] = useState(false)

    const [users, setUsers] = useState({
        users: []
    })

    const getUsers = async (values) => {
        console.log(values);
        setIsPending(true)

        await dispatch(
            fetchUsers()
                .then((response) => {
                    setSuccessData(response.data)
                    setUsers({ users: response.data })
                    setIsPending(false)
                    setIsSuccess(true)
                })
                .catch((errors) => {
                    setErrorData(errors.response)
                    setIsPending(false)
                    setIsError(true)
                }))
    }

    const deleteUser = async (values) => {
        console.log(values);
        setIsPending(true)

        await dispatch(
            userDelete(values)
                .then((response) => {
                    setSuccessDeleteData(response.data)
                    setIsDeletePending(false)
                    setIsDeleteSuccess(true)
                })
                .catch((errors) => {
                    setErrorDeleteData(errors.response)
                    setIsDeletePending(false)
                    setIsDeleteError(true)
                }))
    }

    useEffect(() => {
        getUsers()
        return
    }, [isDeleteSuccess])


    const [page, setPage] = useState(0);

    const [order, setOrder] = useState('asc');

    const [selected, setSelected] = useState([]);

    const [orderBy, setOrderBy] = useState('email');

    const [filterName, setFilterName] = useState('');

    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = users?.users.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleFilterByName = (event) => {
        setFilterName(event.target.value);
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users?.users.length) : 0;

    const filteredUsers = applySortFilter(users?.users, getComparator(order, orderBy), filterName);

    const isUserNotFound = filteredUsers.length === 0;

    return (
        <Page title="User-Management">
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        User Management
                    </Typography>
                </Stack>

                <Card>
                    <ItemListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

                    <Scrollbar>
                        <TableContainer sx={{ minWidth: 800 }}>
                            <Table >
                                <ItemListHead
                                    order={order}
                                    orderBy={orderBy}
                                    headLabel={TABLE_HEAD}
                                    rowCount={users?.users.length}
                                    numSelected={selected.length}
                                    onRequestSort={handleRequestSort}
                                    onSelectAllClick={handleSelectAllClick}
                                />
                                <TableBody>
                                    {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                        const { _id, name, email, type, states } = row;
                                        const isItemSelected = selected.indexOf(name) !== -1;

                                        return (
                                            <TableRow
                                                hover
                                                key={_id}
                                                tabIndex={-1}
                                                role="checkbox"
                                                selected={isItemSelected}
                                                aria-checked={isItemSelected}
                                            >
                                                <TableCell padding="checkbox">
                                                    <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, name)} />
                                                </TableCell>
                                                <TableCell align="left">{row.userDetails.userName}</TableCell>
                                                <TableCell align="left">{email}</TableCell>
                                                <TableCell align="left">
                                                    <Chip label={type} variant="outlined" />
                                                </TableCell>
                                                <TableCell align="left">
                                                    {type == "trader" &&
                                                        <>
                                                            {states == 1 ?
                                                                <>
                                                                    <Alert severity="success">Approved</Alert>
                                                                </>
                                                                :
                                                                <>
                                                                    <Alert severity="info">Pending Approval</Alert>
                                                                </>
                                                            }
                                                        </>
                                                    }
                                                    {type == "buyer" &&
                                                        <>
                                                            <Alert severity="success">Approved</Alert>
                                                        </>
                                                    }
                                                    {type == "admin" &&
                                                        <>
                                                            <Alert severity="success">Approved</Alert>
                                                        </>
                                                    }

                                                </TableCell>
                                                <TableCell align="center">
                                                    <Grid container spacing={0}>
                                                        <Grid item md={3}>
                                                            <Tooltip title="View">
                                                                <IconButton aria-label="delete" size="large" style={{ border: "1px solid #c0c0c0", borderRadius: "10%" }}
                                                                    onClick={() => { navigate(`/dashboard/user-management/view/${_id}`) }}
                                                                >
                                                                    <ViewIcon color='primary' />
                                                                </IconButton>
                                                            </Tooltip>
                                                        </Grid>
                                                        <Grid item md={3}>
                                                            <Tooltip title="Edit">
                                                                <IconButton aria-label="delete" size="large" style={{ border: "1px solid #c0c0c0", borderRadius: "10%" }}
                                                                   onClick={() => { navigate(`/dashboard/user-management/edit/${_id}`) }}
                                                                >
                                                                    <EditIcon color='primary' />
                                                                </IconButton>
                                                            </Tooltip>
                                                        </Grid>
                                                        <Grid item md={3}>
                                                            <Tooltip title="Approve">
                                                                <IconButton disabled={(type == "buyer" || type == "admin" || states == 1) && true} aria-label="delete" size="large"
                                                                    style={
                                                                        (type == "buyer" || type == "admin" || states == 1) ?
                                                                            { border: "1px solid #c0c0c0", borderRadius: "10%", backgroundColor: "#e5e5e5" }
                                                                            :
                                                                            { border: "1px solid #c0c0c0", borderRadius: "10%" }
                                                                    }
                                                                    onClick={() => { navigate(`/dashboard/user-management/approve/${_id}`) }}>
                                                                    <ApproveIcon color='success' />
                                                                </IconButton>
                                                            </Tooltip>
                                                        </Grid>
                                                        <Grid item md={3}>
                                                            <Tooltip title="Delete">
                                                                <IconButton aria-label="delete" size="large" style={{ border: "1px solid #c0c0c0", borderRadius: "10%" }} onClick={() => deleteUser(_id)}>
                                                                    <DeleteIcon color='error' />
                                                                </IconButton>
                                                            </Tooltip>
                                                        </Grid>
                                                    </Grid>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                    {emptyRows > 0 && (
                                        <TableRow style={{ height: 53 * emptyRows }}>
                                            <TableCell colSpan={6} />
                                        </TableRow>
                                    )}
                                </TableBody>

                                {isUserNotFound && (
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                                                <SearchNotFound searchQuery={filterName} />
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                )}
                            </Table>
                        </TableContainer>
                    </Scrollbar>

                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={users?.users.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Card>
            </Container>
        </Page>
    );
}
