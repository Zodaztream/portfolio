// This file contains all the possible actions
import { Element } from "../components/types";

export const edit = () => {
  return {
    type: "TOGGLE_EDIT"
  };
};

export const setSearching = (isSearching: boolean) => {
  return {
    type: "SET_SEARCHING",
    payload: isSearching
  };
};

export const addElement = (gridCell: Element) => {
  return {
    type: "ADD_ELEMENT",
    payload: gridCell
  };
};

export const removeElement = (gridCell: Element) => {
  return {
    type: "REMOVE_ELEMENT",
    payload: gridCell
  };
};

export const clearAllElements = () => {
  return {
    type: "CLEAR_ALL",
    payload: null
  };
};

export const updateElement = (gridCell: Element) => {
  return {
    type: "UPDATE_ELEMENT",
    payload: gridCell
  };
};

export const updateSizePos = (gridCell: Element) => {
  return {
    type: "UPDATE_SIZE_AND_POSITION",
    payload: gridCell
  };
};

export const updateBackground = (imageUrl: string) => {
  return {
    type: "UPDATE_BACKGROUND",
    payload: imageUrl
  };
};

export const toggleAccountMenu = () => {
  return {
    type: "TOGGLE_MENU"
  };
};

export const setMessage = (message: string, error: boolean) => {
  return {
    type: "SET_MESSAGE",
    payload: { message, error }
  };
};
