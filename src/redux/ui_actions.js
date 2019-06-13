import { typesUI as type } from './types';

export function loadData(payload) {
  return (dispatch) => {
    dispatch({
      type: type.LOAD_DATA,
      payload: payload,
    })
  }
};

export function loadError(text) {
  return (dispatch) => {
    dispatch({
      type: type.LOAD_ERROR,
      payload: text,
    })
  }
};

export function toPDF() {
  return (dispatch) => {
    dispatch({
      type: type.TO_PDF,
    })
  }
};

export function resetPDF() {
  return (dispatch) => {
    dispatch({
      type: type.PDF_RESET,
    })
  }
};
