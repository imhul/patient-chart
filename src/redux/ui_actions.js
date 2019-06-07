import { typesUI as types } from './types';

export function loadData(payload) {
  console.info("loadData action payload: ", payload);
  return (dispatch) => {
    dispatch({
      type: types.LOAD_DATA,
      payload: payload,
    })
  }
};

export function toPDF() {
  return (dispatch) => {
    dispatch({
      type: types.TO_PDF,
    })
  }
};
