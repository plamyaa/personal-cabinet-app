import { Button, Card, CardContent, Box, Input, MenuItem } from "@mui/material";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import React, { useState } from "react";
import ContactPageOutlinedIcon from '@mui/icons-material/ContactPageOutlined';
import { IPersonData } from "../../state/reducer";
import { useDispatch } from "react-redux";
import { saveEdit } from "../../state/actions";

interface IContact {
  data: IPersonData,
}

const EditContact: React.FC<IContact> = ({ data }) => {
  const dispatch = useDispatch();
  const { id } = data;
  const [age, setAge] = useState(data.age);
  const [name, setName] = useState(data.name);
  const [gender, setGender] = useState(data.gender);
  const [email, setEmail] = useState(data.email);
  const handleGenderChange = (event: SelectChangeEvent) => {
    setGender(event.target.value);
  }
  const handleAgeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const age = Number(event.target.value);
    if (age < 0) return;
    setAge(age);
  }
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  }
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  }
  const handleSave = () => {
    if (age && name && gender && age)
      dispatch(saveEdit({ age: age, name: name, gender: gender, email: email, id: id }));
    else alert("Please enter data on all lines");
  }
  return (
    <Card sx={{ width: '450px', boxShadow: '0px 0px 7px black'}}>
      <CardContent sx={{
        display: 'grid',
        gridTemplateColumns: '50px auto 60px',
        alignItems: 'center',
      }}>
        <ContactPageOutlinedIcon fontSize="large" />
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: '70% 30%',
          gap: '10px',
        }}>
          <Input value={name} onChange={handleNameChange} placeholder="Name" />
          <Input type="number" sx={{ marginRight: '15px' }} value={age} onChange={handleAgeChange} />
          <Input value={email} onChange={handleEmailChange} placeholder="Email" />
          <Select sx={{ marginRight: '15px' }}
            size='small'
            value={gender}
            onChange={handleGenderChange}
            variant="standard"
          >
            <MenuItem value="Female">F</MenuItem>
            <MenuItem value="Male">M</MenuItem>
          </Select>
        </Box>
        <Button sx={{
          border: '1px solid #d7d7d7',
          marginTop: '4px'
        }}
          onClick={handleSave}
          size='small'
          color="success"
        > Save
        </Button>
      </CardContent>
    </Card>
  )
}

export default EditContact;