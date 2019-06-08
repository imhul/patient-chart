import { typesUI as type } from './types';

const initState = {
    isPDF: false,
    isInit: false,
    chartData: [],
    chartOptions: [],
    isDataLoaded: false,
};

export default (state = initState, action) => {
    switch (action.type) {

        case type.LOAD_DATA:
            return { 
                ...state,
                isInit: true,
                isDataLoaded: true,
                chartData: action.payload.Data ? action.payload.Data : [],
                chartOptions: action.payload.Options ? action.payload.Options : [],
            };

        case type.TO_PDF:
            return { 
                ...state,
                isPDF: true,
            };

        case type.LOAD_ERROR:
            return { 
                ...state,
                isDataLoaded: false,
            };

        default:
            return state;
    }
};