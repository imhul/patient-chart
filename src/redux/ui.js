import { typesUI as types } from './types';

const initState = {
    isInit: false,
    chartData: [],
    chartOptions: [],
    isPDF: false,
};

export default (state = initState, action) => {
    switch (action.type) {

        case types.LOAD_DATA:
            return { 
                ...state,
                chartData: action.payload.Data,
                chartOptions: action.payload.Options,
                isInit: true,
            };

        case types.TO_PDF:
            return { 
                ...state,
                isPDF: true,
            };

        default:
            return state;
    }
};