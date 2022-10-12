import { useRef, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
// component
import Iconify from '../../../components/Iconify';
import { useDispatch } from 'react-redux';
import { deleteItem } from "../../../actions/item.action"
// ----------------------------------------------------------------------

export default function ItemMoreMenu(props) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch()
  const Navigate = useNavigate()


  const {
    row,
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

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem sx={{ color: 'text.secondary' }} onClick={(e) => { dispatch(deleteItem(row.id)) }}>
          <ListItemIcon>
            <Iconify icon="eva:trash-2-outline" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        {/* <Link to={`/dashboard/item-update/${props.row.id}`} style={{ textDecoration: "none" }}> */}
        <MenuItem to="#" sx={{ color: 'text.secondary' }}
          onClick={() => {
            setCurrentId(row.id)
            // setValue(2)
          }
          }>
          <ListItemIcon>
            <Iconify icon="eva:edit-fill" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Edit" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        {/* </Link> */}

        {/* <MenuItem to="#" sx={{ color: 'text.secondary' }}  >
          <ListItemIcon>
            <Iconify icon="eva:shopping-cart-fill" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Add to Cart" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem> */}
      </Menu>
    </>
  );
}
