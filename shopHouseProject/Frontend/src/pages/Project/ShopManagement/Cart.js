import {
    Button, Card, Checkbox, Container, Stack, Table, TableBody,
    TableCell, TableContainer,
    TablePagination, TableRow, Typography
} from '@mui/material';
import { filter } from 'lodash';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import Iconify from '../../../components/Iconify';
import Page from '../../../components/Page';
import Scrollbar from '../../../components/Scrollbar';
import SearchNotFound from '../../../components/SearchNotFound';
import { ItemListHead } from '../../../sections/@dashboard/item';
import { makeStyles } from "@material-ui/core/styles";


const TABLE_HEAD = [
    { id: 'name', label: 'Name', alignRight: false },
    { id: 'description', label: 'Description', alignRight: false },
    { id: 'qty', label: 'Quantity', alignRight: false },
    { id: 'price', label: 'Price ($)', alignRight: false },
    { id: 'action', label: '', alignRight: false },
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

export default function Cart(props) {

    // const {
    //     handleClickCartButton,
    //     value,
    //     setValue
    // } = cart

    const {
        cart,
        setCart

    } = props



    const dispatch = useDispatch();

    const [page, setPage] = useState(0);

    const [order, setOrder] = useState('asc');

    const [selected, setSelected] = useState([]);

    const [orderBy, setOrderBy] = useState('name');

    const [filterName, setFilterName] = useState('');

    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = cart.map((n) => n.name);
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

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - cart.length) : 0;

    const filteredUsers = applySortFilter(cart, getComparator(order, orderBy), filterName);

    const isUserNotFound = filteredUsers.length === 0;

    var total = 0;
    sessionStorage.setItem("cartData", JSON.stringify(cart))

    sessionStorage.setItem("cartData", JSON.stringify(cart));

    const useStyles = makeStyles({
        custom: {
            color: "#FF0000",
            fontSize: "30px",
            fontWeight: "bold"
        },

        root: {
            background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
            border: 0,
            borderRadius: 3,
            boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
            color: "white",
            height: 48,
            padding: "0 30px"
        }

    });


    const classes = useStyles();

    const handleRemoveItem = (value) => {
        console.log(value)
        const id = value.id
        setCart(cart.filter(item => item.id !== id));
    }

    return (
        <Page title="Product-List">
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Cart
                    </Typography>
                </Stack>
                <Card>
                    <Scrollbar>
                        <TableContainer sx={{ minWidth: 800 }}>
                            <Table>
                                <ItemListHead
                                    order={order}
                                    orderBy={orderBy}
                                    headLabel={TABLE_HEAD}
                                    rowCount={cart.length}
                                    numSelected={selected.length}
                                    onRequestSort={handleRequestSort}
                                    onSelectAllClick={handleSelectAllClick}
                                />
                                <TableBody>
                                    {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                        // const { id, name, role, status, company, avatarUrl, isVerified } = row;
                                        const { id, name, description, qty, price } = row;

                                        total = total + parseFloat(price);

                                        console.log(total)
                                        const isItemSelected = selected.indexOf(name) !== -1;

                                        return (
                                            <TableRow
                                                hover
                                                key={id}
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
                                                <TableCell align="left">{qty}</TableCell>
                                                <TableCell align="left">{price}</TableCell>

                                                <TableCell align="left">
                                                    {/* <Button variant="danger">Delete</Button> */}
                                                    <Button onClick={() => handleRemoveItem(row)} className={classes.root}>
                                                        Delete
                                                    </Button>
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
                        count={cart.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Card>
                <Card style={{ marginTop: "5%" }}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} style={{ margin: "20px" }}>
                        <Typography variant="h4" gutterBottom>
                            Total Cost
                        </Typography>

                        <Typography variant="h6" className={classes.custom}>
                            LKR:&nbsp;&nbsp; {total}
                        </Typography>

                        {/* <Typography variant="h4" gutterBottom>
                            $:&nbsp;&nbsp; {total}
                        </Typography> */}

                        <Link to={"/dashboard/payment-management"} style={{ textDecoration: "none" }}>
                            <Button variant="contained" fullWidth to="#" startIcon={<Iconify icon="eva:paper-plane-fill" />}>
                                Pay
                            </Button>
                        </Link>
                    </Stack>
                </Card>
            </Container>
        </Page>
    );
}

