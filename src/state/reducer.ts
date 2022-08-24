import {
  ADD_DATA,
  SAVE_EDIT,
  DELETE_CONTACT,
  EDIT_CONTACT,
  IS_AUTH,
  ADD_CONTACT,
  SORTED_DATA,
} from "./actions";
import { combineReducers } from "redux";

function authToggle(state = { isAuth: false }, action: { type: string }) {
  switch (action.type) {
    case IS_AUTH:
      return {
        ...state,
        isAuth: !state.isAuth,
      };
    default:
      return state;
  }
}

function dataBase(
  state = { data: [], sortedData: [], edit: "0" },
  action: {
    sortType: string;
    type: string;
    data: IPersonData;
    id: string;
    value: string | number;
  }
) {
  switch (action.type) {
    case ADD_DATA:
      return {
        ...state,
        data: action.data,
      };
    case DELETE_CONTACT:
      return {
        ...state,
        data: state.data.filter((contact: IPersonData) => {
          if (contact.id !== action.id) {
            return contact;
          }
          return null;
        }),
      };
    case EDIT_CONTACT:
      return {
        ...state,
        edit: action.id,
      };
    case SAVE_EDIT:
      const {
        data: { id, name, email, age, gender },
      } = action;
      return {
        ...state,
        edit: "0",
        data: state.data.filter((contact: IPersonData) => {
          if (contact.id === id) {
            contact.age = age;
            contact.email = email;
            contact.gender = gender;
            contact.name = name;
            return contact;
          }
          return contact;
        }),
      };
    case ADD_CONTACT:
      const newId = String(new Date().getTime());
      const { data } = state;
      const newCard: IPersonData = {
        id: newId,
        age: 0,
        name: "",
        gender: "",
        email: "",
      };
      return {
        ...state,
        edit: newId,
        data: [...data, newCard],
      };
    case SORTED_DATA:
      return {
        ...state,
        sortedData: state.data.filter((contact) => {
          if (
            String(contact[action.sortType as keyof IPersonData]) ===
            action.value
          ) {
            return contact;
          }
          return null;
        }),
      };
    default:
      return state;
  }
}

export const rootReducer = combineReducers({ authToggle, dataBase });

export interface IRootReducer {
  authToggle: {
    isAuth: boolean;
  };
  dataBase: {
    data: IPersonData[];
    sortedData: IPersonData[];
    edit: string;
  };
}

export interface IPersonData {
  id: string;
  age: number;
  name: string;
  gender: string;
  email: string;
}
