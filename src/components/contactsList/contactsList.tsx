import React from "react";
import { Box, Typography } from "@mui/material";
import Contact from "./contact";
import { useSelector } from "react-redux";
import { IPersonData, IRootReducer } from "../../state/reducer";
import Search from "./search/search";
import AddButton from "./addButton";

const ContactsList = () => {
  const dataBase = useSelector<IRootReducer, IRootReducer["dataBase"]>(state => state.dataBase);
  const { data, sortedData, edit } = dataBase;
  if (!data.length) return <Box />;
  const showedData = (sortedData.length && edit === '0')
    ? getCards(sortedData)
    : getCards(data);
  return (
    <Box sx={{
      display: 'grid',
      rowGap: '10px',
      justifyContent: 'center'
    }}>
      <Typography variant="h3" margin="3">Contacts: </Typography>
      <Search />
      {showedData}
      <AddButton />
    </Box>
  )
}

function getCards(data: IPersonData[]) {
  return data.map((contact) => <Contact data={contact} key={contact.id} />)
}

export default ContactsList;