import { Button, ButtonProps, Tooltip } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';


interface EditButtonProps extends ButtonProps {
    onClick?: () => void;
}

function EditButton(props: EditButtonProps) {
    return (
        <Tooltip title="View">
            <Button
                className='orgHierachy-lvlConfigList__actionBtn iil-iconbutton'
                variant='outlined'
                size='medium'
                {...props}
            // onClick={props.onClick}
            >
                <EditIcon color='primary' />
            </Button>
        </Tooltip>
    )
}

export default EditButton
