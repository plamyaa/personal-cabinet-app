import React from "react";
import { Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { IRootReducer } from "../../state/reducer";
import { addContact } from "../../state/actions";

const AddButton = () => {
  const isEdit = useSelector<IRootReducer, string>(state => state.dataBase.edit)
  const dispatch = useDispatch();
  const addCard = () => {
    dispatch(addContact());
  }

  return (
    <Button variant='contained' onClick={addCard} disabled={(isEdit === "0" ? false : true)}>Add Contact</Button>
  )
}

export default AddButton;