import { Button, ButtonProps, Tooltip } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';


interface ViewButtonProps extends ButtonProps {
    onClick?: () => void;
}

function ViewButton(props: ViewButtonProps) {
    return (
        <Tooltip title="View">
            <Button
                className='orgHierachy-lvlConfigList__actionBtn iil-iconbutton'
                variant='outlined'
                size='medium'
                {...props}
            // onClick={props.onClick}
            >
                <VisibilityIcon color='primary' />
            </Button>
        </Tooltip>
    )
}

export default ViewButton
