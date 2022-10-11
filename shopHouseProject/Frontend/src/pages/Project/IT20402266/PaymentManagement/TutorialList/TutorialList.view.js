import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import * as React from 'react';
import { useNavigate } from "react-router-dom";

export function TutorialListView(props) {
    const { } = props

    let navigate = useNavigate()

    return (
        <>
            <h1>List</h1>
            <Stack spacing={2} direction="row">
                <Button variant="outlined" onClick={() => { navigate(`/dashboard/tutorial-management/create`) }}>Create</Button>
                <Button variant="outlined" onClick={() => { navigate(`/dashboard/tutorial-management/view/1`) }}>View</Button>
                <Button variant="outlined" onClick={() => { navigate(`/dashboard/tutorial-management/edit/1`) }}>Edit</Button>
            </Stack>
        </>
    )
}