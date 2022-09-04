import { Stack } from "@mui/material";
import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import DeleteButton from "../../../../components/Button/DeleteButton";
import EditButton from "../../../../components/Button/EditButton";
import ViewButton from "../../../../components/Button/ViewButton";
import { UserListView } from "./UserList.view";



export default function UserListContainer() {
    let navigate = useNavigate()

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'firstName', headerName: 'First name', width: 200 },
        { field: 'lastName', headerName: 'Last name', width: 200 },
        {
            field: 'age',
            headerName: 'Age',
            type: 'number',
            width: 100,
        },
        {
            field: 'fullName',
            headerName: 'Full name',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 250,
            valueGetter: (params: GridValueGetterParams) =>
                `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        },
        {
            field: "Actions",
            width: 250,
            renderCell: () => {
                return <>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={0}>
                        <ViewButton style={{ marginRight: "2%" }} onClick={() => {  navigate("/dashboard/user-management/admin/view/1") }} />
                        <EditButton style={{ marginRight: "2%" }} onClick={() => { navigate("/dashboard/user-management/admin/update/1") }} />
                        <DeleteButton style={{ marginRight: "2%" }} onClick={() => { console.log("delete") }} />
                    </Stack>
                </>
            }
        }
    ];

    const rows = [
        { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
        { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
        { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
        { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
        { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
        { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    ];

    const props = {
        rows,
        columns
    }

    return <UserListView {...props} />
}