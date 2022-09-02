import {
    Button, Card, Checkbox, Container, Stack, Table, TableBody,
    TableCell, TableContainer,
    TablePagination, TableRow, Typography
} from '@mui/material';
import { filter } from 'lodash';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getItems } from "../../../actions/item.action";
import Page from '../../../components/Page';
import Scrollbar from '../../../components/Scrollbar';
import SearchNotFound from '../../../components/SearchNotFound';
import { ItemListHead, ItemMoreMenu } from '../../../sections/@dashboard/item';
import { ProductCartWidget } from '../../../sections/@dashboard/products';


const TABLE_HEAD = [

    { id: 'name', label: 'Name', alignRight: false },
    { id: 'description', label: 'Description', alignRight: false },
    { id: 'qty', label: 'Quantity', alignRight: false },
    { id: 'price', label: 'price', alignRight: false },
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

export default function ProductList(props) {

    const {
        handleClickCartButton,
        value,
        setValue
    } = props

    const dispatch = useDispatch();

    useEffect(() => {
        try {
            dispatch(getItems());
        } catch (error) {
            console.log(error);
        }
    }, []);

    const items = useSelector((state) => state.itemReducer);

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


    return (
        <Page title="Product-List">
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Product List
                    </Typography>
                    {/* <Link to={"/dashboard/item-create"} style={{ textDecoration: "none" }}>
                        <Button variant="contained" to="#" startIcon={<Iconify icon="eva:plus-fill" />}>
                            New Item
                        </Button>
                    </Link> */}
                </Stack>

                <Card>
                    {/* <ItemListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} /> */}

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
                                        // const { id, name, role, status, company, avatarUrl, isVerified } = row;
                                        const { id, name, description, qty, price } = row;
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
                                                {/* <TableCell component="th" scope="row" padding="none">
                                                    <Stack direction="row" alignItems="center" spacing={2}>
                                                        <Avatar alt={name} src={avatarUrl} />
                                                        <Typography variant="subtitle2" noWrap>
                                                            {name}
                                                        </Typography>
                                                    </Stack>
                                                </TableCell> */}
                                                <TableCell align="left">{name}</TableCell>
                                                <TableCell align="left">{description}</TableCell>
                                                <TableCell align="left">{qty}</TableCell>
                                                <TableCell align="left">{price}</TableCell>

                                                {/* <TableCell align="left">{isVerified ? 'Yes' : 'No'}</TableCell> */}
                                                {/* <TableCell align="left">
                                                    <Label variant="ghost" color={(status === 'banned' && 'error') || 'success'}>
                                                        {sentenceCase(status)}
                                                    </Label>
                                                </TableCell> */}
                                                <TableCell align="right">

                                                    <Button onClick={() => handleClickCartButton(row)} variant="outlined">Add to Cart</Button>

                                                </TableCell>


                                                <TableCell align="right">
                                                    <ItemMoreMenu row={row} />
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
                <ProductCartWidget setValue={setValue} value={value} />
            </Container>
        </Page>
    );
}
