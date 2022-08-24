import { DB_URL } from "../consts";
import { IPersonData } from "./reducer";
import { TypedThunk } from "./store";

export const IS_AUTH = "IS_AUTH";
export const ADD_DATA = "ADD_DATA";
export const ADD_CONTACT = "ADD_CONTACT";
export const DELETE_CONTACT = "DELETE_CONTACT";
export const EDIT_CONTACT = "EDIT_CONTACT";
export const SAVE_EDIT = "SAVE_EDIT";
export const SORTED_DATA = "SORTED_DATA";

export const isAuth = () => ({ type: IS_AUTH });

const addData = (data: IPersonData[]) => ({ type: ADD_DATA, data });

export const fetchData = (): TypedThunk => {
  return async (dispatch) => {
    const response = await fetch(DB_URL);
    const db: IPersonData[] = await response.json();
    dispatch(addData(db));
  };
};

export const sortedData = (sortType: string, value: string | null) => ({
  type: SORTED_DATA,
  sortType,
  value,
});

export const deleteContact = (id: string) => ({ type: DELETE_CONTACT, id });

export const addContact = () => ({ type: ADD_CONTACT });

export const editContact = (id: string) => ({ type: EDIT_CONTACT, id });
export const saveEdit = (dataContact: IPersonData) => ({
  type: SAVE_EDIT,
  data: dataContact,
});
