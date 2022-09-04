import { Button, ButtonProps, Tooltip } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';


interface DeleteButtonProps extends ButtonProps {
    onClick?: () => void;
}

function DeleteButton(props: DeleteButtonProps) {
    return (
        <Tooltip title="View">
            <Button
                className='orgHierachy-lvlConfigList__actionBtn iil-iconbutton'
                variant='outlined'
                size='medium'
                {...props}
            // onClick={props.onClick}
            >
                <DeleteIcon color='error' />
            </Button>
        </Tooltip>
    )
}

export default DeleteButton
