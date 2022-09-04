import { GridColDef } from "@mui/x-data-grid"; 

export interface UserDetailsProps {

}

export interface UserListViewProps {
    rows: Array<UserDetailsProps>
    columns: GridColDef[]
}