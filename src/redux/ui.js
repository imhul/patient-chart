import { typesUI as type } from './types';

const initState = {
    isPDF: false,
    isInit: false,
    chartData: [],
    patientOptions: [],
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
                chartData: action.payload.data ? action.payload.data : [],
                patientOptions: action.payload.patient ? action.payload.patient : [],
                chartOptions: action.payload.options ? action.payload.options : [],
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