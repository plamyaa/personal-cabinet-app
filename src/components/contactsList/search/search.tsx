import { Box, Autocomplete, TextField, Select, MenuItem, SelectChangeEvent, FormControl, InputLabel } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { sortedData } from "../../../state/actions";
import { IRootReducer, IPersonData } from "../../../state/reducer";

const Search = () => {
  const dispatch = useDispatch();
  const contacts = useSelector<IRootReducer, IPersonData[]>(state => state.dataBase.data);
  const [sortType, setsortType] = useState('');
  const handleSortChange = (event: SelectChangeEvent) => {
    setsortType(event.target.value);
  }
  const search = contacts.map(contact => String(contact[sortType as keyof IPersonData]));
  const [value, setValue] = useState<string | null>('');
  const [inputValue, setInputValue] = React.useState('');

  return (
    <Box sx={{
      display: "grid",
      gap: '10px',
    }}>
      <FormControl>
        <InputLabel id="search-label">Search Type</InputLabel>
        <Select sx={{ width: '100%' }}
          labelId="search-label"
          value={sortType}
          onChange={handleSortChange}
          label="Search Type"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="name">Name</MenuItem>
          <MenuItem value="age">Age</MenuItem>
          <MenuItem value="email">Email</MenuItem>
          <MenuItem value="gender">Gender</MenuItem>
        </Select>
      </FormControl>
      {sortType !== '' ? (<Autocomplete
        value={value}
        onChange={(event: any, newValue: string | null) => {
          setValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
          dispatch(sortedData(sortType, newInputValue))
        }}
        id="combo-box-demo"
        options={Array.from(new Set(search))}
        sx={{ width: '100%' }}
        renderInput={(params) => <TextField {...params} label="Search" />}
      />) : null}
    </Box>
  )
}

export default Search;