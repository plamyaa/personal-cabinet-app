import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import React from "react";
import ContactPageOutlinedIcon from '@mui/icons-material/ContactPageOutlined';
import { IPersonData, IRootReducer } from "../../state/reducer";
import { useDispatch } from "react-redux";
import { deleteContact, editContact } from "../../state/actions";
import { useSelector } from "react-redux";
import EditContact from "./editContact";

interface IContact {
  data: IPersonData,
}

const Contact: React.FC<IContact> = ({ data }) => {
  const dispatch = useDispatch();
  const isEdited = useSelector<IRootReducer, string>(state => state.dataBase.edit);
  const { age, name, gender, email, id } = data;
  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    const target = event.target as HTMLButtonElement;
    dispatch(deleteContact(target.value));
  }
  const handleEdit = (event: React.MouseEvent<HTMLButtonElement>) => {
    const target = event.target as HTMLButtonElement;
    dispatch(editContact(target.value));
  }
  return isEdited !== id ? (
    <Card sx={{ width: '450px' }}>
      <CardContent sx={{
        display: 'grid',
        gridTemplateColumns: '50px auto 60px',
        alignItems: 'center',
      }}>
        <ContactPageOutlinedIcon fontSize="large" />
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: '50% 50%'
        }}>
          <Typography>{name}</Typography>
          <Typography sx={{ textAlign: 'end', marginRight: '15px' }}>{age} {gender.slice(0, 1).toUpperCase()}</Typography>
          <Typography sx={{ color: '#626262' }}>{email}</Typography>
        </Box>
        <Box>
          <Button sx={{
            border: '1px solid #d7d7d7',
          }}
            size='small'
            value={id}
            onClick={handleDelete}
            color="error"
          > Delete
          </Button>
          <Button sx={{
            border: '1px solid #d7d7d7',
            marginTop: '4px'
          }}
            size='small'
            value={id}
            onClick={handleEdit}
            disabled={(isEdited === "0" ? false : true)}
          > Edit
          </Button>
        </Box>

      </CardContent>

    </Card>
  ) :
    <EditContact data={data} />
}

export default Contact;