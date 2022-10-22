import { makeStyles } from "@material-ui/core/styles";
import {
    Button, Card, Grid, Checkbox, Container, Stack, Table, TableBody,
    TableCell, TableContainer, Chip,
    TablePagination, TableRow
} from '@mui/material';
import Alert from '@mui/material/Alert';
import { styled } from '@mui/material/styles';
import { filter } from 'lodash';
import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { createProduct, deleteProduct } from "../../../../src/actions/product.action.js";
import Page from '../../../components/Page';
import Scrollbar from '../../../components/Scrollbar';
import SearchNotFound from '../../../components/SearchNotFound';
import { ItemListHead, ItemListToolbar, ItemMoreMenu, ProductMoreMenu } from '../../../sections/@dashboard/item';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
// import { deleteProduct, fetchOneProduct } from '../../../api';
import { useEffect } from "react";


const TABLE_HEAD = [

    { id: 'name', label: 'Name', alignRight: false },
    { id: 'description', label: 'Description', alignRight: false },
    { id: 'qty', label: 'Quantity', alignRight: false },
    { id: 'price', label: 'price', alignRight: false },
    { id: 'ProdStatus', label: 'Product Status', alignRight: false },
    { id: 'action', label: 'Action', alignRight: false },
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
        return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
    return stabilizedThis.map((el) => el[0]);
}

export default function Item(props) {

    const {
        items,
        itemData,
        setItemData,
        handleSubmit,
        clear,
        currentId,
        setCurrentId,
        value,
        setValue
    } = props;

    const dispatch = useDispatch();

    const [page, setPage] = useState(0);
    const [order, setOrder] = useState('asc');
    const [selected, setSelected] = useState([]);
    const [orderBy, setOrderBy] = useState('name');
    const [filterName, setFilterName] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [successDeleteData, setSuccessDeleteData] = useState()
    const [errorDeleteData, setErrorDeleteData] = useState()
    const [isDeleteSuccess, setIsDeleteSuccess] = useState(false)
    const [isDeletePending, setIsDeletePending] = useState(false)
    const [isDeleteError, setIsDeleteError] = useState(false)

    const [successData, setSuccessData] = useState()
    const [errorData, setErrorData] = useState()
    const [isSuccess, setIsSuccess] = useState(false)
    const [isPending, setIsPending] = useState(false)
    const [isError, setIsError] = useState(false)

    const [Items, setUsers] = useState({
        items: []
    })

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = items.map((n) => n.name);
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

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - items.length) : 0;

    const filteredUsers = applySortFilter(items, getComparator(order, orderBy), filterName);

    const isUserNotFound = filteredUsers.length === 0;

    //Switch function handles from here

    const [state, setState] = React.useState({
        checkedA: false,
        checkedB: true,
    });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };


    const Div = styled('div')(({ theme }) => ({
        ...theme.typography.button,
        backgroundColor: '#f2f2f2',
        fontSize: '35px',
        padding: theme.spacing(1),
    }));


    const useStyles = makeStyles({
        custom: {
            color: "#FF0000",
            fontSize: "25px",
            fontWeight: "bold"
        },

        root: {
            background: "#56ab2f",
            border: 0,
            borderRadius: 3,
            boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
            color: "#000000",
            height: 25,
            padding: "0 12px",
            borderRadius: "25px",
            fontSize: "12px"
        }

    });

    const classes = useStyles();

    const handleVerfiy = (data) => {
        dispatch(createProduct(data));
    }

    const deleteProductOnClick = (data) => {
        console.log(data);
        dispatch(deleteProduct(data));
    }

    return (
        <Page title="Item">
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>

                    <Div>{"Product List"}</Div>

                </Stack>

                <Card>
                    <ItemListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

                    <Scrollbar>
                        <TableContainer sx={{ minWidth: 800 }}>
                            <Table>
                                <ItemListHead
                                    order={order}
                                    orderBy={orderBy}
                                    headLabel={TABLE_HEAD}
                                    rowCount={items.length}
                                    numSelected={selected.length}
                                    onRequestSort={handleRequestSort}
                                    onSelectAllClick={handleSelectAllClick}
                                />
                                <TableBody>
                                    {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {

                                        const { _id, name, description, qty, price, status } = row;
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

                                                <TableCell align="left">{name}</TableCell>
                                                <TableCell align="left">{description}</TableCell>
                                                <TableCell align="left">
                                                    <Chip label={qty} variant="outlined" />
                                                </TableCell>
                                                <TableCell align="left">{price}</TableCell>


                                                {status == 1
                                                    ?
                                                    <>
                                                        <TableCell align="left">
                                                            <Alert severity="info">Pending Approval</Alert>
                                                        </TableCell>
                                                    </>
                                                    :
                                                    <>
                                                        <TableCell align="left">
                                                            <Alert severity="success">Approved</Alert>
                                                        </TableCell>
                                                    </>
                                                }
                                                <TableCell align="left">
                                                    <Button onClick={() => handleVerfiy(row)} type="button" disabled={status == 1 ? false : true} /*className={classes.root}*/>
                                                        Approve Product
                                                    </Button>
                                                </TableCell>

                                                <TableCell align="left">
                                                    <Grid item md={3} marginTop="15px">
                                                        <Tooltip title="Delete">
                                                            <IconButton aria-label="delete" size="large" style={{ border: "1px solid #c0c0c0", borderRadius: "10%" }} onClick={() => deleteProductOnClick(_id)}>
                                                                <DeleteIcon color='error' />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </Grid>
                                                </TableCell>

                                                <TableCell align="right">
                                                    <ItemMoreMenu
                                                        row={row}
                                                        items={items}
                                                        itemData={itemData}
                                                        setItemData={setItemData}
                                                        handleSubmit={handleSubmit}
                                                        clear={clear}
                                                        currentId={currentId}
                                                        setCurrentId={setCurrentId}
                                                        value={value}
                                                        setValue={setValue}
                                                    />
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
                        count={items.length}
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
