import { Card, Container, Stack, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import CustomButton from "../../../../components/Button/Button";
import DataTable from "../../../../components/DataTable/DataTable";
import Page from "../../../../components/Page";
import { UserListViewProps } from "./Types/Types";

export function UserListView(props: UserListViewProps) {
    const {
        rows,
        columns
    } = props

    let navigate = useNavigate()

    return <>
        {/* @ts-ignore */}
        <Page title="User-List">
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        User List
                    </Typography>
                    <CustomButton
                        style={{ float: 'right' }}
                        variant="contained"
                        className="iil-btn--primary"
                        onClick={() => navigate("/dashboard/user-management/admin/create")}
                        size="large">
                        Add New
                    </CustomButton>
                </Stack>
                <Card>
                    <DataTable
                        rows={rows}
                        columns={columns}
                    />
                </Card>
            </Container>
        </Page>
    </>
}